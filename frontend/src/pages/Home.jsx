import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2, CheckCircle } from "lucide-react";

function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch all tasks from MongoDB
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Run when page loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    try {
      await axios.post("http://localhost:5000/todos", {
        title: task,
      });

      alert("Task Added Successfully!");

      setTask("");

      // Refresh task list
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
  localStorage.removeItem("token"); // Login token remove karega
  navigate("/"); // Login page par le jayega
};

  // Complete Task (Frontend only for now)
  const handleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item._id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Navbar */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-5">
          <h1 className="text-3xl font-bold">Todo Dashboard</h1>

 <button
  onClick={handleLogout}
  className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
> Logout
</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10">
        {/* Add Task */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-5">Add New Task</h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="flex-1 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-5">
            My Tasks ({tasks.length})
          </h2>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
              No tasks added yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {tasks.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-5"
                >
                  <h3
                    className={`text-xl font-semibold ${
                      item.completed
                        ? "line-through text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    ID: {item._id}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleComplete(item._id)}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      <CheckCircle size={18} />
                      {item.completed ? "Completed" : "Complete"}
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;