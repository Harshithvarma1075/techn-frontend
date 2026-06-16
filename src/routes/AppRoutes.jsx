import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Technologies from "../pages/Technologies";
import TechDetails from "../pages/TechDetails";
import AddTechnology from "../pages/AddTechnology";
import EditTechnology from "../pages/EditTechnology";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";
import LearningQueue from "../pages/LearningQueue";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/technologies" element={<Technologies />} />

      <Route path="/technologies/:id" element={<TechDetails />} />
      <Route
        path="/add-technology"
        element={
          <ProtectedRoute>
            <AddTechnology />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-technology/:id"
        element={
          <ProtectedRoute>
            <EditTechnology />
          </ProtectedRoute>
        }
      />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-queue"
        element={
          <ProtectedRoute>
            <LearningQueue />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
