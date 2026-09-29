import "./Clubcard.css";
import { FaUsers, FaArrowRight } from "react-icons/fa";

function ClubCard({
  image,
  clubName,
  category,
  members,
  description,
  onView,
}) {
  return (
    <div className="club-card">

      <img
        src={image}
        alt={clubName}
        className="club-image"
      />

      <div className="club-content">

        <span className="club-category">
          {category}
        </span>

        <h3>{clubName}</h3>

        <p className="club-description">
          {description}
        </p>

        <p className="members">
          <FaUsers className="club-icon" />
          {members} Members
        </p>

        <button
          className="club-btn"
          onClick={onView}
        >
          View Club <FaArrowRight />
        </button>

      </div>

    </div>
  );
}

export default ClubCard;