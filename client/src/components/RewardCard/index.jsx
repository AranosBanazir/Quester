import React from "react";
import { useMutation } from "@apollo/client";
import {
  BUY_REWARD,
  DELETE_REWARD,
  CASH_IN_REWARD,
} from "../../utils/mutations";
import { GET_REWARDS, ME, QUERY_SINGLE_USER } from "../../utils/queries";
const RewardCard = ({
  reward,
  showDeleteButton = true,
  userType,
  showCashInButton = false,
}) => {
  const [buyReward] = useMutation(BUY_REWARD);
  const [deleteReward] = useMutation(DELETE_REWARD);
  const [cashInReward] = useMutation(CASH_IN_REWARD);

  const handleRedeemClick = async () => {
    try {
      await buyReward({
        variables: { rewardId: reward._id },
        refetchQueries: [QUERY_SINGLE_USER, "user"],
      });
    } catch (err) {
      console.error("Error redeeming reward:", err);
    }
  };

  const handleCashIn = async () => {
    try {
      await cashInReward({
        variables: {
          rewardId: reward._id,
        },
        refetchQueries: [QUERY_SINGLE_USER, "user"],
      });
    } catch (err) {}
  };

  const handleDeleteClick = async () => {
    try {
      await deleteReward({
        variables: { rewardId: reward._id },
        refetchQueries: [QUERY_SINGLE_USER, "user"],
      });
    } catch (err) {
      console.error("Error deleting reward:", err);
    }
  };

  return (
    <div className="item-bought card min-h-[325px] max-h-[325px]">
      <div className="card-body reward-sign items-center justify-center permanent-marker-regular reward-text">
        <div>
          <h2 className="text-3xl text-center pt-20">{reward.name}</h2>
          <div className="reward-description-div mt-2 ml-3">
            <p className="max-w-[270px] text-wrap text-xl max-h-[50px] font-bold min-h-[60px]">
              {reward.description}
            </p>
          </div>
        </div>

        <div className="self-center ">
          {showCashInButton && userType === "Child" ? (
            <button className="" onClick={handleCashIn}>
              <p className=" btn  text-center reward-text">Cash in reward</p>
            </button>
          ) : userType === "Child" ? (
            <button className="" onClick={handleRedeemClick}>
              <p className="pb-10 reward-cost flex flex-row items-center justify-center">
                Cost: {reward.cost}
                <img src="/assets/coin.gif" className="w-[40px]" />
              </p>
            </button>
          ) : (
            <></>
          )}
          {showDeleteButton && (
            <button className="btn btn-error" onClick={handleDeleteClick}>
              Delete!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
