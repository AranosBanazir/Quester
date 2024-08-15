
import RewardCard from "../../components/RewardCard"





const ChildRewards = ({data}) =>{
    console.log("Rewards data:", data?.rewards);
    console.log(data)


    return (
        <>

        <h1 className="text-red-500">CHILD PAGE Rewards</h1>
        {data?.getRewards?.map((reward) => {
            return <RewardCard  reward={reward} 
            key={`rewardCard-${reward._id}`}/>
        })}
        </>
    )
}


export default ChildRewards