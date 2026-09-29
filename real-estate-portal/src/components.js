import React, { useState } from 'react';
import { Link } from './navigation';
import { agents, formatPrice } from './data';
import { useApp } from './store';

const symbols = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
  bed: <><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/><path d="M6 11h4"/></>,
  bath: <><path d="M9 6 7.5 4.5a2.1 2.1 0 0 0-3 3L6 9"/><path d="M3 12h18v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2ZM6 20v2m12-2v2"/><path d="m14 4 2-2 4 4-2 2"/></>,
  area: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v6H3m12 12v-6h6"/></>,
  pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="m18 6-12 12M6 6l12 12"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>,
  share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4"/></>,
  menuDots: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.7a2 2 0 0 1-.6 1.7L7.7 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.7-.6l2.7.5a2 2 0 0 1 1.6 1.9Z"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  filter: <><path d="M4 7h16M7 12h10m-7 5h4"/><circle cx="8" cy="7" r="1.5"/><circle cx="14" cy="12" r="1.5"/><circle cx="11" cy="17" r="1.5"/></>,
  grid: <><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></>,
  list: <><path d="M9 6h12M9 12h12M9 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></>,
  compass: <><circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z"/></>,
  logout: <><path d="M10 17l5-5-5-5m5 5H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/></>,
};

export function Icon({ name, size = 18, fill = 'none' }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{symbols[name] || symbols.arrow}</svg>;
}

export function Button({ children, variant = 'dark', className = '', ...props }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { favorites, compare, user } = useApp();
  return <header className="site-header">
    <div className="header-inner">
      <Link to="/" className="brand"><span className="brand-mark">n.</span><span>Nestora</span></Link>
      <nav className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        <Link to="/properties" onClick={() => setOpen(false)}>Buy</Link><Link to="/properties?listing=rent" onClick={() => setOpen(false)}>Rent</Link>
        <Link to="/sell" onClick={() => setOpen(false)}>Sell</Link><Link to="/agents" onClick={() => setOpen(false)}>Agents</Link><Link to="/explore" onClick={() => setOpen(false)}>Explore</Link>
        <Link to="/login" className="mobile-nav-link" onClick={() => setOpen(false)}>Log in</Link><Link to="/register" className="mobile-nav-link" onClick={() => setOpen(false)}>Create an account</Link>
      </nav>
      <div className="header-actions">
        <Link to="/favorites" className="header-icon" aria-label={`Saved homes, ${favorites.length}`}><Icon name="heart"/>{favorites.length > 0 && <span className="count-dot">{favorites.length}</span>}</Link>
        <Link to="/compare" className="header-compare">Compare{compare.length > 0 && <span>{compare.length}</span>}</Link>
        {user ? <Link className="header-login" to="/dashboard">My Nestora</Link> : <Link className="header-login" to="/login">Log in</Link>}
        <Link to="/register" className="button button-dark header-join">Get started <Icon name="arrow" size={15}/></Link>
      </div>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}><Icon name={open ? 'close' : 'menu'} size={22}/></button>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="site-footer"><div className="footer-main">
    <div className="footer-brand"><Link to="/" className="brand"><span className="brand-mark">n.</span><span>Nestora</span></Link><p>A more thoughtful way to find your place in the world.</p></div>
    <div><strong>Discover</strong><Link to="/properties">Buy a home</Link><Link to="/properties?listing=rent">Find a rental</Link><Link to="/explore">Explore places</Link></div>
    <div><strong>Nestora</strong><Link to="/agents">Our agents</Link><Link to="/sell">List your property</Link><Link to="/dashboard">Your account</Link></div>
    <div className="footer-note"><span className="eyebrow">A little more like home</span><p>Thoughtful homes. Real people. Better beginnings.</p></div>
  </div><div className="footer-bottom"><span>© 2026 Nestora Homes India</span><span>Made for finding your place.</span></div></footer>;
}

export function Toast() {
  const { toast } = useApp();
  return toast ? <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={15}/></span>{toast}</div> : null;
}

export function PropertyCard({ property, compact = false }) {
  const { favorites, compare, toggleFavorite, toggleCompare } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const agent = agents.find((item) => item.id === property.agentId);
  return <article className={`property-card ${compact ? 'property-card-compact' : ''}`}>
    <div className="property-photo-wrap">
      <Link to={`/property/${property.id}`} className="property-photo-link" aria-label={`View ${property.title}`}>
        <img className={imageLoaded ? 'loaded' : ''} src={property.image} alt={property.title} onLoad={() => setImageLoaded(true)} loading="lazy" />
      </Link>
      {!imageLoaded && <span className="photo-skeleton"/>}
      {property.featured && <span className="featured-badge">Nestora pick</span>}
      <span className="listing-badge">{property.listing === 'For Rent' ? 'For rent' : 'For sale'}</span>
      <button className={`favorite-button ${favorites.includes(property.id) ? 'is-favorite' : ''}`} aria-label={favorites.includes(property.id) ? 'Remove from saved homes' : 'Save home'} onClick={() => toggleFavorite(property.id)}><Icon name="heart" fill={favorites.includes(property.id) ? 'currentColor' : 'none'} size={18}/></button>
    </div>
    <div className="property-card-body">
      <div className="property-card-top"><span className="property-type">{property.type}</span><span className="property-price">{formatPrice(property.price, property.listing)}</span></div>
      <Link className="property-title" to={`/property/${property.id}`}>{property.title}</Link>
      <p className="property-location"><Icon name="pin" size={15}/>{property.address}</p>
      <div className="property-meta"><span><Icon name="bed" size={16}/>{property.bedrooms || '—'} beds</span><span><Icon name="bath" size={16}/>{property.bathrooms || '—'} baths</span><span><Icon name="area" size={15}/>{property.area.toLocaleString()} sqft</span></div>
      <div className="property-card-foot"><span className="agent-mini">Listed by {agent?.name.split(' ')[0] || 'Nestora'}</span><button className={`compare-chip ${compare.includes(property.id) ? 'active' : ''}`} onClick={() => toggleCompare(property.id)} aria-label={compare.includes(property.id) ? 'Remove from comparison' : 'Add to comparison'}>{compare.includes(property.id) ? 'Comparing' : '+ Compare'}</button></div>
    </div>
  </article>;
}

export function PropertyGrid({ items, compact = false }) {
  return <div className="property-grid">{items.map((property) => <PropertyCard key={property.id} property={property} compact={compact}/>)}</div>;
}

export function AgentCard({ agent }) {
  return <article className="agent-card"><Link to={`/agents/${agent.id}`} className="agent-photo"><img src={`https://images.unsplash.com/${agent.photo}?auto=format&fit=crop&w=500&q=80`} alt={agent.name}/></Link><div className="agent-card-body"><div className="agent-rating"><Icon name="star" size={14} fill="currentColor"/>{agent.rating} <span>· {agent.experience} years</span></div><h3>{agent.name}</h3><p>{agent.location} specialist</p><Link className="text-link" to={`/agents/${agent.id}`}>Meet {agent.name.split(' ')[0]} <Icon name="arrow" size={15}/></Link></div></article>;
}

export function EmptyState({ icon = 'heart', title, body, action, to = '/properties' }) {
  return <div className="empty-state"><span className="empty-icon"><Icon name={icon} size={25}/></span><h2>{title}</h2><p>{body}</p><Link className="button button-dark" to={to}>{action}<Icon name="arrow" size={16}/></Link></div>;
}

export function Field({ label, ...props }) {
  return <label className="field"><span>{label}</span><input {...props}/></label>;
}