import { useEffect, useState } from "react";
import api from "../services/api";
import TechCard from "../components/TechCard";

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function getFeaturedTech() {
      try {
        const response = await api.get("/technologies");

        // Sort by rating descending and take top 3
        const sorted = response.data.sort((a, b) => b.rating - a.rating);
        const top3 = sorted.slice(0, 3);

        setFeatured(top3);
      } catch (error) {
        console.log(error);
      }
    }

    getFeaturedTech();
  }, []);

  // Dummy delete function so TechCard doesn't break
  async function deleteTechnology(id) {
    // Usually you don't delete from the featured list on home page, 
    // but passing an empty function works.
    console.log("Delete from home page clicked for", id);
  }

  return (
    <div>
      <h1>SkillPort</h1>

      <p>
        Explore trending technologies shaping
        the future of the world.
      </p>

      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Featured Technologies</h2>
      <div className="technologies">
        {featured.map((technology) => (
          <TechCard 
            key={technology.id} 
            technology={technology} 
            onDelete={deleteTechnology} 
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
