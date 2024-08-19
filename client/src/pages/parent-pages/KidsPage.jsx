import Spinner from "../../components/Spinner";
import TaskCard from "../../components/TaskCard";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useState} from "react";
import AuthCheck from "../../components/AuthCheck";
import RewardCard from "../../components/RewardCard";

const KidsPage = () =>{
    const [activeChildState, setActiveChildState] = useState('')
    const { loading, error, data: myData } = useQuery(ME);
    const userType = myData?.me?.__typename || "user";
    const {loading: userLoading, error: userError, data: userData} = useQuery(QUERY_SINGLE_USER, {
      variables: {
        userId: myData?.me?._id,
      },
    });
    
 

    const user = userData?.user || {loading: true}
    

    if (user.kids && activeChildState === ''){
      setActiveChildState(user.kids[0])
    }

    const getActiveChildTasks = () =>{
      const tasks = activeChildState?.tasks || []
      return tasks
        .filter(task=> task.childConfirmed === true)
        .map(task=>{
          return <TaskCard 
            task={task}
            userType={userType}
            showDeleteButton={true}
            key={task._id}
            />
        })
      
    }


    const getActiveChildInventory = () =>{
      const inventory = activeChildState?.inventory || []
      return inventory
            .map(reward=>{
              return <RewardCard
              key={reward._id}
              reward={reward}
              userType ={userType}
              showDeleteButton = {true}
            />
            })
    }


    const handleActiveChild = (child) =>{
      for (const kid of user.kids){
        if (kid.username === child){
          setActiveChildState(kid)
        }
      }
      
    }
    
    return (
          <> 
          <AuthCheck>
        <nav className="flex flex-row justify-evenly flex-wrap mt-10 items-center h-auto">
          {userLoading || loading ? (<Spinner classNames="mx-auto"/>) : (
            <>
            {user?.kids.map(kid=>{
              return (
                  <button onClick={()=>{
                    handleActiveChild(kid.username)
                  }} className="bg-transparent text-center text-black font-bold text-xl sign btn-sign permanent-marker-regular wobble" key={kid._id}>
                    <p className="mt-8 mr-16 text-3xl">
                    {kid.username}
                    </p>
                  </button>
                  )
            })}
            </>
          )}
        </nav>
        {userLoading || loading || user.loading ? <></>: (
            <div id="section-container" className="mt-10">
              <div className="text-white font-extrabold text-6xl mx-10 permanent-marker-regular">

                  <img src="/assets/completed-tasks-banner.png" alt="Task banner"  />
                  
                </div>
              <div className="flex flex-wrap flex-row mx-auto items-center justify-center">
                <section id="task-section" className="w-auto flex flex-wrap flex-row justify-evenly" style={{margin: '20px'}}>
                    {getActiveChildTasks()}
                </section>
              </div>
              <div className="text-white font-extrabold text-6xl mx-10 permanent-marker-regular">
                  <img src="/assets/inventory-banner.png" alt="Inventory banner" />
                </div>
                <div className="flex flex-wrap flex-row mx-auto items-center justify-center">
                <section id="inventory-div" className="w-auto flex flex-wrap flex-row justify-evenly" style={{margin: '20px'}}>
                  {getActiveChildInventory()}
                </section>
              </div>
            </div>)}
      </AuthCheck>
      </>
    )
}


export default KidsPage