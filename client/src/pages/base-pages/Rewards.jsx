import { useQuery } from "@apollo/client";
import { ME, QUERY_SINGLE_USER, GET_REWARDS } from "../../utils/queries";
import ParentRewards from "../parent-pages/ParentRewards";
import ChildRewards from "../child-pages/ChildRewards";
import Spinner from "../../components/Spinner";
import AuthCheck from "../../components/AuthCheck";
const Rewards = () => {
  const {loading:rewardLoading, error:rewardError, data:rewardData}= useQuery(GET_REWARDS)
  const {loading, error, data} = useQuery(ME)
  const userType = data?.me?.__typename || 'user'
  const userInfo = useQuery(QUERY_SINGLE_USER, {
      variables: {
          userId: data?.me?._id
      }
  })

  const userData = userInfo?.data?.user || {}

  
    let relaventPage;
    if (data){
      if (userType === 'Parent'){
        relaventPage = <ParentRewards data={userData}/>
      }else if (userType === 'Child'){
        relaventPage = <ChildRewards data={{...userData, ...rewardData}}/>
      }
    }
  
    return (
      <AuthCheck>
        {loading ? <Spinner classNames="mx-auto"/> : relaventPage}
      </AuthCheck>
    );
  };
  export default Rewards;
  