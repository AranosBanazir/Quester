import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import RewardCard from "../../components/RewardCard";
import { GET_REWARDS } from "../../utils/queries";
import Spinner from "../../components/Spinner";

const ChildRewards = ({data}) => {
  const [rewards, setRewards] = useState([]);

  // Query to get rewards
  const { data: rewardsData, loading: rewardsLoading, error: rewardsError } = useQuery(GET_REWARDS);

  
  // Load rewards from the GET_REWARDS query
  useEffect(() => {
    if (rewardsData && rewardsData.getRewards) {
      setRewards(rewardsData.getRewards);
    }
  }, [rewardsData]);

  if (rewardsLoading) return <Spinner/>;
  if (rewardsError) return <p className="text-red-500">Error loading rewards: {rewardsError.message}</p>;

  return (
    <>
    <div className="flex flex-col">
      <div>
      <img src="/assets/rewards-shop-banner.png" alt="" />
      <strong className="flex flex-row text-4xl coin-text permanent-marker-regular font-bold">
        Your Coins: {data.wallet.toLocaleString()}
        <img src="/assets/coin.gif" alt="" className="max-w-[50px]"/>  
      </strong> 
      </div>
    </div>
    <div className="container mx-auto p-6 ">
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
    </>
  );
};

export default ChildRewards;
