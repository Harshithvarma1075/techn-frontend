import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";
import TechCard from "../components/TechCard";

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

  const learningQueueIds = useSelector(
    (state) => state.learning.map((tech) => tech.id)
  );

  const queueIdSet = useMemo(
    () => new Set(learningQueueIds),
    [learningQueueIds]
  );

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

  const deleteTechnology = useCallback(() => {}, []);

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
            isInQueue={queueIdSet.has(technology.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
