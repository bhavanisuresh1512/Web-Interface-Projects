import React, { createContext, useCallback, useContext, useState } from 'react';

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => read('nestora:favorites', []));
  const [compare, setCompare] = useState(() => read('nestora:compare', []));
  const [user, setUser] = useState(() => read('nestora:user', null));
  const [recent, setRecent] = useState(() => read('nestora:recent', []));
  const [toast, setToast] = useState('');

  const persist = (key, value) => localStorage.setItem(`nestora:${key}`, JSON.stringify(value));
  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.nestoraToastTimer);
    window.nestoraToastTimer = window.setTimeout(() => setToast(''), 2600);
  };
  const toggleFavorite = (id) => setFavorites((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    persist('favorites', next);
    notify(current.includes(id) ? 'Removed from saved homes' : 'Saved to your homes');
    return next;
  });
  const toggleCompare = (id) => setCompare((current) => {
    if (current.includes(id)) {
      const next = current.filter((item) => item !== id);
      persist('compare', next);
      return next;
    }
    if (current.length >= 3) {
      notify('Compare up to three homes at a time');
      return current;
    }
    const next = [...current, id];
    persist('compare', next);
    notify('Added to comparison');
    return next;
  });
  const trackView = useCallback((id) => setRecent((current) => {
    const next = [id, ...current.filter((item) => item !== id)].slice(0, 6);
    persist('recent', next);
    return next;
  }), []);
  const signIn = (nextUser) => {
    setUser(nextUser);
    persist('user', nextUser);
  };
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('nestora:user');
    notify('You are signed out');
  };

  return <AppContext.Provider value={{ favorites, compare, user, recent, toast, notify, toggleFavorite, toggleCompare, trackView, signIn, signOut }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);