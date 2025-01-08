import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./CSS/TaskManager.css";

const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  
  const apiUrl = "http://localhost:3000/api";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please enter both a title and a description for the task.");
      return;
    }
    const newTask = { title, description };
    try {
      //making a post request to the backend
      const response = await fetch(`${apiUrl}/addTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      console.log("1111");
      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("Failed adding task", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${apiUrl}/${taskId}`,{method: "DELETE"});
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };
  
  const startEditing = (taskId, crntTitle, crntDecr)=>{
    setEditingTaskId(taskId);
    setEditingTitle(crntTitle);
    setEditingDescription(crntDecr);
  };
  
const saveTask = async(taskId) => {
  if (!editingTitle.trim() || !editingDescription.trim()) {
    alert("Please provide a valid title and description.");
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${taskId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title: editingTitle, description: editingDescription }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to update the task");
    }

    const updatedTask = await response.json();


    setTasks(tasks.map((task) => 
      task._id === taskId 
        ? { ...task, title: updatedTask.title, description: updatedTask.description } 
        : task
    ));

    setEditingTaskId(null);
    setEditingTitle("");
    setEditingDescription("");
  } catch (error) {
    console.error("Error in editing task: ", error);
  }
};


return (
  <>
    <Header />
    <main className="task-manager">
      <h2>Task Manager</h2>
      <div className="task-manager-container">
        <div className="add-task">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what is that..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              {editingTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    autoFocus
                  />
                  <input
                    type="text"
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                  />
                  <button onClick={() => saveTask(task._id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {/* <div className="taskDetails"> */}
                    <span className="taskTitle">{task.title}</span>
                    <span className="taskDescription">{task.description}</span>
                  {/* </div> */}
                  <div className="taskButtons">
                    <button
                      onClick={() =>
                        startEditing(task._id, task.title, task.description)
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  </>
);

};

export default TaskManager;
