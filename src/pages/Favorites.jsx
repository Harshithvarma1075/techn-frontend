import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, clearFavorites } from "../features/favouriteSlice";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  return (
    <div className="favorites-container">
      <h1 className="page-title">Favorite Technologies</h1>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No Favorite Technologies</h2>
          <p>Add technologies from the Technologies page.</p>
        </div>
      ) : (
        <>
          <button
            className="clear-btn"
            onClick={() => dispatch(clearFavorites())}
          >
            Clear All Favorites
          </button>

          <div className="favorites-grid">
            {favorites.map(technology => (
              <div key={technology.id} className="favorite-card">
                <img src={technology.image} alt={technology.name} />
                <div className="favorite-content">
                  <h2>{technology.name}</h2>
                  <p>Category: {technology.category}</p>
                  <p>Rating: {technology.rating}</p>
                  <p>Level: {technology.level}</p>

                  <button onClick={() => dispatch(removeFavorite(technology.id))}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
