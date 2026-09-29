import React, { useEffect, useMemo, useState } from 'react';
import { agents, formatPrice, getUserListings, imageUrl, properties } from './data';
import { AgentCard, Button, EmptyState, Field, Icon, PropertyCard, PropertyGrid } from './components';
import { Link } from './navigation';
import { useApp } from './store';

const cities = [
  { name: 'Chennai', label: 'By the sea, at your pace', image: 'photo-1600607687939-ce8a6c25118c', count: '1,240 homes' },
  { name: 'Bengaluru', label: 'Room to grow', image: 'photo-1600566753086-00f18fb6b3ea', count: '980 homes' },
  { name: 'Hyderabad', label: 'A city with a softer side', image: 'photo-1600607687920-4e2a09cf159d', count: '760 homes' },
  { name: 'Mumbai', label: 'Make the city yours', image: 'photo-1600210492486-724fe5c67fb0', count: '1,510 homes' },
  { name: 'Pune', label: 'A little more breathing room', image: 'photo-1600566753190-17f0baa2a6c3', count: '640 homes' },
  { name: 'Delhi', label: 'Find your own corner', image: 'photo-1600585154340-be6161a56a0c', count: '890 homes' },
];

function SectionTitle({ eyebrow, title, copy, link, linkText = 'View all homes' }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{link && <Link className="text-link" to={link}>{linkText}<Icon name="arrow" size={15}/></Link>}</div>;
}

