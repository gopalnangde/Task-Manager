import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    const res = await axios.get(`${API}/api/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(`${API}/api/tasks`, {
      title
    });

    setTitle("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
    getTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="inputBox">
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTask}>
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <div className="task" key={task._id}>
          <span>{task.title}</span>

          <button
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;