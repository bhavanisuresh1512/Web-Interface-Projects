import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "./WeatherDashboard.css";

// --------------------------------------------------
// LEAFLET ICON FIX
// --------------------------------------------------

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// --------------------------------------------------
// DEFAULT CITIES
// --------------------------------------------------

const cities = [
  {
    name: "Chennai",
    country: "India",
    lat: 13.0827,
    lon: 80.2707,
  },
  {
    name: "Bengaluru",
    country: "India",
    lat: 12.9716,
    lon: 77.5946,
  },
  {
    name: "Mumbai",
    country: "India",
    lat: 19.076,
    lon: 72.8777,
  },
  {
    name: "Madurai",
    country: "India",
    lat: 9.9252,
    lon: 78.1198,
  },
  {
    name: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
  },
  {
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
  },
  {
    name: "New York",
    country: "USA",
    lat: 40.7128,
    lon: -74.006,
  },
  {
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lon: 139.6503,
  },
  {
    name: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lon: 55.2708,
  },
  {
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lon: 151.2093,
  },
  {
    name: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
  },
  {
    name: "Toronto",
    country: "Canada",
    lat: 43.6532,
    lon: -79.3832,
  },
];

// --------------------------------------------------
// WEATHER TEXT
// --------------------------------------------------

const weatherText = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Light Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Light Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Rain Showers",
  81: "Rain Showers",
  82: "Heavy Rain Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

const weatherEmoji = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "🌨️",
  73: "❄️",
  75: "❄️",
  80: "🌦️",
  81: "🌧️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

// --------------------------------------------------
// MOVE MAP WHEN CITY CHANGES
// --------------------------------------------------

function MapController({ city }) {
  const map = useMap();

  useEffect(() => {
    if (!city) return;

    map.flyTo(
      [city.lat, city.lon],
      8,
      {
        duration: 1.2,
      }
    );
  }, [city, map]);

  return null;
}

// --------------------------------------------------
// CLICK ANYWHERE ON MAP
// --------------------------------------------------

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: async (event) => {
      const { lat, lng } = event.latlng;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
        );

        const data = await response.json();

        const address = data.address || {};

        const cityName =
          address.city ||
          address.town ||
          address.village ||
          address.municipality ||
          address.state ||
          "Selected Location";

        const country =
          address.country || "";

        onLocationSelect({
          name: cityName,
          country,
          lat,
          lon: lng,
        });
      } catch (error) {
        console.error("Reverse geocoding failed:", error);

        onLocationSelect({
          name: "Selected Location",
          country: "",
          lat,
          lon: lng,
        });
      }
    },
  });

  return null;
}

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