function SearchBox({ initialCity = '', onSearch }) {
  const [listing, setListing] = useState('Buy');
  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState('Any home');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const search = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    params.set('listing', listing === 'Rent' ? 'rent' : 'buy');
    if (type !== 'Any home') params.set('type', type);
    if (minBudget) params.set('min', minBudget);
    if (maxBudget) params.set('max', maxBudget);
    if (bedrooms) params.set('bedrooms', bedrooms);
    onSearch(`/properties${params.toString() ? `?${params.toString()}` : ''}`);
  };
  return <form className="search-box" onSubmit={search}>
    <div className="search-tabs"><button type="button" className={listing === 'Buy' ? 'selected' : ''} onClick={() => setListing('Buy')}>Buy</button><button type="button" className={listing === 'Rent' ? 'selected' : ''} onClick={() => setListing('Rent')}>Rent</button></div>
    <div className="search-fields">
      <label className="search-field search-location"><span>Where</span><select aria-label="Choose a city" value={city} onChange={(event) => setCity(event.target.value)}><option value="">Any city</option>{cities.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
      <label className="search-field"><span>Property type</span><select aria-label="Property type" value={type} onChange={(event) => setType(event.target.value)}>{['Any home', 'Apartment', 'Villa', 'Independent House', 'Penthouse', 'Studio', 'Plot'].map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className="search-field"><span>Min price</span><select aria-label="Minimum budget" value={minBudget} onChange={(event) => setMinBudget(event.target.value)}><option value="">No minimum</option><option value="5000000">₹50 L</option><option value="10000000">₹1 Cr</option><option value="20000000">₹2 Cr</option></select></label>
      <label className="search-field"><span>Max price</span><select aria-label="Maximum budget" value={maxBudget} onChange={(event) => setMaxBudget(event.target.value)}><option value="">No maximum</option><option value="10000000">₹1 Cr</option><option value="25000000">₹2.5 Cr</option><option value="50000000">₹5 Cr</option></select></label>
      <label className="search-field"><span>Bedrooms</span><select aria-label="Minimum bedrooms" value={bedrooms} onChange={(event) => setBedrooms(event.target.value)}><option value="">Any</option>{[1, 2, 3, 4].map((count) => <option value={count} key={count}>{count}+ beds</option>)}</select></label>
      <button className="button button-dark search-submit" type="submit"><Icon name="search" size={17}/><span>Find a home</span></button>
    </div>
  </form>;
}

export function HomePage({ navigate }) {
  const featured = properties.filter((item) => item.featured).slice(0, 3);
  const recent = [...properties].sort((a, b) => b.date.localeCompare(a.date)).slice(4, 7);
  return <main>
    <section className="hero">
      <img className="hero-image" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90" alt="A serene modern home opening onto a garden"/>
      <div className="hero-wash"/>
      <div className="hero-content"><span className="hero-kicker"><span/> A more thoughtful way home</span><h1>Find a place you'll{' '}<br/><em>love to call home.</em></h1><p>Discover beautiful homes, apartments and villas across India's most vibrant cities.</p><div className="hero-proof"><div className="proof-avatars"><img src={imageUrl('photo-1534528741775-53994a69daeb', 100)} alt="Nestora home seeker"/><img src={imageUrl('photo-1500648767791-00dcc994a43e', 100)} alt="Nestora home seeker"/><img src={imageUrl('photo-1580489944761-15a19d654956', 100)} alt="Nestora home seeker"/></div><span><strong>2,400+</strong> people found their place</span></div></div>
      <div className="hero-search"><SearchBox onSearch={navigate}/></div>
      <div className="hero-caption"><span>01 / 04</span><span>Slow mornings, somewhere new</span></div>
    </section>
    <section className="section section-featured"><div className="page-container"><SectionTitle eyebrow="A considered collection" title="Homes with a little something." copy="A few places our team can't stop thinking about." link="/properties"/><PropertyGrid items={featured}/></div></section>
    <section className="section section-cities"><div className="page-container"><SectionTitle eyebrow="Find your neighbourhood" title="A city to make your own."/><div className="city-grid">{cities.map((city) => <Link key={city.name} to={`/properties?city=${city.name}`} className="city-card"><img src={imageUrl(city.image, 800)} alt={`Homes in ${city.name}`}/><span className="city-overlay"/><span className="city-count">{city.count}</span><span className="city-info"><strong>{city.name}</strong><span>{city.label}</span></span><span className="city-arrow"><Icon name="arrow" size={17}/></span></Link>)}</div></div></section>
    <section className="section section-recent"><div className="page-container"><SectionTitle eyebrow="Just arrived" title="New keys, new beginnings." copy="Fresh listings, thoughtfully chosen." link="/properties"/><PropertyGrid items={recent}/></div></section>
    <section className="section why-section"><div className="page-container why-layout"><div className="why-image"><img src={imageUrl('photo-1600566753086-00f18fb6b3ea', 1200)} alt="Warm, inviting living room"/><div className="image-note"><span className="note-dash"/>A home should feel like you.</div></div><div className="why-copy"><span className="eyebrow">The Nestora difference</span><h2>Finding home should feel like a good thing.</h2><p className="why-intro">We bring a little more care to every step. Less noise, more clarity, and a real person in your corner.</p><div className="why-point"><span>01</span><div><h3>Places with possibility</h3><p>Every home is reviewed by our local team, so the details you see are the ones that matter.</p></div></div><div className="why-point"><span>02</span><div><h3>People who know the place</h3><p>Neighbourhood experts bring honest advice and a human touch to your search.</p></div></div><div className="why-point"><span>03</span><div><h3>Room to choose well</h3><p>Compare, save and explore at your pace. Good decisions don't need a countdown.</p></div></div></div></div></section>
    <section className="section how-section"><div className="page-container"><SectionTitle eyebrow="A gentler search" title="From first look to front door."/><div className="steps-grid"><div className="how-step"><span>01</span><h3>Tell us what home means.</h3><p>Choose the city, the kind of place and the details that make everyday life feel right.</p></div><div className="how-step"><span>02</span><h3>Explore without the noise.</h3><p>Browse considered listings, save favourites and compare the details side by side.</p></div><div className="how-step"><span>03</span><h3>Meet your next chapter.</h3><p>A local Nestora agent helps you ask the right questions and make it yours.</p></div></div></div></section>
    <section className="section testimonial-section"><div className="testimonial-inner"><span className="eyebrow">Kind words, real keys</span><span className="quote-mark">“</span><blockquote>For the first time, looking for a home felt exciting instead of exhausting. Aanya understood our life before she showed us a single place.</blockquote><div className="testimonial-by"><img src={imageUrl('photo-1534528741775-53994a69daeb', 100)} alt="Priya Nair"/><span><strong>Priya & Arjun Nair</strong><span>Found their home in Chennai</span></span></div><div className="testimonial-index">01 <span/> 03</div></div></section>
    <section className="cta-section"><div className="page-container cta-inner"><div><span className="eyebrow">Your next chapter starts here</span><h2>There’s a place<br/>with your name on it.</h2></div><div className="cta-right"><p>Tell us what you're looking for. We'll help you find somewhere that feels like yours.</p><Link className="button button-cream" to="/properties">Explore homes <Icon name="arrow" size={17}/></Link></div><span className="cta-orbit"/></div></section>
  </main>;
}

export function PropertiesPage({ path }) {
  const initial = new URLSearchParams(path.split('?')[1] || '');
  const [filters, setFilters] = useState({ city: initial.get('city') || '', listing: initial.get('listing') === 'rent' ? 'For Rent' : initial.get('listing') === 'buy' ? 'For Sale' : '', type: initial.get('type') || '', bedrooms: initial.get('bedrooms') || '', bathrooms: '', max: initial.get('max') || '', min: initial.get('min') || '', minArea: '', maxArea: '', furnished: '', sort: 'newest', query: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [layout, setLayout] = useState('grid');
  const [amenities, setAmenities] = useState([]);
  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return properties.filter((item) => (!filters.city || item.city === filters.city)
      && (!filters.listing || item.listing === filters.listing)
      && (!filters.type || item.type === filters.type)
      && (!filters.bedrooms || item.bedrooms >= Number(filters.bedrooms))
      && (!filters.bathrooms || item.bathrooms >= Number(filters.bathrooms))
      && (!filters.min || item.price >= Number(filters.min))
      && (!filters.max || item.price <= Number(filters.max))
      && (!filters.minArea || item.area >= Number(filters.minArea))
      && (!filters.maxArea || item.area <= Number(filters.maxArea))
      && (!filters.furnished || item.furnished === filters.furnished)
      && amenities.every((amenity) => item.amenities.includes(amenity))
      && (!query || `${item.title} ${item.address} ${item.city} ${item.type}`.toLowerCase().includes(query))
    ).sort((a, b) => filters.sort === 'low' ? a.price - b.price : filters.sort === 'high' ? b.price - a.price : filters.sort === 'views' ? b.views - a.views : b.date.localeCompare(a.date));
  }, [filters, amenities]);
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const clear = () => { setFilters({ city: '', listing: '', type: '', bedrooms: '', bathrooms: '', max: '', min: '', minArea: '', maxArea: '', furnished: '', sort: 'newest', query: '' }); setAmenities([]); };
  return <main className="page-shell"><div className="page-container">
    <div className="listing-heading"><div><span className="eyebrow">The Nestora collection</span><h1>Find your kind of place.</h1><p>Good homes, in good neighbourhoods, at your own pace.</p></div><Link className="text-link map-link" to="/explore"><Icon name="compass"/> Explore the map <Icon name="arrow" size={15}/></Link></div>
    <div className="listing-search"><Icon name="search"/><input aria-label="Search homes" placeholder="Search a city, neighbourhood or home..." value={filters.query} onChange={(event) => update('query', event.target.value)}/><span>{visible.length} homes</span></div>
    <button className="filter-mobile-trigger" onClick={() => setShowFilters(!showFilters)}><Icon name="filter"/> Filters & preferences <span>{showFilters ? 'Close' : 'Show'}</span></button>
    <div className="listing-layout"><aside className={`filter-panel ${showFilters ? 'filters-open' : ''}`}>
      <div className="filter-title"><div><Icon name="filter"/><strong>Refine your search</strong></div><button onClick={clear}>Clear all</button></div>
      <div className="filter-section"><span className="filter-label">I'm looking to</span><div className="segmented"><button className={!filters.listing || filters.listing === 'For Sale' ? 'active' : ''} onClick={() => update('listing', 'For Sale')}>Buy</button><button className={filters.listing === 'For Rent' ? 'active' : ''} onClick={() => update('listing', 'For Rent')}>Rent</button></div></div>
      <label className="filter-field"><span>City</span><select value={filters.city} onChange={(event) => update('city', event.target.value)}><option value="">All cities</option>{cities.map((city) => <option key={city.name}>{city.name}</option>)}</select></label>
      <label className="filter-field"><span>Property type</span><select value={filters.type} onChange={(event) => update('type', event.target.value)}><option value="">Any type</option>{['Apartment', 'Villa', 'Independent House', 'Penthouse', 'Studio', 'Plot'].map((type) => <option key={type}>{type}</option>)}</select></label>
      <div className="filter-section"><span className="filter-label">Price range</span><div className="range-fields"><input aria-label="Minimum price in rupees" placeholder="Min ₹" type="number" value={filters.min} onChange={(event) => update('min', event.target.value)}/><span>to</span><input aria-label="Maximum price in rupees" placeholder="Max ₹" type="number" value={filters.max} onChange={(event) => update('max', event.target.value)}/></div></div>
      <label className="filter-field"><span>Bedrooms</span><select value={filters.bedrooms} onChange={(event) => update('bedrooms', event.target.value)}><option value="">Any</option>{[1, 2, 3, 4, 5].map((bed) => <option key={bed} value={bed}>{bed}+ bedrooms</option>)}</select></label>
      <label className="filter-field"><span>Bathrooms</span><select value={filters.bathrooms} onChange={(event) => update('bathrooms', event.target.value)}><option value="">Any</option>{[1, 2, 3, 4].map((bath) => <option key={bath} value={bath}>{bath}+ bathrooms</option>)}</select></label>
      <div className="filter-section"><span className="filter-label">Area (sqft)</span><div className="range-fields"><input aria-label="Minimum area in square feet" placeholder="Min" type="number" value={filters.minArea} onChange={(event) => update('minArea', event.target.value)}/><span>to</span><input aria-label="Maximum area in square feet" placeholder="Max" type="number" value={filters.maxArea} onChange={(event) => update('maxArea', event.target.value)}/></div></div>
      <label className="filter-field"><span>Furnishing</span><select value={filters.furnished} onChange={(event) => update('furnished', event.target.value)}><option value="">Any</option><option>Furnished</option><option>Semi-furnished</option><option>Unfurnished</option></select></label>
      <div className="filter-section"><span className="filter-label">Amenities</span><div className="amenity-checks">{['Parking', 'Swimming Pool', 'Gym', 'Security', 'Balcony', 'Garden', 'Power Backup', 'Lift'].map((amenity) => <label key={amenity}><input type="checkbox" checked={amenities.includes(amenity)} onChange={() => setAmenities((current) => current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity])}/><span>{amenity}</span></label>)}</div></div>
      {showFilters && <Button className="apply-filters" onClick={() => setShowFilters(false)}>Show {visible.length} homes <Icon name="arrow" size={16}/></Button>}
    </aside>
    <section className="results-column"><div className="results-toolbar"><span><strong>{visible.length}</strong> thoughtfully chosen homes</span><div className="results-tools"><label>Sort by <select aria-label="Sort homes" value={filters.sort} onChange={(event) => update('sort', event.target.value)}><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="views">Most viewed</option></select></label><div className="view-switch"><button aria-label="Grid view" className={layout === 'grid' ? 'active' : ''} onClick={() => setLayout('grid')}><Icon name="grid" size={17}/></button><button aria-label="List view" className={layout === 'list' ? 'active' : ''} onClick={() => setLayout('list')}><Icon name="list" size={18}/></button></div></div></div>
      {visible.length ? <div className={layout === 'list' ? 'property-grid list-view' : 'property-grid'}>{visible.map((property) => <PropertyCard key={property.id} property={property}/>)}</div> : <EmptyState icon="search" title="No homes in this search." body="Try widening your filters or exploring another neighbourhood." action="Clear filters" to="/properties"/>}
    </section></div>
  </div></main>;
}

