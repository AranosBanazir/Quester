import { useQuery } from "@apollo/client";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import ChildTasks from "../child-pages/ChildTasks";
import ParentAccount from "../parent-pages/ParentAccount";
import KidsPage from "../parent-pages/KidsPage";
import Login from "../Login";
import AuthCheck from "../../components/AuthCheck";
const Home = () => {
  //use this in every component that uses the ME query
  //use this in every component that uses the ME query
  //this will let us know if they are a Parent or a child
  //and we can then render the page to fit the user
  const { loading, error, data } = useQuery(ME);
  const userType = data?.me?.__typename || "user";
  const userInfo = useQuery(QUERY_SINGLE_USER, {
    variables: {
      userId: data?.me?._id,
    },
  });
  const userData = userInfo?.data?.user;

  let relaventPage = <Login />;

  if (data) {
    if (userType === "Parent" && userData?.kids?.length === 0) {
      relaventPage = <ParentAccount data={userData} />;
    } else if (userType === "Parent") {
      relaventPage = <KidsPage data={userData} />;
    } else if (userType === "Child") {
      relaventPage = <ChildTasks data={userData} />;
    }
  }

  return <AuthCheck>{relaventPage}</AuthCheck>;
};
export default Home;
