import React from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_TASK, DELETE_TASK } from '../../utils/mutations';
import { FaStar, FaCoins } from 'react-icons/fa';
import { QUERY_SINGLE_USER } from '../../utils/queries';

const SecretTaskCard = ({ task,  }) => {
  const [confirmTaskComplete] = useMutation(CONFIRM_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  //TODO Change this to an update button
  const handleRedeemClick = async () => {
      try {
        await confirmTaskComplete({ variables: { taskId: task._id }, refetchQueries: [QUERY_SINGLE_USER, 'user'] });
      } catch (err) {
        console.error('Error redeeming task:', err);
      }
    
  };

  const handleDeleteClick = async () => {
      try {
        await deleteTask({ variables: { taskId: task._id }, refetchQueries: [QUERY_SINGLE_USER, 'user'] });
      } catch (err) {
        console.error('Error deleting task:', err);
      }
  };


return (
    <div className="card bg-base-100 w-80 shadow-xl mx-4 my-4 border-4 border-transparent animated-border">
      <div className="card-body flex flex-col items-center text-center">
        <h5 className="card-title font-bold flex items-center">
          <FaStar className="inline mx-1" /> Task: {task.name} <FaStar className="inline mx-1" />
        </h5>
        <p className="card-text border p-2 mb-2">
          {task.description}
        </p>
        <p className="card-text flex items-center">
          <FaCoins className="inline mx-1" /> Points: {task.points} <FaCoins className="inline mx-1" />
        </p>
        <div className="card-actions flex justify-center">
          <button className="btn btn-success mx-2" onClick={handleRedeemClick}>
            Redeem
          </button>
          <button className="btn btn-error" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretTaskCard