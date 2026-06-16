import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import TechCard from "../components/TechCard";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const learningQueue = useSelector((state) => state.learning);

  useEffect(() => {
    const controller = new AbortController();

    async function getFeaturedTech() {
      try {
        const response = await api.get("/technologies", {
          signal: controller.signal,
        });

        const sorted = response.data.sort((a, b) => b.rating - a.rating);
        const top3 = sorted.slice(0, 3);

        setFeatured(top3);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    }

    getFeaturedTech();
    return () => controller.abort();
  }, []);

  // Dummy delete function so TechCard doesn't break
  async function deleteTechnology(id) {
    // Usually you don't delete from the featured list on home page, 
    // but passing an empty function works.
    console.log("Delete from home page clicked for", id);
  }

  if (loading) {
    return <h2>Loading featured technologies...</h2>;
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
            user={user}
            isInQueue={learningQueue.some((tech) => tech.id === technology.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