export function DetailPage({ id }) {
  const property = useMemo(() => properties.find((item) => item.id === id) || getUserListings().find((item) => item.id === id), [id]);
  const { favorites, toggleFavorite, trackView, notify } = useApp();
  const [sent, setSent] = useState(false);
  const [photo, setPhoto] = useState(0);
  useEffect(() => { if (property) trackView(property.id); }, [property, trackView]);
  if (!property) return <NotFoundPage/>;
  const agent = agents.find((item) => item.id === property.agentId);
  const similar = properties.filter((item) => item.city === property.city && item.id !== property.id).slice(0, 3);
  const submit = (event) => { event.preventDefault(); setSent(true); notify('Your inquiry has been sent to the agent'); };
  return <main className="page-shell detail-page"><div className="page-container">
    <div className="breadcrumbs"><Link to="/">Home</Link><Icon name="chevron" size={13}/><Link to="/properties">Homes</Link><Icon name="chevron" size={13}/><span>{property.city}</span></div>
    <div className="detail-topline"><div><span className="eyebrow">{property.type} · {property.listing === 'For Rent' ? 'For rent' : 'For sale'}</span><h1>{property.title}</h1><p><Icon name="pin" size={16}/>{property.address}</p></div><div className="detail-price"><strong>{formatPrice(property.price, property.listing)}</strong><span>Thoughtfully priced</span></div></div>
    <div className="gallery-layout"><div className="gallery-main"><img src={property.images[photo]} alt={`${property.title}, view ${photo + 1}`}/><span className="gallery-counter">0{photo + 1} / 04</span><button className="gallery-next" aria-label="Next photo" onClick={() => setPhoto((photo + 1) % property.images.length)}><Icon name="arrow"/></button></div><div className="gallery-thumbs">{property.images.slice(1).map((image, index) => <button key={image} className={photo === index + 1 ? 'selected' : ''} onClick={() => setPhoto(index + 1)}><img src={image} alt={`${property.title} view ${index + 2}`}/></button>)}</div><div className="gallery-actions"><button className={favorites.includes(property.id) ? 'saved' : ''} onClick={() => toggleFavorite(property.id)}><Icon name="heart" fill={favorites.includes(property.id) ? 'currentColor' : 'none'}/> {favorites.includes(property.id) ? 'Saved' : 'Save home'}</button><button onClick={() => { navigator.clipboard?.writeText(window.location.href); notify('Link copied to clipboard'); }}><Icon name="share"/> Share</button></div></div>
    <div className="detail-layout"><div className="detail-content">
      <div className="stats-row"><div><Icon name="bed"/><strong>{property.bedrooms || '—'}</strong><span>Bedrooms</span></div><div><Icon name="bath"/><strong>{property.bathrooms || '—'}</strong><span>Bathrooms</span></div><div><Icon name="area"/><strong>{property.area.toLocaleString()}</strong><span>Square feet</span></div><div><Icon name="area"/><strong>{property.parking}</strong><span>Parking spots</span></div></div>
      <section className="detail-section"><span className="eyebrow">A closer look</span><h2>A home with room to live.</h2><p className="detail-description">{property.description} Every detail has been chosen to make day-to-day living feel effortless, from the natural light to the thoughtful flow between rooms.</p></section>
      <section className="detail-section"><span className="eyebrow">The little extras</span><h2>What makes it special.</h2><div className="amenity-grid">{property.amenities.map((amenity) => <span key={amenity}><Icon name="check" size={16}/>{amenity}</span>)}</div></section>
      <section className="detail-section property-facts"><span className="eyebrow">The details</span><h2>Good to know.</h2><div className="fact-grid"><span>Property type<strong>{property.type}</strong></span><span>Furnishing<strong>{property.furnished}</strong></span><span>Property age<strong>{property.age}</strong></span><span>Parking<strong>{property.parking} spaces</strong></span></div></section>
      <section className="detail-section floorplan-section"><div><span className="eyebrow">See the flow</span><h2>Room to make it yours.</h2><p>Get a feel for the space and start imagining where everything goes.</p></div><div className="floor-plan"><span className="floor-room room-living">Living / Dining</span><span className="floor-room room-bed">Bedroom</span><span className="floor-room room-kitchen">Kitchen</span><span className="floor-room room-bath">Bath</span><span className="floor-room room-bed-two">Bedroom</span></div></section>
      <section className="detail-section"><span className="eyebrow">Around the corner</span><h2>Get to know {property.city}.</h2><div className="neighborhood-card"><div className="neighborhood-map"><span className="map-road road-one"/><span className="map-road road-two"/><span className="map-green"/><span className="map-pin-dot"><Icon name="pin" size={20}/></span></div><div className="nearby-list"><span><strong>12 min</strong> to the city centre</span><span><strong>6 min</strong> to the nearest park</span><span><strong>8 min</strong> to local cafés</span><Link to={`/explore?city=${property.city}`} className="text-link">Explore the neighbourhood <Icon name="arrow" size={15}/></Link></div></div></section>
    </div><aside className="contact-card"><span className="eyebrow">A local expert, in your corner</span><div className="contact-agent"><img src={imageUrl(agent.photo, 160)} alt={agent.name}/><div><strong>{agent.name}</strong><span>{agent.location} specialist · {agent.rating} ★</span></div></div><p>Ask a question or arrange a visit. {agent.name.split(' ')[0]} will be in touch soon.</p>{sent ? <div className="success-panel"><Icon name="check"/><strong>You're on your way.</strong><span>{agent.name.split(' ')[0]} will be in touch shortly.</span></div> : <form className="contact-form" onSubmit={submit}><Field label="Your name" placeholder="Name" required/><Field label="Email address" placeholder="you@example.com" type="email" required/><Field label="Phone number" placeholder="+91" type="tel" required/><label className="field"><span>Your message</span><textarea defaultValue={`I'd love to know more about ${property.title}.`} rows="3" required/></label><Button type="submit" className="full-button">Send an inquiry <Icon name="arrow" size={16}/></Button><span className="form-note">No pressure. Just a helpful conversation.</span></form>}<a className="agent-phone" href={`tel:${agent.phone}`}><Icon name="phone"/>{agent.phone}</a></aside></div>
    <section className="detail-similar"><SectionTitle eyebrow="In the neighbourhood" title="A few more to consider." link={`/properties?city=${property.city}`} linkText="See homes in this city"/><PropertyGrid items={similar}/></section>
  </div></main>;
}

function MapPanel({ items, selected, onSelect, active }) {
  const mapElement = React.useRef(null);
  const mapRef = React.useRef(null);
  const [mapStatus, setMapStatus] = useState('loading');
  useEffect(() => {
    let cancelled = false;
    if (!active) return undefined;
    const start = () => {
      if (cancelled || !window.L || !mapElement.current || mapRef.current) return;
      const center = items[0] ? [items[0].latitude, items[0].longitude] : [12.9716, 77.5946];
      const map = window.L.map(mapElement.current, { scrollWheelZoom: false }).setView(center, 12);
      mapRef.current = map;
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 19 }).addTo(map);
      items.forEach((item) => {
        const marker = window.L.circleMarker([item.latitude, item.longitude], { radius: item.id === selected ? 10 : 7, color: '#fff', weight: 2, fillColor: item.id === selected ? '#d46f49' : '#12372a', fillOpacity: 1 }).addTo(map);
        marker.bindTooltip(formatPrice(item.price, item.listing), { direction: 'top', offset: [0, -8] });
        marker.on('click', () => { onSelect(item.id); marker.openTooltip(); });
      });
      if (items.length > 1) map.fitBounds(items.map((item) => [item.latitude, item.longitude]), { padding: [30, 30], maxZoom: 13 });
      setMapStatus('ready');
    };
    if (window.L) start();
    else {
      const existing = document.querySelector('script[data-leaflet]');
      const script = existing || document.createElement('script');
      if (!existing) { script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; script.dataset.leaflet = 'true'; document.body.appendChild(script); }
      const css = document.querySelector('link[data-leaflet]') || document.createElement('link');
      if (!css.parentNode) { css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; css.dataset.leaflet = 'true'; document.head.appendChild(css); }
      script.addEventListener('load', start);
      script.addEventListener('error', () => { if (!cancelled) setMapStatus('unavailable'); });
      if (window.L) start();
    }
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; };
  }, [items, selected, onSelect, active]);
  return <div className="leaflet-map" ref={mapElement} aria-label="OpenStreetMap property map">{mapStatus !== 'ready' && <div className="map-fallback-label">{mapStatus === 'unavailable' ? 'Map unavailable · Browse homes in the list' : 'Map loading · OpenStreetMap'}</div>}</div>;
}

export function ExplorePage({ path }) {
  const initialCity = new URLSearchParams(path.split('?')[1] || '').get('city') || '';
  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selected, setSelected] = useState('');
  const [mobileView, setMobileView] = useState('list');
  const items = useMemo(() => properties.filter((item) => (!city || item.city === city) && (!type || item.type === type) && (!maxPrice || item.price <= Number(maxPrice))), [city, type, maxPrice]);
  const onSelect = React.useCallback((id) => setSelected(id), []);
  return <main className="explore-page"><div className="explore-panel"><div className="explore-heading"><span className="eyebrow">A feel for the place</span><h1>Explore the map.</h1></div><div className="explore-controls"><label><Icon name="pin"/><select aria-label="Filter by city" value={city} onChange={(event) => setCity(event.target.value)}><option value="">Everywhere</option>{cities.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label><Icon name="filter"/><select aria-label="Filter by property type" value={type} onChange={(event) => setType(event.target.value)}><option value="">Any home</option>{['Apartment', 'Villa', 'Independent House', 'Penthouse', 'Studio', 'Plot'].map((item) => <option key={item}>{item}</option>)}</select></label><label><select aria-label="Filter by maximum price" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="">Any price</option><option value="15000000">Under ₹1.5 Cr</option><option value="30000000">Under ₹3 Cr</option><option value="50000000">Under ₹5 Cr</option></select></label></div><div className="explore-results-head"><span>{items.length} homes nearby</span><Link to="/properties" className="text-link">All filters <Icon name="arrow" size={14}/></Link></div><div className={`explore-list ${mobileView === 'map' ? 'mobile-hide' : ''}`}>{items.map((item) => <button key={item.id} className={`explore-card ${selected === item.id ? 'selected' : ''}`} onClick={() => setSelected(item.id)}><img src={item.image} alt=""/><span className="explore-card-copy"><span className="property-type">{item.type}</span><strong>{item.title}</strong><span>{item.address}</span><b>{formatPrice(item.price, item.listing)}</b></span></button>)}</div></div><div className={`explore-map-wrap ${mobileView === 'list' ? 'mobile-hide' : ''}`}><MapPanel items={items} selected={selected} onSelect={onSelect} active={mobileView === 'map' || window.innerWidth > 760}/><div className="map-tip"><Icon name="pin" size={15}/> Select a price to see the home</div></div><div className="explore-mobile-toggle"><button className={mobileView === 'list' ? 'active' : ''} onClick={() => setMobileView('list')}><Icon name="list"/> List</button><button className={mobileView === 'map' ? 'active' : ''} onClick={() => setMobileView('map')}><Icon name="pin"/> Map</button></div></main>;
}

export function FavoritesPage() {
  const { favorites } = useApp();
  const saved = [...properties, ...getUserListings()].filter((item) => favorites.includes(item.id));
  return <main className="page-shell"><div className="page-container"><div className="page-heading"><span className="eyebrow">Your considered collection</span><h1>My saved homes.</h1><p>Places worth coming back to, all in one little corner.</p></div>{saved.length ? <><div className="saved-summary">{saved.length} {saved.length === 1 ? 'home' : 'homes'} saved for later <Link className="text-link" to="/compare">Compare your shortlist <Icon name="arrow" size={15}/></Link></div><PropertyGrid items={saved}/></> : <EmptyState title="Your dream home is waiting." body="Save the places that feel like a possibility. We'll keep them right here for you." action="Explore properties"/>}</div></main>;
}

export function ComparePage() {
  const { compare, toggleCompare } = useApp();
  const allHomes = [...properties, ...getUserListings()];
  const items = compare.map((id) => allHomes.find((item) => item.id === id)).filter(Boolean);
  const rows = [['Price', (item) => formatPrice(item.price, item.listing)], ['Location', (item) => item.address], ['Property type', (item) => item.type], ['Area', (item) => `${item.area.toLocaleString()} sqft`], ['Bedrooms', (item) => item.bedrooms || '—'], ['Bathrooms', (item) => item.bathrooms || '—'], ['Parking', (item) => `${item.parking} spaces`], ['Furnishing', (item) => item.furnished], ['Property age', (item) => item.age], ...['Swimming Pool', 'Gym', 'Security', 'Garden'].map((name) => [name, (item) => item.amenities.includes(name) ? 'Yes' : 'No'])];
  return <main className="page-shell"><div className="page-container"><div className="page-heading"><span className="eyebrow">Make a considered choice</span><h1>Compare your shortlist.</h1><p>See the details side by side and find the right fit.</p></div>{items.length ? <div className="compare-wrap"><table className="compare-table"><thead><tr><th>At a glance</th>{items.map((item) => <th key={item.id}><div className="compare-property"><img src={item.image} alt=""/><div><Link to={`/property/${item.id}`}>{item.title}</Link><strong>{formatPrice(item.price, item.listing)}</strong></div><button onClick={() => toggleCompare(item.id)} aria-label={`Remove ${item.title} from comparison`}><Icon name="close" size={17}/></button></div></th>)}</tr></thead><tbody>{rows.map(([label, value], index) => { const values = items.map(value); const unique = new Set(values).size > 1; return <tr key={label} className={unique ? 'different-row' : ''}><th>{label}</th>{values.map((entry, column) => <td key={`${label}-${column}`}>{entry}</td>)}</tr>; })}</tbody></table><div className="compare-add"><span>{items.length} of 3 places in your comparison</span><Link className="text-link" to="/properties">Add another home <Icon name="arrow" size={15}/></Link></div></div> : <EmptyState icon="grid" title="A clearer choice starts here." body="Add up to three homes to compare the details side by side." action="Find homes to compare"/>}</div></main>;
}

export function AgentsPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const matches = agents.filter((agent) => `${agent.name} ${agent.location}`.toLowerCase().includes(query.toLowerCase()) && (!city || agent.location === city));
  return <main className="page-shell"><div className="page-container"><div className="agents-hero"><span className="eyebrow">Good people, good places</span><h1>Meet your local expert.</h1><p>Real neighbourhood knowledge, a listening ear, and someone in your corner from first look to front door.</p><div className="agent-search"><Icon name="search"/><input placeholder="Search by name or city" aria-label="Search agents" value={query} onChange={(event) => setQuery(event.target.value)}/><select aria-label="Filter agents by city" value={city} onChange={(event) => setCity(event.target.value)}><option value="">Every city</option>{cities.map((item) => <option key={item.name}>{item.name}</option>)}</select></div></div><div className="agents-summary">{matches.length} local {matches.length === 1 ? 'expert' : 'experts'} ready to help</div><div className="agent-grid">{matches.map((agent) => <AgentCard key={agent.id} agent={agent}/>)}</div>{matches.length === 0 && <EmptyState icon="search" title="No matching experts." body="Try another name or city." action="Clear search" to="/agents"/>}</div></main>;
}

export function AgentPage({ id }) {
  const agent = agents.find((item) => item.id === id);
  const [sent, setSent] = useState(false);
  if (!agent) return <NotFoundPage/>;
  const listings = properties.filter((item) => item.agentId === id);
  return <main className="page-shell"><div className="page-container"><div className="breadcrumbs"><Link to="/agents">Our agents</Link><Icon name="chevron" size={13}/><span>{agent.name}</span></div><section className="agent-profile"><img src={imageUrl(agent.photo, 900)} alt={agent.name}/><div className="agent-profile-copy"><span className="eyebrow">Your local expert · {agent.location}</span><h1>{agent.name}</h1><div className="agent-profile-rating"><Icon name="star" fill="currentColor" size={16}/>{agent.rating} <span>· {agent.experience} years helping people find home</span></div><p>{agent.bio}</p><div className="agent-profile-stats"><span><strong>{agent.experience}</strong>years experience</span><span><strong>{agent.listings}</strong>active listings</span><span><strong>{agent.rating}</strong>client rating</span></div><a className="button button-dark" href={`mailto:${agent.email}`}><Icon name="mail"/> Get in touch <Icon name="arrow" size={15}/></a></div></section><div className="agent-profile-bottom"><section className="agent-listings"><SectionTitle eyebrow="A few places to begin" title={`${agent.name.split(' ')[0]}'s homes.`}/><PropertyGrid items={listings.slice(0, 3)}/><div className="agent-review"><span className="eyebrow">From a recent client</span><span className="quote-mark">“</span><blockquote>“{agent.name.split(' ')[0]} listened to what mattered to us and found a place that felt right from the moment we walked in.”</blockquote><span className="review-author">Ananya S. · {agent.location}</span></div></section><aside className="agent-contact-form"><span className="eyebrow">Start a conversation</span><h2>Tell {agent.name.split(' ')[0]} what you're looking for.</h2>{sent ? <div className="success-panel"><Icon name="check"/><strong>Message sent.</strong><span>{agent.name.split(' ')[0]} will be in touch soon.</span></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><Field label="Your name" placeholder="Name" required/><Field label="Email" placeholder="you@example.com" type="email" required/><label className="field"><span>What are you looking for?</span><textarea rows="4" required placeholder="Share a little about your next move..."/></label><Button className="full-button">Send a note <Icon name="arrow" size={15}/></Button></form>}</aside></div></div></main>;
}

export function AuthPage({ mode, navigate }) {
  const { signIn, notify } = useApp();
  const [error, setError] = useState('');
  const isRegister = mode === 'register';
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = form.get('password');
    if (isRegister && password !== form.get('confirm')) { setError('Those passwords don’t match yet.'); return; }
    if (String(password).length < 6) { setError('Use at least 6 characters for your password.'); return; }
    signIn({ name: form.get('name') || String(form.get('email')).split('@')[0], email: form.get('email'), role: form.get('role') || 'Buyer' });
    notify(isRegister ? 'Your Nestora account is ready' : 'Welcome back to Nestora');
    navigate('/dashboard');
  };
  return <main className="auth-page"><div className="auth-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Sunlit home surrounded by greenery"/><span className="auth-image-note"><span className="eyebrow">A place to begin again</span>“The best journeys<br/>start at the front door.”</span></div><div className="auth-side"><div className="auth-form-wrap"><span className="eyebrow">{isRegister ? 'Make yourself at home' : 'Your next chapter is here'}</span><h1>{isRegister ? 'Let’s find your place.' : 'Welcome back.'}</h1><p>{isRegister ? 'Create an account and start saving the homes that feel like you.' : 'Sign in and pick up right where you left off.'}</p>{error && <div className="form-error" role="alert">{error}</div>}<form className="auth-form" onSubmit={submit}>{isRegister && <Field label="Full name" name="name" placeholder="Your name" autoComplete="name" required/>}<Field label="Email address" name="email" type="email" placeholder="you@example.com" autoComplete="email" required/>{isRegister && <Field label="Phone number" name="phone" type="tel" placeholder="+91 98765 43210" required/>}<Field label="Password" name="password" type="password" placeholder="At least 6 characters" autoComplete={isRegister ? 'new-password' : 'current-password'} required minLength="6"/>{isRegister && <><Field label="Confirm password" name="confirm" type="password" placeholder="Enter your password again" required/><label className="field"><span>I'm here as a</span><select name="role"><option>Buyer</option><option>Seller</option><option>Agent</option></select></label></>}{!isRegister && <div className="auth-options"><label><input type="checkbox"/> Remember me</label><button type="button" onClick={() => notify('Password reset instructions are on their way')}>Forgot password?</button></div>}<Button className="full-button">{isRegister ? 'Create my account' : 'Sign in'} <Icon name="arrow" size={15}/></Button></form><div className="auth-divider"><span>or continue with</span></div><button className="google-button" onClick={() => { signIn({ name: 'Nestora Guest', email: 'guest@nestora.in', role: 'Buyer' }); notify('Signed in with Google demo'); navigate('/dashboard'); }}><span className="google-g">G</span> Continue with Google</button><p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to Nestora?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create an account'}</Link></p></div><span className="auth-foot">Thoughtful homes. Real people. Better beginnings.</span></div></main>;
}

