import { useQuery } from "@apollo/client";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";

import ParentTasks from "../parent-pages/ParentTasks";
import ChildTasks from "../child-pages/ChildTasks";


const Tasks = () => {
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
        relaventPage = <ParentTasks  data={userData}/>
      }else if (userType === 'Child'){
        relaventPage = <ChildTasks  data={userData}/>
      }
    }
  
    return (
      <main>
        {relaventPage}
      </main>
    );
  };
  export default Tasks;
  