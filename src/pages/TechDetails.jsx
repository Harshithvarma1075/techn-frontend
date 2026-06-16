import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

function TechDetails() {
  const { id } = useParams();

  const [technology, setTechnology] =
    useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getTechnology() {
      try {
        const response =
          await api.get(`/technologies/${id}`, {
            signal: controller.signal,
          });

        setTechnology(response.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      }
    }

    getTechnology();
    return () => controller.abort();
  }, [id]);

  if (!technology) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">
      <img
        src={technology.image}
        alt={technology.name}
        loading="lazy"
      />

      <h1>{technology.name}</h1>

      <p>{technology.description}</p>

      <h3>Category</h3>
      <p>{technology.category}</p>

      <h3>Level</h3>
      <p>{technology.level}</p>

      <h3>Invented By</h3>
      <p>{technology.inventedBy}</p>

      <h3>Introduced</h3>
      <p>{technology.introduced}</p>

      <h3>Industry Demand</h3>
      <p>{technology.demand}</p>

      <h3>Salary Range</h3>
      <p>{technology.salaryRange}</p>

      <h3>Applications</h3>
      <p>{technology.applications}</p>

      <h3>Rating</h3>
      <p>{technology.rating}</p>

      <h3>Top Companies</h3>

      <ul>
        {technology.companies.map(
          (company, index) => (
            <li key={index}>
              {company}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default TechDetails;
