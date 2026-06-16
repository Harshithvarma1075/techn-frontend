import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite } from "../features/favouriteSlice";
import { addToQueue } from "../features/learningSlice";

const TechCard = memo(function TechCard({ technology, onDelete, user, isInQueue }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requireLogin = () => {
    if (!user) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleFavorite = () => {
    if (!requireLogin()) return;

    dispatch(addFavorite(technology));
  };

  const handleAddToQueue = () => {
    if (!requireLogin()) return;

    dispatch(addToQueue(technology));
  };

  const handleDelete = () => {
    if (!requireLogin()) return;

    onDelete(technology.id);
  };

  return (
    <div className="card">
      <img src={technology.image} alt={technology.name} loading="lazy" />

      <h3>{technology.name}</h3>

      <p>{technology.category}</p>
      <p>{technology.level}</p>
      <p>Rating: {technology.rating}</p>

      <div className="card-actions">
        <Link className="view-btn" to={`/technologies/${technology.id}`}>
          View
        </Link>

        <Link
          className="edit-btn"
          to={user ? `/edit-technology/${technology.id}` : "/login"}
        >
          Edit
        </Link>

        <button className="favorite-btn" onClick={handleFavorite}>
          Add To Favorites
        </button>

        <button
          className="queue-btn"
          onClick={handleAddToQueue}
          disabled={isInQueue}
        >
          {isInQueue ? "In Queue" : "Add To Learn"}
        </button>

        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
});

export default TechCard;
