import React from 'react';
import { useMutation } from '@apollo/client';
import { CONFIRM_REWARD, DELETE_REWARD } from '../../utils/mutations';

    const RewardCard = ({ reward, onRedeem, onDelete }) => {
        const [confirmRewardComplete] = useMutation(CONFIRM_REWARD);
        const [deleteReward] = useMutation(DELETE_REWARD);
      
        const handleRedeemClick = async () => {
          if (window.confirm(`Are you sure you want to redeem the reward "${reward.name}"?`)) {
            try {
              await confirmRewardComplete({ variables: { rewardId: reward._id } });
              onRedeem(reward);
            } catch (err) {
              console.error('Error redeeming task:', err);
            }
          }
        };
      
        const handleDeleteClick = async () => {
          if (window.confirm(`Are you sure you want to delete the reward "${reward.name}"? This action cannot be undone.`)) {
            try {
              await deleteReward({ variables: { rewardId: reward._id } });
              onDelete(reward);
            } catch (err) {
              console.error('Error deleting reward:', err);
            }
          }
        };

    return (
<div className="card card-compact bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{reward.name}</h2>
    <p>{reward.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-success self-end mt-5" onClick={handleRedeemClick}>
          <p className='mr-2'>
          Cost: {reward.cost}
          </p>
        </button>
      <button className="btn btn-error self-end mt-5" onClick={handleDeleteClick}>
        Delete!
      </button>
    </div>
  </div>
</div>
    );
};




export default RewardCard;