const dashboardNav = [['/dashboard', 'Dashboard', 'grid'], ['/dashboard/settings', 'My profile', 'area'], ['/favorites', 'Saved properties', 'heart'], ['/dashboard/properties', 'My properties', 'compass'], ['/dashboard/inquiries', 'My inquiries', 'mail'], ['/properties', 'Property alerts', 'filter'], ['/dashboard/inquiries', 'Messages', 'mail'], ['/dashboard/settings', 'Settings', 'filter']];

function DashboardLayout({ children, active }) {
  const { user, signOut } = useApp();
  return <main className="dashboard-page"><aside className="dashboard-sidebar"><Link to="/dashboard" className="dashboard-brand"><span className="brand-mark">n.</span><span>My Nestora</span></Link><span className="dashboard-nav-label">YOUR SPACE</span>{dashboardNav.map(([to, label, icon]) => <Link key={label} to={to} className={`dashboard-nav-item ${active === to ? 'active' : ''}`}><Icon name={icon} size={18}/>{label}{label === 'My inquiries' && <span className="nav-counter">3</span>}</Link>)}<div className="dashboard-sidebar-bottom"><div className="dashboard-user"><span>{(user?.name || 'Guest').slice(0, 1).toUpperCase()}</span><div><strong>{user?.name || 'Nestora guest'}</strong><small>{user?.email || 'Your account'}</small></div></div><button onClick={signOut}><Icon name="logout" size={16}/> Sign out</button></div></aside><section className="dashboard-main">{children}</section></main>;
}

