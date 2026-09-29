const photos = [
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600566753086-00f18fb6b3ea',
  'photo-1600210492486-724fe5c67fb0',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600047509807-ba8f99d2cdde',
];

const homes = [
  ['Palm Grove Residence', 'Adyar, Chennai', 'Chennai', 'Apartment', 24500000, 3, 3, 1840, 'For Sale', 'Sea-facing mornings, quiet evenings. This sunlit residence has generous living spaces and a thoughtfully updated kitchen.', 13.0067, 80.2572],
  ['The Canopy House', 'Indiranagar, Bengaluru', 'Bengaluru', 'Independent House', 38500000, 4, 4, 2680, 'For Sale', 'A leafy private home tucked into one of Bengaluru’s most loved neighbourhoods, with a courtyard made for long lunches.', 12.9784, 77.6408],
  ['Lakeview Terraces', 'Gachibowli, Hyderabad', 'Hyderabad', 'Apartment', 16800000, 3, 2, 1560, 'For Sale', 'A considered, light-filled apartment with open lake views, a welcoming balcony and easy access to the city’s business district.', 17.4401, 78.3489],
  ['Casa Solana', 'Bandra West, Mumbai', 'Mumbai', 'Penthouse', 78000000, 4, 4, 3120, 'For Sale', 'A rare double-height penthouse with a private terrace, warm natural materials and room to gather above the city.', 19.0596, 72.8295],
  ['Mango House', 'Koregaon Park, Pune', 'Pune', 'Villa', 32500000, 4, 3, 2860, 'For Sale', 'A relaxed garden villa with shaded verandas, mature mango trees and a separate studio for working or welcoming guests.', 18.5362, 73.8958],
  ['The Courtyard', 'Hauz Khas, Delhi', 'Delhi', 'Independent House', 55000000, 4, 4, 3050, 'For Sale', 'A calm architectural retreat close to the old village, centred around a planted courtyard and beautifully restored details.', 28.5494, 77.2001],
  ['Olive & Oak', 'Whitefield, Bengaluru', 'Bengaluru', 'Apartment', 13200000, 2, 2, 1240, 'For Sale', 'A well-planned home with a generous balcony, thoughtful storage and a community garden just outside the door.', 12.9698, 77.7499],
  ['The Marigold Villa', 'ECR, Chennai', 'Chennai', 'Villa', 46000000, 4, 5, 3380, 'For Sale', 'A coastal home designed for slow weekends: breezy rooms, a pool framed by tropical planting and the sea close by.', 12.9121, 80.2503],
  ['Skyline One', 'Jubilee Hills, Hyderabad', 'Hyderabad', 'Penthouse', 62500000, 4, 4, 2970, 'For Sale', 'A private top-floor residence with panoramic hill views, an expansive deck and a beautifully quiet primary suite.', 17.4318, 78.4071],
  ['Atelier 18', 'Andheri West, Mumbai', 'Mumbai', 'Studio', 85000, 1, 1, 720, 'For Rent', 'A bright, furnished studio with clever built-ins, a dedicated work nook and effortless metro access.', 19.1354, 72.8296],
  ['Cedar & Stone', 'Kalyani Nagar, Pune', 'Pune', 'Apartment', 18500000, 3, 3, 1710, 'For Sale', 'A refined corner apartment with warm timber finishes, an airy kitchen and landscaped views from every room.', 18.5481, 73.9036],
  ['Nila House', 'Besant Nagar, Chennai', 'Chennai', 'Independent House', 29500000, 3, 3, 2190, 'For Sale', 'A charming family home a short walk from the shore, with a sun-dappled terrace and a newly renovated interior.', 12.9995, 80.2684],
  ['Gardenia Heights', 'Sector 54, Delhi', 'Delhi', 'Apartment', 21000000, 3, 3, 1940, 'For Sale', 'An elegant, move-in-ready apartment with a tree-lined outlook, a generous utility room and excellent resident amenities.', 28.4412, 77.1094],
  ['The Veranda', 'Koramangala, Bengaluru', 'Bengaluru', 'Villa', 52000000, 5, 4, 3650, 'For Sale', 'A contemporary family villa with a covered veranda, a lush private garden and space for everyone to unwind.', 12.9346, 77.6113],
  ['Monsoon House', 'Kondapur, Hyderabad', 'Hyderabad', 'Apartment', 72000, 2, 2, 1180, 'For Rent', 'A calm, fully furnished apartment with soft morning light, a balcony overlooking greenery and a welcoming community.', 17.4648, 78.3568],
  ['Aster Court', 'Powai, Mumbai', 'Mumbai', 'Apartment', 26800000, 3, 3, 1780, 'For Sale', 'A polished family apartment with a wide lake-facing balcony, practical storage and an easy commute.', 19.1176, 72.9060],
  ['The Fern House', 'Baner, Pune', 'Pune', 'Independent House', 28500000, 4, 3, 2550, 'For Sale', 'A welcoming home with a planted terrace, generous entertaining spaces and a quiet lane setting.', 18.5590, 73.7868],
  ['Lotus Court', 'Velachery, Chennai', 'Chennai', 'Apartment', 92000, 3, 2, 1450, 'For Rent', 'A spacious, furnished home with an easy, open layout and thoughtful conveniences for everyday living.', 12.9750, 80.2212],
  ['The Aranya', 'Mehrauli, Delhi', 'Delhi', 'Villa', 84500000, 5, 5, 4200, 'For Sale', 'A private estate with mature trees, quiet garden rooms and finely considered architecture throughout.', 28.5158, 77.1810],
  ['Little Banyan', 'Sarjapur Road, Bengaluru', 'Bengaluru', 'Plot', 9800000, 0, 0, 2400, 'For Sale', 'A ready-to-build garden plot in a well-connected community, with clear documentation and mature avenue trees.', 12.9104, 77.6874],
  ['Palm House', 'Panvel, Mumbai', 'Mumbai', 'Apartment', 54000, 2, 2, 1050, 'For Rent', 'A light, breezy apartment with an open balcony, modern appliances and a peaceful outlook.', 18.9894, 73.1100],
  ['Saffron Villa', 'Kharadi, Pune', 'Pune', 'Villa', 41500000, 4, 4, 3300, 'For Sale', 'A well-crafted villa with a private plunge pool, a bright double-height living room and room to grow.', 18.5515, 73.9467],
];

