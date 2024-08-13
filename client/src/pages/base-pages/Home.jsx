import { useQuery } from "@apollo/client";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import ParentHomePage from "../parent-pages/ParentHomePage";
import ChildHomePage from "../child-pages/ChildHomePage";

const Home = () => {
  //use this in every component that uses the ME query
 //use this in every component that uses the ME query
 //this will let us know if they are a Parent or a child
 //and we can then render the page to fit the user
 const {loading, error, data} = useQuery(ME)
 const userType = data?.me.__typename || 'user'
 const userInfo = useQuery(QUERY_SINGLE_USER, {
     variables: {
         userId: data?.me._id
     }
 })
 
  const userData = userInfo?.data?.user
  let relaventPage;

  if (data){
    if (userType === 'Parent'){
      relaventPage = <ParentHomePage data={userData}/>
    }else if (userType === 'Child'){
      relaventPage = <ChildHomePage data={userData}/>
    }
  }

  return (
    <main>
      {relaventPage}
    </main>
  );
};
export default Home;
