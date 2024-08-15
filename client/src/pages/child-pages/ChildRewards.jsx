import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import RewardCard from "../../components/RewardCard";
import { GET_REWARDS } from "../../utils/queries";

const ChildRewards = () => {
  const [rewards, setRewards] = useState([]);

  // Query to get rewards
  const { data: rewardsData, loading: rewardsLoading, error: rewardsError } = useQuery(GET_REWARDS);

  // Load rewards from the GET_REWARDS query
  useEffect(() => {
    if (rewardsData && rewardsData.getRewards) {
      setRewards(rewardsData.getRewards);
    }
  }, [rewardsData]);

  if (rewardsLoading) return <p>Loading...</p>;
  if (rewardsError) return <p className="text-red-500">Error loading rewards: {rewardsError.message}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Rewards</h1>
      {rewards.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <RewardCard key={reward._id} reward={reward} showDeleteButton={false} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No rewards available.</p>
      )}
    </div>
  );
};

export default ChildRewards;
