 import { useState } from "react";

function Home() {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    console.log("Task:", task);

    // Abhi sirf input clear karte hain
    setTask("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Todo Dashboard 🚀
      </h1>

      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-3 rounded w-80 mr-3"
      />

      <button
        onClick={handleAddTask}
        className="bg-blue-600 text-white px-5 py-3 rounded"
      >
        Add Task
      </button>
    </div>
  );
}

export default Home;