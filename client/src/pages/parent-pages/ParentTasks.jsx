import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations'; // Import your mutations
import { GET_TASKS, ME } from '../../utils/queries'; // Import your queries
import SecretTaskCard from '../../components/SecretTaskCard';
import Spinner from '../../components/Spinner';
import errorHandler from '../../utils/errorHandler';

const ParentTasks = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPoints, setTaskPoints] = useState('');
    const [selectedChild, setSelectedChild] = useState('');
    const [tasks, setTasks] = useState([]);
  
    const { data: userData, loading: userLoading, error: userError } = useQuery(ME);
    const { data: tasksData, loading: tasksLoading, error: tasksError } = useQuery(GET_TASKS);

    const [addTask, { data: taskData, loading: taskLoading, error: taskError }] = useMutation(ADD_TASK, {
      onCompleted: (data) => {
        setTaskName('');
        setTaskDescription('');
        setTaskPoints('');
        setSelectedChild('');
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
            points: parseInt(taskPoints),
            owner: selectedChild,
          },
        },
      }).catch(err => {
        console.error('Mutation error:', err);
      });
    };
  
    useEffect(() => {
      if (tasksData && tasksData.getTasks) {
        setTasks(tasksData.getTasks);
      }
    }, [tasksData]);
  
    if (userLoading || tasksLoading) return <Spinner/>
    if (userError) return <p className="text-center text-red-500">Error loading user data: {errorHandler(userError.message)}</p>;
    if (tasksError) return <p className="text-center text-red-500">Error loading tasks: {errorHandler(tasksError.message)}</p>;
  
    const isParent = userData?.me?.__typename === 'Parent';
    const children = isParent ? userData.me.kids || [] : []; // Ensure children is an array

    return (
      <div className="container mx-auto p-6">
        <section className="bg-gray-800 text-white p-6 rounded-md shadow-lg mb-6">
          <form onSubmit={handleTaskSubmit}>
            <div className="flex justify-center w-full mb-4">
              <img
                src="/assets/add-a-task-banner.png"
                alt="Add a Task Banner"
                className="w-full md:w-3/4 lg:w-2/3"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-300 mb-1 permanent-marker-regular" htmlFor="taskName">
                Name:
              </label>
              <input
                id="taskName"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
                className="w-full p-1 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Task name"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-300 mb-1 permanent-marker-regular" htmlFor="taskDescription">
                Description:
              </label>
              <input
                id="taskDescription"
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
                className="w-full p-1 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-300 mb-1 permanent-marker-regular" htmlFor="taskPoints">
                Points:
              </label>
              <input
                id="taskPoints"
                type="number"
                value={taskPoints}
                onChange={(e) => setTaskPoints(e.target.value)}
                required
                className="w-full p-1 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Points"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-300 mb-1 permanent-marker-regular" htmlFor="childSelect">
                Assign to:
              </label>
              <select
                id="childSelect"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                required
                className="w-full p-1 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a child</option>
                {children.map((child) => (
                  <option key={child._id} value={child._id}>
                    {child.username}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={taskLoading}
              className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 permanent-marker-regular"
            >
              {taskLoading ? 'Adding...' : 'Add Task'}
            </button>
            {taskError && <p className="mt-2 text-red-500 text-sm">Error: {errorHandler(taskError.message) || 'An unknown error occurred'}</p>}
          </form>
        </section>
    
        <div className="container mx-auto p-4">
          <img
            src="/assets/tasks-banner.png"
            alt="Tasks Banner"
            className="w-full md:w-3/4 lg:w-2/3 mx-auto"
          />
          <div className="mt-8">
            {tasks.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tasks
                  .filter((task) => task !== null)
                  .map((task) => (
                    <SecretTaskCard
                      key={task._id}
                      task={task}
                      onRedeem={() => {}}
                      onDelete={() => {}}
                    />
                  ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No tasks available.</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default ParentTasks;