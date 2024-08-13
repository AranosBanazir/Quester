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
      <div className="card-body">
        <h5 className="card-title">{task.name}</h5>
        <p className="card-text">{task.description}</p>
        <p className="card-text">Points: {task.points}</p>
        <button className="btn btn-success mx-2" onClick={handleRedeemClick}>
          Redeem
        </button>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
