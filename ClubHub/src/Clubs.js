import "./Clubs.css";
import { useState } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import Clubcard from "./Clubcard";

function Clubs() {

  const clubs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      name: "Coding Club",
      category: "Technical",
      members: 180,
      description: "Hackathons, coding competitions and workshops."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
      name: "Dance Club",
      category: "Cultural",
      members: 120,
      description: "Western, Classical and Folk Dance."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600",
      name: "Music Club",
      category: "Cultural",
      members: 95,
      description: "Singing and Instrumental Performances."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600",
      name: "Sports Club",
      category: "Sports",
      members: 220,
      description: "Cricket, Football, Volleyball and Athletics."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
      name: "NSS",
      category: "Social",
      members: 150,
      description: "Community service and social activities."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=600",
      name: "Photography Club",
      category: "Creative",
      members: 80,
      description: "Photography workshops and photo walks."
    }
  ];

  const [search, setSearch] = useState("");

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="clubs-hero">
        <h1>Explore Campus Clubs</h1>
        <p>Find the perfect club to match your passion and talent.</p>
      </section>

      <Searchbar search={search} setSearch={setSearch} />

      <div className="clubs-grid">

        {filteredClubs.map((club) => (

          <Clubcard
            key={club.id}
            image={club.image}
            clubName={club.name}
            category={club.category}
            members={club.members}
            description={club.description}
          />

        ))}

      </div>

      <Footer />
    </>
  );
}

export default Clubs;