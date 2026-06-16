import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const favorites = useSelector(state => state.favorites);
  const learningQueue = useSelector(state => state.learning);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav>
      <Link to="/" className="brand">SkillPort</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/technologies">Technologies</Link>

        {user && (
          <>
            <Link to="/favorites">Favorites ({favorites.length})</Link>
            <Link to="/learning-queue">Learning Queue ({learningQueue.length})</Link>
          </>
        )}

        {!user && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {user && (
          <Link to="/logout">Logout</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
