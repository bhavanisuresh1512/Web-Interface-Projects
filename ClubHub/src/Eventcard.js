import "./Eventcard.css";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

function EventCard({
  image,
  title,
  date,
  venue,
  seats,
  category,
  onRegister,
}) {
  return (
    <div className="event-card">

      <img
        src={image}
        alt={title}
        className="event-image"
      />

      <div className="event-content">

        <span className="event-category">
          {category}
        </span>

        <h3>{title}</h3>

        <p>
          <FaCalendarAlt className="icon" />
          {date}
        </p>

        <p>
          <FaMapMarkerAlt className="icon" />
          {venue}
        </p>

        <p>
          <FaUsers className="icon" />
          {seats} Seats Available
        </p>

        <button
          className="register-btn"
          onClick={onRegister}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default EventCard;