const amenityPool = ['Parking', 'Swimming Pool', 'Gym', 'Security', 'Balcony', 'Garden', 'Power Backup', 'Lift'];

export const properties = homes.map((home, index) => ({
  id: String(index + 1), title: home[0], address: home[1], city: home[2], type: home[3], price: home[4],
  bedrooms: home[5], bathrooms: home[6], area: home[7], listing: home[8], description: home[9],
  latitude: home[10], longitude: home[11], image: `https://images.unsplash.com/${photos[index % photos.length]}?auto=format&fit=crop&w=1000&q=85`,
  images: [0, 1, 2, 3].map((offset) => `https://images.unsplash.com/${photos[(index + offset) % photos.length]}?auto=format&fit=crop&w=1200&q=85`),
  amenities: amenityPool.filter((_, amenityIndex) => (index + amenityIndex) % (index % 3 === 0 ? 2 : 3) !== 0),
  furnished: index % 3 === 0 ? 'Furnished' : index % 3 === 1 ? 'Semi-furnished' : 'Unfurnished',
  age: `${index % 8 + 1} ${index % 8 === 0 ? 'year' : 'years'}`, parking: index % 2 === 0 ? 2 : 1, views: 90 + index * 37,
  date: `2026-09-${String(28 - index % 22).padStart(2, '0')}`,
  agentId: String(index % 4 + 1), featured: index % 5 === 0,
}));

export const agents = [
  { id: '1', name: 'Aanya Krishnan', location: 'Chennai', experience: 9, listings: 28, rating: 4.9, phone: '+91 98400 21456', email: 'aanya@nestora.in', photo: 'photo-1580489944761-15a19d654956', bio: 'Aanya pairs an eye for considered homes with a deeply personal approach to helping families settle into Chennai. She specialises in coastal neighbourhoods and heritage properties.' },
  { id: '2', name: 'Rohan Mehta', location: 'Bengaluru', experience: 7, listings: 34, rating: 4.8, phone: '+91 98450 32761', email: 'rohan@nestora.in', photo: 'photo-1500648767791-00dcc994a43e', bio: 'Rohan knows Bengaluru block by block. From a first apartment to a long-term investment, he makes the search feel clear, informed and genuinely enjoyable.' },
  { id: '3', name: 'Mira Iyer', location: 'Mumbai', experience: 12, listings: 41, rating: 5.0, phone: '+91 98200 78124', email: 'mira@nestora.in', photo: 'photo-1534528741775-53994a69daeb', bio: 'Mira brings over a decade of Mumbai market knowledge and a calm, thoughtful style to every move. Her clients value her candid advice and detail-first service.' },
  { id: '4', name: 'Kabir Sethi', location: 'Pune', experience: 6, listings: 19, rating: 4.9, phone: '+91 98220 54318', email: 'kabir@nestora.in', photo: 'photo-1506794778202-cad84cf45f1d', bio: 'Kabir helps people find room to put down roots in Pune, with a focus on green neighbourhoods, independent homes and thoughtful new developments.' },
];

export const imageUrl = (id, size = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${size}&q=85`;

export const getUserListings = () => {
  try {
    return JSON.parse(localStorage.getItem('nestora:listings') || '[]');
  } catch {
    return [];
  }
};

export const formatPrice = (price, listing = 'For Sale') => listing === 'For Rent'
  ? `₹${(price / 1000).toFixed(0)}k / mo`
  : price >= 10000000 ? `₹${(price / 10000000).toFixed(2).replace(/\.00$/, '')} Cr` : `₹${(price / 100000).toFixed(0)} L`;