import { useDispatch, useSelector } from "react-redux";
import { removeFromQueue, updateStatus } from "../features/learningSlice";

function LearningQueue() {
  const dispatch = useDispatch();
  const learningQueue = useSelector((state) => state.learning);

  const statuses = [
    { id: "to_learn", title: "To Learn" },
    { id: "learning", title: "Learning" },
    { id: "mastered", title: "Mastered" },
  ];

  const handleStatusChange = (techId, newStatus) => {
    dispatch(updateStatus({ id: techId, status: newStatus }));
  };

  return (
    <div className="learning-queue-container">
      <h1 className="page-title">Learning Queue Kanban</h1>

      <div className="kanban-board">
        {statuses.map((statusObj) => {
          const itemsInColumn = learningQueue.filter((tech) => tech.status === statusObj.id);

          return (
            <div key={statusObj.id} className="kanban-column">
              <h2>
                {statusObj.title} ({itemsInColumn.length})
              </h2>

              <div className="kanban-items">
                {itemsInColumn.map((tech) => (
                  <div key={tech.id} className="kanban-card">
                    <img src={tech.image} alt={tech.name} />
                    <h3>{tech.name}</h3>
                    <p>{tech.category}</p>

                    <div className="kanban-actions">
                      <select
                        value={tech.status}
                        onChange={(e) => handleStatusChange(tech.id, e.target.value)}
                      >
                        {statuses.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>

                      <button onClick={() => dispatch(removeFromQueue(tech.id))}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LearningQueue;
