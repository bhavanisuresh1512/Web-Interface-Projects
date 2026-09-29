import "./Badge.css";

function BadgeCard({
  icon,
  badgeName,
  description,
  status,
}) {
  return (
    <div className="badge-card">

      <div className="badge-icon">
        {icon}
      </div>

      <h3>{badgeName}</h3>

      <p>{description}</p>

      <span
        className={
          status === "Unlocked"
            ? "badge-status unlocked"
            : "badge-status locked"
        }
      >
        {status}
      </span>

    </div>
  );
}

export default BadgeCard;