export function DashboardPage() {
  const { user, favorites, recent } = useApp();
  const viewed = recent.map((id) => properties.find((item) => item.id === id)).filter(Boolean);
  const recommended = properties.filter((item) => !favorites.includes(item.id)).slice(3, 6);
  return <DashboardLayout active="/dashboard"><div className="dashboard-welcome"><span className="eyebrow">MONDAY, SEPTEMBER 28, 2026</span><h1>Good morning, {(user?.name || 'friend').split(' ')[0]}.</h1><p>Your next chapter is looking good.</p></div><div className="dashboard-metrics"><div><span className="metric-icon"><Icon name="heart"/></span><span>Saved homes</span><strong>{favorites.length}</strong><Link to="/favorites">See your saved list <Icon name="arrow" size={14}/></Link></div><div><span className="metric-icon metric-warm"><Icon name="mail"/></span><span>Open inquiries</span><strong>3</strong><Link to="/dashboard/inquiries">See your messages <Icon name="arrow" size={14}/></Link></div><div><span className="metric-icon metric-olive"><Icon name="compass"/></span><span>Homes viewed</span><strong>{recent.length}</strong><Link to="/properties">Keep exploring <Icon name="arrow" size={14}/></Link></div></div><section className="dashboard-section"><SectionTitle eyebrow="A little more to consider" title="Picked for your next chapter." link="/properties"/><PropertyGrid items={recommended} compact/></section><section className="dashboard-section"><SectionTitle eyebrow="Your recent visits" title="Pick up where you left off." link="/properties"/>{viewed.length ? <PropertyGrid items={viewed.slice(0, 3)} compact/> : <div className="dashboard-empty"><p>Homes you look at will find their way here.</p><Link className="text-link" to="/properties">Take a look around <Icon name="arrow" size={14}/></Link></div>}</section><section className="activity-panel"><span className="eyebrow">Your Nestora notes</span><h2>There’s a little more to do.</h2><div className="activity-item"><span className="activity-dot"/><p><strong>Three agents are ready to help.</strong><span>Start a conversation when a home feels right.</span></p><Link to="/agents"><Icon name="arrow" size={16}/></Link></div><div className="activity-item"><span className="activity-dot olive"/><p><strong>Save a search for later.</strong><span>Your favourites stay right here, whenever you need them.</span></p><Link to="/favorites"><Icon name="arrow" size={16}/></Link></div></section></DashboardLayout>;
}

