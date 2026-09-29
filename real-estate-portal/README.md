# Nestora

Nestora is a responsive real-estate discovery portal for finding, saving, comparing, and listing homes across six Indian cities.

## Run locally

```sh
npm install
npm run dev
```

The development server opens at [http://localhost:3000](http://localhost:3000).

## Project commands

- `npm run dev` starts the local development server.
- `npm test -- --watchAll=false` runs the test suite once.
- `npm run build` creates an optimized production build in `build/`.

## What's included

- Searchable listings, responsive filters, sorting, map exploration, details, agents, and property comparison.
- Favorites, recent views, mock authentication, inquiries, and seller listings persisted in browser storage.
- A six-step property submission flow and responsive dashboard screens.

## Demo boundaries

This is a frontend-only project. Authentication, inquiries, and listing publication use local browser state rather than a backend. Property photos use Unsplash URLs. The interactive Leaflet map loads its library and OpenStreetMap tiles externally, so map tiles require network access.

The workspace started as a Create React App project. The registry connection reset while checking new packages, so the existing build toolchain is retained and `npm run dev` maps to its development server.