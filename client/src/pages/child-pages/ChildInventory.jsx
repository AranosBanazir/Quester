import { useQuery } from "@apollo/client";
import {ME, QUERY_SINGLE_USER}from '../../utils/queries'



const Inventory = () => {

    const { loading, error, data } = useQuery(ME);
  const userType = data?.me?.__typename || "user";
  const userInfo = useQuery(QUERY_SINGLE_USER, {
    variables: {
      userId: data?.me?._id,
    },
  });
  const userData = userInfo?.data?.user;
  console.log(userData)
    return (
        <>
        hello
        </>
    )
}

export default Inventory