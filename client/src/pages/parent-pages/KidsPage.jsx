import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const KidsPage = () =>{
  
    const { loading, error, data: myData } = useQuery(ME);
    const userType = myData?.me.__typename || "user";
    const {loading: userLoading, error: userError, data: userData} = useQuery(QUERY_SINGLE_USER, {
      variables: {
        userId: myData?.me._id,
      },
    });
    
    // console.log(myData)

    const user = userData?.user || {}
    // tabs-lifted
    return (
        <>
        <h1 className="text-red-500">My Kids and their shit</h1>
        <nav>
          {userLoading || loading ? (<div>
            loading...
          </div>) : (
            <>
            {user.kids.map(kid=>{
              return (
                <li key={kid.username}>
                  <button>
                    {kid.username}
                  </button>
                </li>
              )
            })}
            </>
       
          )}

        </nav>

        </>
    )
}


export default KidsPage