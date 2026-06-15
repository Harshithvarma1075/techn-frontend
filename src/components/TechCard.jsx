import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/favouriteSlice";
import { addToQueue } from "../features/learningSlice";

function TechCard({ technology, onDelete }) {
  const dispatch = useDispatch();
  const learningQueue = useSelector((state) => state.learning);
  const isInQueue = learningQueue.some((tech) => tech.id === technology.id);

  const handleFavorite = () => {
    dispatch(addFavorite(technology));
  };

  const handleAddToQueue = () => {
    dispatch(addToQueue(technology));
  };

  return (
    <div className="card">
      <img src={technology.image} alt={technology.name} />

      <h3>{technology.name}</h3>

      <p>{technology.category}</p>
      <p>{technology.level}</p>
      <p>Rating: {technology.rating}</p>

      <div className="card-actions">
        <Link className="view-btn" to={`/technologies/${technology.id}`}>
          View
        </Link>

        <Link className="edit-btn" to={`/edit-technology/${technology.id}`}>
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

        <button className="delete-btn" onClick={() => onDelete(technology.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TechCard;
