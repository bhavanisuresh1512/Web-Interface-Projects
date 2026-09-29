import React, { createContext, useContext, useEffect, useState } from 'react';

export const NavigationContext = createContext(() => {});

export function Link({ to, children, className = '', onClick, ...props }) {
  const navigate = useContext(NavigationContext);
  return <a href={to} className={className} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  }} {...props}>{children}</a>;
}

export function useNavigation() {
  const [path, setPath] = useState(`${window.location.pathname}${window.location.search}`);
  useEffect(() => {
    const update = () => setPath(`${window.location.pathname}${window.location.search}`);
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return { path, navigate, NavigationContext };
}