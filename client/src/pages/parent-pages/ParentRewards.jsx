import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import AddChildForm from './AddChildForm'; // Update the path as necessary
import { ADD_REWARD } from '../../utils/mutations'; // Import your reward mutations
import { GET_REWARDS, ME } from '../../utils/queries'; // Import your reward queries
import RewardCard from '../../components/RewardCard'; // Make sure to import RewardCard

const ParentRewards = () => {
  const [rewardName, setRewardName] = useState('');
  const [rewardDescription, setRewardDescription] = useState('');
  const [rewardCost, setRewardCost] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [rewards, setRewards] = useState([]);

  // Query to get user data
  const { data: userData, loading: userLoading, error: userError } = useQuery(ME);

  // Query to get rewards
  const { data: rewardsData, loading: rewardsLoading, error: rewardsError } = useQuery(GET_REWARDS);

  // Mutation to add a reward
  const [addReward, { loading: rewardLoading, error: rewardError }] = useMutation(ADD_REWARD, {
    onCompleted: (data) => {
      console.log('Reward added:', data);
      setRewardName('');
      setRewardDescription('');
      setRewardCost('');
      setSelectedChild('');
      // Update rewards state with the new reward
      setRewards(prevRewards => [...prevRewards, data.addReward]);
    },
    onError: (err) => {
      console.error('Error adding reward:', err.message);
    },
  });

  const handleRewardSubmit = (e) => {
    e.preventDefault();

    if (!rewardName || !rewardDescription || !rewardCost || !selectedChild) {
      console.error('Reward details are missing');
      return;
    }

    addReward({
      variables: {
        reward: {
          name: rewardName,
          description: rewardDescription,
          cost: parseInt(rewardCost, 10),
          owner: selectedChild,
        },
      },
    }).catch(err => {
      console.error('Mutation error:', err);
    });
  };

  // Load rewards from the GET_REWARDS query
  useEffect(() => {
    if (rewardsData && rewardsData.getRewards) {
      setRewards(rewardsData.getRewards);
    }
  }, [rewardsData]);

  if (userLoading || rewardsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading user data: {userError.message}</p>;
  if (rewardsError) return <p>Error loading rewards: {rewardsError.message}</p>;

  const isParent = userData?.me.__typename === 'Parent';
  const children = isParent ? userData.me.kids || [] : []; // Ensure children is an array

  return (
    <>
      <h1 className="text-red-500">PARENT REWARDS PAGE</h1>

      <section>
        <h2 className="text-blue-500">Add a Reward</h2>
        <form onSubmit={handleRewardSubmit}>
          <div>
            <label className="text-red-500" htmlFor="rewardName">Reward Name:</label>
            <input
              id="rewardName"
              type="text"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-red-500" htmlFor="rewardDescription">Description:</label>
            <input
              id="rewardDescription"
              type="text"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-red-500" htmlFor="rewardCost">Cost:</label>
            <input
              id="rewardCost"
              type="number"
              value={rewardCost}
              onChange={(e) => setRewardCost(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-red-500" htmlFor="childSelect">Assign to Child:</label>
            <select
              id="childSelect"
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              required
            >
              <option value="">Select a child</option>
              {children.map(child => (
                <option key={child._id} value={child._id}>
                  {child.username}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={rewardLoading}>
            {rewardLoading ? 'Adding Reward...' : 'Add Reward'}
          </button>
          {rewardError && <p>Error: {rewardError.message || 'An unknown error occurred'}</p>}
        </form>
      </section>

      <section>
        <AddChildForm />
      </section>

      <section>
        <h2 className="text-blue-500">Rewards</h2>
        {rewards.filter(reward => reward !== null).length > 0 ? (
          rewards.filter(reward => reward !== null).map(reward => (
            <RewardCard
              key={reward._id}
              reward={reward}
              onRedeem={() => {}}
              onDelete={() => {}}
            />
          ))
        ) : (
          <p>No rewards available.</p>
        )}
      </section>
    </>
  );
};

export default ParentRewards;
