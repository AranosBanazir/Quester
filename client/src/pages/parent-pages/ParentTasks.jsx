import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import AddChildForm from './AddChildForm'; // Update the path as necessary
import { ADD_TASK } from '../../utils/mutations'; // Import your mutations
import { GET_TASKS, ME } from '../../utils/queries'; // Import your queries
import TaskCard from '../../components/TaskCard'; // Make sure to import TaskCard

const ParentTasks = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPoints, setTaskPoints] = useState('');
    const [selectedChild, setSelectedChild] = useState('');
    const [tasks, setTasks] = useState([]);
  
    // Query to get user data
    const { data: userData, loading: userLoading, error: userError } = useQuery(ME);
  
    // Query to get tasks
    const { data: tasksData, loading: tasksLoading, error: tasksError } = useQuery(GET_TASKS);

    // Mutation to add a task
    const [addTask, { data: taskData, loading: taskLoading, error: taskError }] = useMutation(ADD_TASK, {
      onCompleted: (data) => {
        console.log('Task added:', data);
        setTaskName('');
        setTaskDescription('');
        setTaskPoints('');
        setSelectedChild('');
        // Update tasks state with the new task
        setTasks(prevTasks => [...prevTasks, data.addTask]);
      },
      onError: (err) => {
        console.error('Error adding task:', err.message);
      },
    });
  
    const handleTaskSubmit = (e) => {
      e.preventDefault();
  
      if (!taskName || !taskDescription || !taskPoints || !selectedChild) {
        console.error('Task details are missing');
        return;
      }
  
      addTask({
        variables: {
          task: {
            name: taskName,
            description: taskDescription,
            points: parseInt(taskPoints, 10),
            owner: selectedChild,
          },
        },
      }).catch(err => {
        console.error('Mutation error:', err);
      });
    };
  
    // Load tasks from the GET_TASKS query
    useEffect(() => {
      if (tasksData && tasksData.getTasks) {
        setTasks(tasksData.getTasks);
      }
    }, [tasksData]);
  
    if (userLoading || tasksLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (userError) return <p className="text-center text-red-500">Error loading user data: {userError.message}</p>;
    if (tasksError) return <p className="text-center text-red-500">Error loading tasks: {tasksError.message}</p>;
  
    const isParent = userData?.me.__typename === 'Parent';
    const children = isParent ? userData.me.kids || [] : []; // Ensure children is an array

    console.log('Tasks:', tasks); // Debugging log

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Parent Page</h1>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Add a Task</h2>
          <form onSubmit={handleTaskSubmit} className="bg-gray-800 p-6 rounded-md shadow-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="taskName">Task Name:</label>
              <input
                id="taskName"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="taskDescription">Description:</label>
              <input
                id="taskDescription"
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task description"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="taskPoints">Points:</label>
              <input
                id="taskPoints"
                type="number"
                value={taskPoints}
                onChange={(e) => setTaskPoints(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter points"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="childSelect">Assign to Child:</label>
              <select
                id="childSelect"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                required
                className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a child</option>
                {children.map(child => (
                  <option key={child._id} value={child._id}>
                    {child.username}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={taskLoading}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              {taskLoading ? 'Adding Task...' : 'Add Task'}
            </button>
            {taskError && <p className="mt-4 text-red-500">Error: {taskError.message || 'An unknown error occurred'}</p>}
          </form>
        </section>
  
        <section className="mb-8">
          <AddChildForm />
        </section>
  
        <section>
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Tasks</h2>
          {tasks.filter(task => task !== null).length > 0 ? (
            tasks.filter(task => task !== null).map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onRedeem={() => {}}
                onDelete={() => {}}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No tasks available.</p>
          )}
        </section>
      </div>
    );
};

export default ParentTasks;