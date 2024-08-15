import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import AddChildForm from "./AddChildForm"; // Update the path as necessary
import { ADD_REWARD } from "../../utils/mutations"; // Import your reward mutations
import { GET_REWARDS, ME } from "../../utils/queries"; // Import your reward queries
import RewardCard from "../../components/RewardCard"; // Make sure to import RewardCard

const ParentRewards = () => {
  const [rewardName, setRewardName] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [rewardCost, setRewardCost] = useState("");
  const [rewards, setRewards] = useState([]);

  // Query to get user data
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(ME);

  // Query to get rewards
  const {
    data: rewardsData,
    loading: rewardsLoading,
    error: rewardsError,
  } = useQuery(GET_REWARDS);

  // Mutation to add a reward
  const [addReward, { loading: rewardLoading, error: rewardError }] =
    useMutation(ADD_REWARD, {
      onCompleted: (data) => {
        console.log("Reward added:", data);
        setRewardName("");
        setRewardDescription("");
        setRewardCost("");
        // Update rewards state with the new reward
        setRewards((prevRewards) => [...prevRewards, data.addReward]);
      },
      onError: (err) => {
        console.error("Error adding reward:", err.message);
      },
    });

  const handleRewardSubmit = (e) => {
    e.preventDefault();

    console.log(rewardDescription, rewardCost, rewardName);

    if (!rewardName || !rewardDescription || !rewardCost) {
      console.error("Reward details are missing");
      return;
    }

    addReward({
      variables: {
        reward: {
          name: rewardName,
          description: rewardDescription,
          cost: parseInt(rewardCost),
        },
      },
    }).catch((err) => {
      console.error("Mutation error:", err);
    });
  };

  // Load rewards from the GET_REWARDS query
  useEffect(() => {
    if (rewardsData && rewardsData.getRewards) {
      setRewards(rewardsData.getRewards);
    }
  }, [rewardsData]);

  if (userLoading || rewardsLoading) return <p>Loading...</p>;
  if (userError)
    return (
      <p className="text-red-500">
        Error loading user data: {userError.message}
      </p>
    );
  if (rewardsError)
    return (
      <p className="text-red-500">
        Error loading rewards: {rewardsError.message}
      </p>
    );

  const isParent = userData?.me?.__typename === "Parent";
  const children = isParent ? userData.me.kids || [] : []; // Ensure children is an array

  return (
    <div className="container mx-auto p-6">
     

      <section className="bg-gray-800 text-white p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Add a Reward</h2>
        <form onSubmit={handleRewardSubmit}>
          <div className="mb-4">
            <label
              htmlFor="rewardName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Reward Name:
            </label>
            <input
              id="rewardName"
              type="text"
              value={rewardName}
              onChange={(e) => setRewardName(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reward name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rewardDescription"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description:
            </label>
            <input
              id="rewardDescription"
              type="text"
              value={rewardDescription}
              onChange={(e) => setRewardDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reward description"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rewardCost"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Cost:
            </label>
            <input
              id="rewardCost"
              type="number"
              value={rewardCost}
              onChange={(e) => setRewardCost(e.target.value)}
              required
              className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reward cost"
            />
          </div>
          <button
            type="submit"
            disabled={rewardLoading}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {rewardLoading ? "Adding Reward..." : "Add Reward"}
          </button>
          {rewardError && (
            <p className="mt-4 text-red-500">
              Error: {rewardError.message || "An unknown error occurred"}
            </p>
          )}
        </form>
      </section>

      <section className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Rewards</h2>
        {rewards.filter((reward) => reward !== null).length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards
              .filter((reward) => reward !== null)
              .map((reward) => (
                <RewardCard
                  key={reward._id}
                  reward={reward}
                  onRedeem={() => {}}
                  onDelete={() => {}}
                />
              ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No rewards available.</p>
        )}
      </section>
    </div>
  );
};

export default ParentRewards;
