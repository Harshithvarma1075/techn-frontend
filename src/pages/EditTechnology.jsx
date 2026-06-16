import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../services/api";

function EditTechnology(){

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData,setFormData] =
  useState({
    name:"",
    category:"",
    image:"",
    description:""
  });

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const controller = new AbortController();

    async function getTechnology(){
      try {
        const response =
        await api.get(
          `/technologies/${id}`,
          { signal: controller.signal }
        );

        setFormData(response.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    }

    getTechnology();
    return () => controller.abort();

  },[id]);

  function handleChange(e){

    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  }

  async function handleSubmit(e){

    e.preventDefault();

    await api.put(
      `/technologies/${id}`,
      formData
    );

    navigate("/technologies");

  }

  if (loading) {
    return <h2>Loading technology...</h2>;
  }

  return(

    <div className="form-container">

      <form onSubmit={handleSubmit}>

        <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        />

        <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        />

        <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        />

        <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        />

        <button className="submit-btn">
          Update Technology
        </button>

      </form>

    </div>

  );
}

export default EditTechnology;
