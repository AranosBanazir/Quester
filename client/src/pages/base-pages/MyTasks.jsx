import { useQuery } from "@apollo/client";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";

import ChildTasks from "../child-pages/ChildTasks";


const Tasks = () => {
  const {loading, error, data} = useQuery(ME)
  const userType = data?.me.__typename || 'user'
  const userInfo = useQuery(QUERY_SINGLE_USER, {
      variables: {
          userId: data?.me._id
      }
  })
  
    let relaventPage;

   

    const userData = userInfo?.data?.user || {}   

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
  