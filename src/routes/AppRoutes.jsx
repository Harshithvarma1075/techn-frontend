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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/technologies" element={<Technologies />} />

      <Route path="/technologies/:id" element={<TechDetails />} />
      <Route path="/add-technology" element={<AddTechnology />} />
      <Route path="/edit-technology/:id" element={<EditTechnology />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/learning-queue" element={<LearningQueue />} />
    </Routes>
  );
}

export default AppRoutes;