export function SellerPropertiesPage({ navigate }) {
  const { notify } = useApp();
  const [listings, setListings] = useState(() => { try { return JSON.parse(localStorage.getItem('nestora:listings') || '[]'); } catch { return []; } });
  const [removed, setRemoved] = useState(() => { try { return JSON.parse(localStorage.getItem('nestora:removed-listings') || '[]'); } catch { return []; } });
  const all = [...listings, ...properties.slice(0, 4).filter((item) => !removed.includes(item.id))];
  const remove = (id) => {
    if (listings.some((item) => item.id === id)) {
      const next = listings.filter((item) => item.id !== id);
      setListings(next);
      localStorage.setItem('nestora:listings', JSON.stringify(next));
    } else {
      const next = [...removed, id];
      setRemoved(next);
      localStorage.setItem('nestora:removed-listings', JSON.stringify(next));
    }
    notify('Listing removed');
  };
  return <DashboardLayout active="/dashboard/properties"><div className="dashboard-heading-row"><div><span className="eyebrow">YOUR LISTINGS</span><h1>My properties.</h1><p>Keep an eye on the homes you’ve shared.</p></div><Link to="/sell" className="button button-dark">+ Add a property</Link></div><div className="seller-listings">{all.map((item, index) => <article className="seller-listing" key={item.id}><img src={item.image} alt=""/><div className="seller-listing-info"><span className="listing-status">{index < listings.length ? 'In review' : 'Published'}</span><Link to={`/property/${item.id}`}><strong>{item.title}</strong></Link><span>{item.address}</span><b>{formatPrice(item.price, item.listing)}</b></div><div className="seller-stats"><span><strong>{item.views || 120 + index * 21}</strong> views</span><span><strong>{index + 2}</strong> inquiries</span></div><div className="seller-actions"><Link to={`/property/${item.id}`} aria-label="View property"><Icon name="arrow" size={17}/></Link><button aria-label="Edit property" onClick={() => navigate('/sell')}><Icon name="filter" size={17}/></button><button aria-label="Delete property" onClick={() => remove(item.id)}><Icon name="close" size={17}/></button></div></article>)}</div><Link className="seller-empty-link" to="/sell"><span>+</span><div><strong>Have another home to share?</strong><small>Add a listing in just a few minutes.</small></div><Icon name="arrow"/></Link></DashboardLayout>;
}

