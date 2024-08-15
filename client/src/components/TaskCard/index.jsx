import React from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_TASK, DELETE_TASK } from '../../utils/mutations';

const TaskCard = ({ task, onRedeem, onDelete }) => {
  const [confirmTaskComplete] = useMutation(CONFIRM_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleRedeemClick = async () => {
    if (window.confirm(`Are you sure you want to redeem the task "${task.name}"?`)) {
      try {
        await confirmTaskComplete({ variables: { taskId: task._id } });
        onRedeem(task);
      } catch (err) {
        console.error('Error redeeming task:', err);
      }
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to delete the task "${task.name}"? This action cannot be undone.`)) {
      try {
        await deleteTask({ variables: { taskId: task._id } });
        onDelete(task);
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  return (
    <div className="card my-2">
      <div className="sticky-note h-[400px] items-center">
        <h5 className="card-title text-black permanent-marker-regular text-2xl task-text">{task.name}</h5>
        <p className="text-wrap text-black max-w-[200px] text-center font-bold text-xl task-text">{task.description}</p>
        <p className="text-wrap text-black font-bold task-text">Points: {task.points}</p>
        <image src='/assets/coin.gif' className='w-[50px]'/>
        <div>
        <button className="btn btn-success mx-2" onClick={handleRedeemClick}>
          Redeem
        </button>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
        </div>
    </div>
  );
};

export default TaskCard;
