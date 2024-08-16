import { useQuery } from "@apollo/client";
import {ME, QUERY_SINGLE_USER}from '../../utils/queries'
import RewardCard from "../../components/RewardCard";
import AuthCheck from "../../components/AuthCheck";



const Inventory = () => {

    const { loading, error, data } = useQuery(ME);
  const userType = data?.me?.__typename || "user";
  const userInfo = useQuery(QUERY_SINGLE_USER, {
    variables: {
      userId: data?.me?._id,
    },
  });
  const userData = userInfo?.data?.user;
    return (
        <>
        <AuthCheck>
        <div>
        <img src="/assets/inventory-banner.png" alt="Inventory banner" />
        </div>

        <div className=" mx-auto p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols3">
          {userData?.inventory?.map(item=>{
            return <RewardCard key={item._id} showDeleteButton={false} showCashInButton={true} userType={userType} reward={item}/>
          })}
          </div>
        </div>
        </AuthCheck>
        </>
    )
}

export default Inventory