export function InquiriesPage() {
  const initial = properties.slice(0, 5).map((item, index) => ({ id: `inquiry-${index}`, property: item, name: ['Priya Nair', 'Arjun Mehta', 'Diya Kapoor', 'Vikram Rao', 'Neha Shah'][index], date: `Sep ${28 - index * 3}, 2026`, message: ['Could we arrange a viewing this weekend?', 'Is the quoted price negotiable?', 'Would love to know more about the neighbourhood.', 'Is this home available for a long-term lease?', 'Can you share a floor plan?'][index], status: ['New', 'Contacted', 'New', 'Closed', 'New'][index] }));
  const [inquiries, setInquiries] = useState(initial);
  const [statusFilter, setStatusFilter] = useState('All inquiries');
  const update = (id, status) => setInquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  const visible = statusFilter === 'All inquiries' ? inquiries : inquiries.filter((item) => item.status === statusFilter);
  return <DashboardLayout active="/dashboard/inquiries"><div className="dashboard-welcome"><span className="eyebrow">YOUR CONVERSATIONS</span><h1>Inquiries.</h1><p>A few people are hoping to hear from you.</p></div><div className="inquiry-toolbar"><span>{inquiries.filter((item) => item.status === 'New').length} new messages</span><select aria-label="Filter inquiries" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All inquiries</option><option>New</option><option>Contacted</option><option>Closed</option></select></div><div className="inquiry-list">{visible.map((item) => <article className="inquiry-card" key={item.id}><div className="inquiry-property"><img src={item.property.image} alt=""/><div><span>ABOUT</span><strong>{item.property.title}</strong><small>{item.property.city}</small></div></div><div className="inquiry-message"><strong>{item.name}</strong><p>{item.message}</p><span>{item.date}</span></div><label className={`inquiry-status status-${item.status.toLowerCase()}`}><select value={item.status} aria-label={`Status for ${item.name}`} onChange={(event) => update(item.id, event.target.value)}><option>New</option><option>Contacted</option><option>Closed</option></select></label></article>)}</div></DashboardLayout>;
}

export function SettingsPage() {
  const { user, signIn, notify } = useApp();
  return <DashboardLayout active="/dashboard/settings"><div className="dashboard-welcome"><span className="eyebrow">YOUR DETAILS</span><h1>Settings.</h1><p>A few little details to make this feel more like yours.</p></div><form className="settings-form" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); signIn({ ...user, name: form.get('name'), email: form.get('email') }); notify('Your details have been updated'); }}><h2>Your profile</h2><Field label="Full name" name="name" defaultValue={user?.name || ''} required/><Field label="Email address" name="email" type="email" defaultValue={user?.email || ''} required/><label className="settings-check"><input type="checkbox" defaultChecked/> Send me thoughtful home recommendations</label><Button>Save changes <Icon name="check" size={15}/></Button></form></DashboardLayout>;
}

const listingSteps = ['Basics', 'Details', 'Amenities', 'Photos', 'Description', 'Review'];

