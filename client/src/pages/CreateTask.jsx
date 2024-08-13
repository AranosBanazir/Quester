// pages/CreateTask.jsx

import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { getTasks, getKids } from '../utils/api'; // Adjust the path as needed

const CreateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [kids, setKids] = useState([]);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    points: '',
    assignedTo: [],
  });
  const [selectedKids, setSelectedKids] = useState([]);

  useEffect(() => {
    const fetchTasksAndKids = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);

      const fetchedKids = await getKids();
      setKids(fetchedKids);
    };

    fetchTasksAndKids();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission and task creation
    // Ensure to handle selectedKids in formState
  };

  const handleCheckboxChange = (kidId) => {
    setSelectedKids((prevSelectedKids) =>
      prevSelectedKids.includes(kidId)
        ? prevSelectedKids.filter((id) => id !== kidId)
        : [...prevSelectedKids, kidId]
    );
  };

  const handleRedeem = (taskId) => {
    // Handle task redemption
  };

  const handleDelete = (taskId) => {
    // Handle task deletion
  };

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          
          <h1>Task Page</h1>
          <form onSubmit={handleFormSubmit}>
            {/* Form elements for creating tasks */}
            <div className="mb-3">
              <label className="form-label">Assign to:</label>
              {kids && kids.length > 0 ? (
                kids.map((kid) => (
                  <div key={kid._id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`kid-${kid._id}`}
                      checked={selectedKids.includes(kid._id)}
                      onChange={() => handleCheckboxChange(kid._id)}
                    />
                    <label className="form-check-label" htmlFor={`kid-${kid._id}`}>
                      {kid.username}
                    </label>
                  </div>
                ))
              ) : (
                <p>No kids available.</p>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Create Task
            </button>
          </form>

          <div className="mt-5">
            <h2>Tasks</h2>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onRedeem={handleRedeem}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateTask;
