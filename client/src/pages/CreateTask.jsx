import React, { useState } from "react";

const CreateTask = () => {
  // State to hold the list of tasks and the new task input
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear input field after adding
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1>Task Board</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.button}>
          Add Task
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.taskItem}>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    width: "300px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  inputContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginRight: "10px",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  taskItem: {
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
};

export default CreateTask;
