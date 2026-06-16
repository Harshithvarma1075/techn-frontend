import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import TechCard from "../components/TechCard";
import { Link } from "react-router-dom";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function Technologies() {
  const [technologies, setTechnologies] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const controller = new AbortController();

    async function getTechnologies() {
      try {
        const response = await api.get("/technologies", {
          signal: controller.signal,
        });

        setTechnologies(response.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      } finally {
        setLoading(false);
      }
    }

    getTechnologies();
    return () => controller.abort();
  }, []);

  async function deleteTechnology(id){

  await api.delete(
    `/technologies/${id}`
  );

  setTechnologies(

    technologies.filter(
      technology =>
      technology.id !== id
    )

  );

}

  const filteredTechnologies = useMemo(() => {
    return technologies.filter(technology => {
      const searchMatch = technology.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const categoryMatch = category === "All" || technology.category === category;
      const levelMatch = level === "All" || technology.level === level;
      return searchMatch && categoryMatch && levelMatch;
    });
  }, [technologies, debouncedSearch, category, level]);

  const finalTechnologies = useMemo(() => {
    const sorted = [...filteredTechnologies];
    if (sort === "high") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    if (sort === "low") {
      sorted.sort((a, b) => a.rating - b.rating);
    }
    return sorted;
  }, [filteredTechnologies, sort]);

  return (
    <>
      <h1>Popular Technologies</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Technology"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Computer Science</option>
          <option>Artificial Intelligence</option>
          <option>Distributed Systems</option>
          <option>Analytics</option>
          <option>Embedded Systems</option>
          <option>Software Engineering</option>
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>All</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort Rating</option>
          <option value="high">High To Low</option>
          <option value="low">Low To High</option>
        </select>
      </div>

      <Link to={user ? "/add-technology" : "/login"} className="add-btn">
        Add Technology
      </Link>

      <div className="technologies">
        {loading ? (
          <h2>Loading technologies...</h2>
        ) : (
          finalTechnologies.map((technology) => (
            <TechCard key={technology.id} technology={technology} onDelete={deleteTechnology} />
          ))
        )}
      </div>
    </>
  );
}

export default Technologies;