function WeatherDashboard() {
  const [search, setSearch] = useState("");

  const [selectedCity, setSelectedCity] =
    useState(cities[0]);

  const [weather, setWeather] =
    useState(null);

  const [forecast, setForecast] =
    useState([]);

  const [cityImage, setCityImage] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // --------------------------------------------------
  // SEARCH SUGGESTIONS
  // --------------------------------------------------

  useEffect(() => {
    if (search.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            search
          )}&count=6&language=en&format=json`
        );

        const data = await response.json();

        setSuggestions(data.results || []);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // --------------------------------------------------
  // SELECT SEARCH RESULT
  // --------------------------------------------------

  const selectSearchResult = (result) => {
    setSelectedCity({
      name: result.name,
      country: result.country || "",
      lat: result.latitude,
      lon: result.longitude,
    });

    setSearch("");
    setSuggestions([]);
  };

  // --------------------------------------------------
  // SEARCH SUBMIT
  // --------------------------------------------------

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          search
        )}&count=1&language=en&format=json`
      );

      const data = await response.json();

      if (data.results?.length) {
        selectSearchResult(data.results[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // FETCH WEATHER
  // --------------------------------------------------

  useEffect(() => {
    if (!selectedCity) return;

    const getWeather = async () => {
      try {
        setLoading(true);

        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${selectedCity.lat}` +
          `&longitude=${selectedCity.lon}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
          `&timezone=auto` +
          `&forecast_days=5`;

        const response = await fetch(url);

        const data = await response.json();

        setWeather(data.current);

        const days = data.daily.time.map(
          (date, index) => ({
            date,
            code: data.daily.weather_code[index],
            max:
              data.daily.temperature_2m_max[index],
            min:
              data.daily.temperature_2m_min[index],
          })
        );

        setForecast(days);
      } catch (error) {
        console.error(
          "Weather fetching failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [selectedCity]);

 // --------------------------------------------------
// FETCH CITY IMAGE
// --------------------------------------------------

useEffect(() => {
  if (!selectedCity?.name) return;

  const getCityImage = async () => {
    const fallback =
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=85";

    try {
      setCityImage("");

      const queries = [
        `${selectedCity.name} ${selectedCity.country}`,
        `${selectedCity.name} city`,
        `${selectedCity.name} landmark`,
        selectedCity.name,
      ];

      for (const query of queries) {
        const url =
          `https://commons.wikimedia.org/w/api.php` +
          `?action=query` +
          `&generator=search` +
          `&gsrsearch=${encodeURIComponent(query)}` +
          `&gsrnamespace=6` +
          `&gsrlimit=20` +
          `&prop=imageinfo` +
          `&iiprop=url|mime` +
          `&iiurlwidth=1400` +
          `&format=json` +
          `&origin=*`;

        const response = await fetch(url);

        if (!response.ok) continue;

        const data = await response.json();

        const pages = Object.values(
          data?.query?.pages || {}
        );

        const images = pages.filter((page) => {
          const info = page.imageinfo?.[0];

          return (
            info &&
            info.mime?.startsWith("image/") &&
            (info.thumburl || info.url)
          );
        });

        if (images.length > 0) {
          const selected =
            images[
              Math.floor(Math.random() * images.length)
            ];

          const imageUrl =
            selected.imageinfo[0].thumburl ||
            selected.imageinfo[0].url;

          // THIS WAS MISSING
          setCityImage(imageUrl);

          return;
        }
      }

      // If no Wikimedia image is found
      setCityImage(fallback);

    } catch (error) {
      console.error("Could not fetch city image:", error);

      setCityImage(fallback);
    }
  };

  getCityImage();
}, [selectedCity]);

  // --------------------------------------------------
  // SELECT CITY FROM DEFAULT MARKERS
  // --------------------------------------------------

  const selectCity = (city) => {
    setSelectedCity(city);
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  const condition = weather
    ? weatherText[weather.weather_code] ||
      "Unknown"
    : "Loading...";

  return (
    <div className="weather-dashboard">

      {/* =========================================
          HEADER
      ========================================= */}

      <header className="top-header">

        <div className="brand">

          <div className="brand-icon">
            ☁️
          </div>

          <div>
            <h1>SkyLens</h1>

            <p>
              Explore weather, everywhere.
            </p>
          </div>

        </div>

        {/* SEARCH */}

        <form
          className="search-wrapper"
          onSubmit={handleSearch}
        >

          <span className="search-icon">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            placeholder="Search a city, country or landmark..."
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <button type="submit">
            Search
          </button>

          {/* SEARCH RESULTS */}

          {suggestions.length > 0 && (

            <div className="suggestions">

              {suggestions.map((item) => (

                <button
                  type="button"
                  className="suggestion-item"
                  key={`${item.id}-${item.latitude}`}
                  onClick={() =>
                    selectSearchResult(item)
                  }
                >

                  <span className="suggestion-pin">
                    ●
                  </span>

                  <div>

                    <strong>
                      {item.name}
                    </strong>

                    <small>
                      {item.admin1
                        ? `${item.admin1}, `
                        : ""}
                      {item.country}
                    </small>

                  </div>

                </button>

              ))}

            </div>

          )}

        </form>

        <div className="header-actions">

          <button className="icon-button">
            ☀️
          </button>

          <button className="profile-button">
            ○
          </button>

        </div>

      </header>

      {/* =========================================
          MAIN
      ========================================= */}

      <main className="dashboard-content">

        {/* =========================================
            MAP
        ========================================= */}

        <section className="map-section">

          <div className="map-header">

            <div>

              <span className="eyebrow">
                WORLD WEATHER
              </span>

              <h2>
                Explore the world
              </h2>

            </div>

            <div className="map-info">
              📍 Click anywhere to explore
            </div>

          </div>

          <div className="map-container">

            <MapContainer
              center={[20, 0]}
              zoom={2}
              minZoom={2}
              maxZoom={12}
              scrollWheelZoom={true}
              className="world-map"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController
                city={selectedCity}
              />

              <MapClickHandler
                onLocationSelect={setSelectedCity}
              />

              {/* DEFAULT CITY MARKERS */}

              {cities.map((city) => (

                <Marker
                  key={city.name}
                  position={[
                    city.lat,
                    city.lon,
                  ]}
                  eventHandlers={{
                    click: () =>
                      selectCity(city),
                  }}
                >

                  <Popup>

                    <strong>
                      {city.name}
                    </strong>

                    <br />

                    {city.country}

                  </Popup>

                </Marker>

              ))}

              {/* SELECTED CITY */}

              <Marker
                position={[
                  selectedCity.lat,
                  selectedCity.lon,
                ]}
              >

                <Popup>

                  <strong>
                    {selectedCity.name}
                  </strong>

                  <br />

                  {selectedCity.country}

                </Popup>

              </Marker>

            </MapContainer>

            <div className="map-overlay">

              <span>
                🌍
              </span>

              <div>

                <strong>
                  Live weather map
                </strong>

                <small>
                  Click anywhere on Earth
                </small>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            WEATHER DETAILS
        ========================================= */}

        <section className="weather-details">

          {/* CITY IMAGE */}

          {cityImage ? (

            <div
              className="city-image"
              style={{
                backgroundImage:
                  `linear-gradient(
                    180deg,
                    rgba(39,44,68,0.05),
                    rgba(39,44,68,0.95)
                  ), url("${cityImage}")`,
              }}
            >

              <div className="image-content">

                <span>
                  📍
                </span>

                <div>

                  <h2>
                    {selectedCity.name}
                  </h2>

                  <p>
                    {selectedCity.country}
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <div className="city-image image-placeholder">

              <span>
                🌍
              </span>

              <h2>
                {selectedCity.name}
              </h2>

              <p>
                {selectedCity.country}
              </p>

            </div>

          )}

          {/* WEATHER */}

          <div className="weather-main">

            <div className="weather-top">

              <div>

                <span className="eyebrow">
                  CURRENT WEATHER
                </span>

                <div className="temperature">

                  {weather
                    ? Math.round(
                        weather.temperature_2m
                      )
                    : "--"}

                  <sup>
                    °C
                  </sup>

                </div>

                <h3>

                  {weather
                    ? weatherEmoji[
                        weather.weather_code
                      ]
                    : "⏳"}

                  {" "}

                  {condition}

                </h3>

              </div>

              <div className="weather-big-icon">

                {weather
                  ? weatherEmoji[
                      weather.weather_code
                    ]
                  : "⏳"}

              </div>

            </div>

            <div className="weather-stats">

              <div>
                <span>
                  Feels like
                </span>

                <strong>
                  {weather
                    ? Math.round(
                        weather.apparent_temperature
                      )
                    : "--"}
                  °C
                </strong>
              </div>

              <div>
                <span>
                  Humidity
                </span>

                <strong>
                  {weather
                    ? weather.relative_humidity_2m
                    : "--"}
                  %
                </strong>
              </div>

              <div>
                <span>
                  Wind
                </span>

                <strong>
                  {weather
                    ? Math.round(
                        weather.wind_speed_10m
                      )
                    : "--"}{" "}
                  km/h
                </strong>
              </div>

              <div>
                <span>
                  Rain
                </span>

                <strong>
                  {weather
                    ? weather.precipitation
                    : "--"}{" "}
                  mm
                </strong>
              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            FORECAST
        ========================================= */}

        <section className="forecast-section">

          <div className="section-heading">

            <div>

              <span className="eyebrow">
                NEXT FEW DAYS
              </span>

              <h2>
                5-Day Forecast
              </h2>

            </div>

            <span className="forecast-location">
              {selectedCity.name}
            </span>

          </div>

          <div className="forecast-grid">

            {forecast.map(
              (day, index) => (

                <div
                  className={`forecast-card ${
                    index === 0
                      ? "active-day"
                      : ""
                  }`}
                  key={day.date}
                >

                  <span>

                    {index === 0
                      ? "Today"
                      : new Date(
                          day.date
                        ).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                          }
                        )}

                  </span>

                  <small>
                    {day.date}
                  </small>

                  <div className="forecast-icon">

                    {weatherEmoji[
                      day.code
                    ] || "🌤️"}

                  </div>

                  <strong>
                    {Math.round(day.max)}°
                  </strong>

                  <small>
                    {Math.round(day.min)}°
                  </small>

                </div>

              )
            )}

          </div>

        </section>

        {/* =========================================
            UNIQUE INSIGHT
        ========================================= */}

        <section className="weather-story">

          <div className="story-icon">
            ✨
          </div>

          <div>

            <span className="eyebrow">
              SKYLENS INSIGHT
            </span>

            <h2>
              {weather?.is_day
                ? `A ${condition.toLowerCase()} day in ${selectedCity.name}`
                : `The night sky over ${selectedCity.name}`}
            </h2>

            <p>
              Explore the atmosphere of this
              location through live weather,
              city imagery and interactive
              maps.
            </p>

          </div>

          <div className="coordinates">

            <span>
              COORDINATES
            </span>

            <strong>
              {selectedCity.lat.toFixed(2)}°,
              {" "}
              {selectedCity.lon.toFixed(2)}°
            </strong>

          </div>

        </section>

      </main>

      {loading && (
        <div className="loading">
          Updating weather...
        </div>
      )}

    </div>
  );
}

export default WeatherDashboard;