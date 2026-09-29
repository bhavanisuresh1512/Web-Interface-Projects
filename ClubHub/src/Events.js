import "./Events.css";
import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import Eventcard from "./Eventcard";

function Events() {

  const events = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600",
      title: "Hackathon 2026",
      date: "10 Aug 2026",
      venue: "Seminar Hall",
      seats: "120",
      category: "Technical"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600",
      title: "Music Fest",
      date: "18 Aug 2026",
      venue: "Open Auditorium",
      seats: "250",
      category: "Cultural"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
      title: "Sports Meet",
      date: "24 Aug 2026",
      venue: "College Ground",
      seats: "300",
      category: "Sports"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      title: "Tree Plantation",
      date: "30 Aug 2026",
      venue: "Campus Garden",
      seats: "150",
      category: "NSS"
    }
  ];

  const [search, setSearch] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="events-hero">
        <h1>Upcoming Events</h1>
        <p>Register and participate in exciting campus activities.</p>
      </section>

      <Searchbar search={search} setSearch={setSearch} />

      <div className="events-grid">

        {filteredEvents.map((event) => (

          <Eventcard
            key={event.id}
            image={event.image}
            title={event.title}
            date={event.date}
            venue={event.venue}
            seats={event.seats}
            category={event.category}
          />

        ))}

      </div>

      <Footer />
    </>
  );
}

export default Events;