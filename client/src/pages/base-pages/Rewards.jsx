import { useQuery } from "@apollo/client";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import ParentRewards from "../parent-pages/ParentRewards";
import ChildRewards from "../child-pages/ChildRewards";


const Rewards = () => {
  const {loading, error, data} = useQuery(ME)
  const userType = data?.me.__typename || 'user'
  const userInfo = useQuery(QUERY_SINGLE_USER, {
      variables: {
          userId: data?.me._id
      }
  })

  const userData = userInfo?.data?.user || {}

  
    let relaventPage;
    if (data){
      if (userType === 'Parent'){
        relaventPage = <ParentRewards data={userData}/>
      }else if (userType === 'Child'){
        relaventPage = <ChildRewards data={userData}/>
      }
    }
  
    return (
      <main>
        {relaventPage}
      </main>
    );
  };
  export default Rewards;
  