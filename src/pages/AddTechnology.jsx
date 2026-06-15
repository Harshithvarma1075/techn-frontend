import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddTechnology() {

  const navigate = useNavigate();

  const [formData,setFormData] =
  useState({
    name:"",
    category:"",
    image:"",
    description:""
  });

  function handleChange(e){

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  }

  async function handleSubmit(e){

    e.preventDefault();

    await api.post(
      "/technologies",
      formData
    );

    navigate("/technologies");

  }

  return(

    <div className="form-container">

      <form onSubmit={handleSubmit}>

        <input
        type="text"
        name="name"
        placeholder="Technology Name"
        onChange={handleChange}
        />

        <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        />

        <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        />

        <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        />

        <button className="submit-btn">
          Add Technology
        </button>

      </form>

    </div>

  );
}

export default AddTechnology;