export function SellPage({ navigate }) {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({ title: '', type: 'Apartment', listing: 'For Sale', location: '', price: '', bedrooms: '2', bathrooms: '2', area: '', parking: '1', furnished: 'Unfurnished', description: '' });
  const [amenities, setAmenities] = useState([]);
  const change = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const publish = () => {
    const item = { ...properties[0], ...values, id: `new-${Date.now()}`, address: values.location, city: values.location.split(',').pop().trim(), price: Number(values.price) || properties[0].price, image: properties[0].image, amenities, date: new Date().toISOString().slice(0, 10), views: 0 };
    const saved = JSON.parse(localStorage.getItem('nestora:listings') || '[]');
    localStorage.setItem('nestora:listings', JSON.stringify([item, ...saved]));
    setSuccess(true);
  };
  if (success) return <main className="sell-page"><div className="sell-success"><span className="sell-success-icon"><Icon name="check" size={25}/></span><span className="eyebrow">A new beginning</span><h1>Your home is in good hands.</h1><p>Your listing is ready for review. We'll let you know as soon as it goes live.</p><div><Link className="button button-dark" to="/dashboard/properties">View my listings <Icon name="arrow" size={15}/></Link><Link className="text-link" to="/">Back to Nestora</Link></div></div></main>;
  return <main className="sell-page"><div className="sell-container"><div className="sell-intro"><span className="eyebrow">A better way to find the next owner</span><h1>Good homes deserve{' '}<br/><em>good beginnings.</em></h1><p>Share a few details. Our team will help your home find the right person.</p></div><div className="sell-progress">{listingSteps.map((label, index) => <div className={index <= step ? 'current' : ''} key={label}><span>{index < step ? <Icon name="check" size={14}/> : `0${index + 1}`}</span><small>{label}</small></div>)}</div><form className="sell-form" onSubmit={(event) => { event.preventDefault(); if (step < listingSteps.length - 1) setStep(step + 1); else publish(); }}><div className="sell-form-top"><span className="eyebrow">STEP 0{step + 1} OF 06</span><h2>{['Start with the basics', 'The details that matter', 'The little extras', 'A first look', 'Tell us about the feeling', 'One last look'][step]}</h2><p>{['A title, a place and the kind of home you’re sharing.', 'A few numbers help the right people find you.', 'What makes this home especially lovely?', 'Add a photograph to help people picture their next chapter.', 'Share what you love most about living here.', 'Take a moment to review before your listing goes live.'][step]}</p></div>
    {step === 0 && <div className="sell-fields"><Field label="Property title" name="title" placeholder="e.g. The Canopy House" value={values.title} onChange={change} required/><label className="field"><span>Property type</span><select name="type" value={values.type} onChange={change}>{['Apartment', 'Villa', 'Independent House', 'Penthouse', 'Studio', 'Plot'].map((item) => <option key={item}>{item}</option>)}</select></label><label className="field"><span>Listing type</span><select name="listing" value={values.listing} onChange={change}><option>For Sale</option><option>For Rent</option></select></label><label className="field field-wide"><span>Neighbourhood, city</span><input name="location" placeholder="e.g. Adyar, Chennai" value={values.location} onChange={change} required/></label></div>}
    {step === 1 && <div className="sell-fields"><Field label="Price (₹)" name="price" type="number" placeholder="e.g. 24500000" value={values.price} onChange={change} required/><label className="field"><span>Bedrooms</span><select name="bedrooms" value={values.bedrooms} onChange={change}>{[0, 1, 2, 3, 4, 5].map((item) => <option key={item}>{item}</option>)}</select></label><label className="field"><span>Bathrooms</span><select name="bathrooms" value={values.bathrooms} onChange={change}>{[0, 1, 2, 3, 4, 5].map((item) => <option key={item}>{item}</option>)}</select></label><Field label="Area (sqft)" name="area" type="number" placeholder="e.g. 1840" value={values.area} onChange={change} required/><Field label="Parking spaces" name="parking" type="number" min="0" value={values.parking} onChange={change}/><label className="field"><span>Furnishing</span><select name="furnished" value={values.furnished} onChange={change}><option>Unfurnished</option><option>Semi-furnished</option><option>Furnished</option></select></label></div>}
    {step === 2 && <div className="sell-amenities">{['Parking', 'Swimming Pool', 'Gym', 'Security', 'Balcony', 'Garden', 'Power Backup', 'Lift'].map((item) => <label key={item}><input type="checkbox" checked={amenities.includes(item)} onChange={() => setAmenities((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}/><span><Icon name="check" size={15}/>{item}</span></label>)}</div>}
    {step === 3 && <label className="upload-area"><input type="file" accept="image/*" multiple onChange={(event) => event.target.files.length && setValues((current) => ({ ...current, photoCount: event.target.files.length }))}/><span className="upload-icon"><Icon name="area" size={23}/></span><strong>{values.photoCount ? `${values.photoCount} photos selected` : 'Add a few lovely photos'}</strong><span>Choose images from your device. JPG or PNG, up to 10 MB each.</span><small>Browse files</small></label>}
    {step === 4 && <label className="field"><span>What makes this home special?</span><textarea name="description" rows="7" placeholder="The way the light comes in. The little café around the corner. Tell us what makes this feel like home..." value={values.description} onChange={change} required/></label>}
    {step === 5 && <div className="sell-review"><img src={properties[0].image} alt="Example home"/><div><span className="property-type">{values.type} · {values.listing}</span><h3>{values.title || 'Your new listing'}</h3><p><Icon name="pin" size={14}/>{values.location || 'Location to be added'}</p><strong>{values.price ? `₹${Number(values.price).toLocaleString('en-IN')}` : 'Price to be added'}</strong></div><div className="sell-review-facts"><span>{values.bedrooms} beds</span><span>{values.bathrooms} baths</span><span>{Number(values.area || 0).toLocaleString()} sqft</span></div></div>}
    <div className="sell-form-actions">{step > 0 ? <button className="back-button" type="button" onClick={() => setStep(step - 1)}>Back</button> : <span/>}<Button type="submit">{step === 5 ? 'Publish for review' : 'Continue'} <Icon name="arrow" size={15}/></Button></div>
  </form></div></main>;
}

export function NotFoundPage() {
  return <main className="not-found"><span className="eyebrow">A little off the map</span><h1>We can’t find{' '}<br/>that place.</h1><p>The page may have moved on. Let’s find you somewhere lovely.</p><Link className="button button-dark" to="/">Back to Nestora <Icon name="arrow" size={15}/></Link></main>;
}