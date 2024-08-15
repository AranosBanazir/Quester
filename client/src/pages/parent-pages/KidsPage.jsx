import Spinner from "../../components/Spinner";
import TaskCard from "../../components/TaskCard";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const KidsPage = () =>{
    const [activeChildState, setActiveChildState] = useState('')
    const { loading, error, data: myData } = useQuery(ME);
    const userType = myData?.me.__typename || "user";
    const {loading: userLoading, error: userError, data: userData} = useQuery(QUERY_SINGLE_USER, {
      variables: {
        userId: myData?.me._id,
      },
    });
    
    



    const user = userData?.user || {loading: true}
    
    if (user.kids && activeChildState === ''){
      setActiveChildState(user.kids[0])
    }

    const getActiveChildTasks = () =>{
      const tasks = activeChildState?.tasks || []
      return (
        <>
        {tasks.map(task=>{
          return <TaskCard task={{name: task.name, description: task.description, points: task.points}}/>
        })}
        </>
      )
    }


    const getActiveChildInventory = () =>{
      const tasks = activeChildState?.tasks || []
      return (
        <>
        {tasks.map(task=>{
          return <TaskCard task={{name: task.name, description: task.description, points: task.points}}/>
        })}
        </>
      )
    }

    useEffect(()=>{
      if (!user.kids) return

      const taskDiv = document.getElementById('task-section')
      const rewardsDiv = document.getElementById('rewards-section')
      const inventory  = document.getElementById('inventory-section')

  
      
    console.log(activeChildState?.tasks)
    }, [activeChildState])


    const handleActiveChild = (child) =>{
      for (const kid of user.kids){
        if (kid.username === child){
          setActiveChildState(kid)
        }
      }
      
    }
    
    return (
        <>  
        <nav className="flex flex-row justify-evenly flex-wrap mt-10 items-center">
          {userLoading || loading || user.loading ? (<Spinner classNames="mx-auto"/>) : (
            <>
            {user?.kids.map(kid=>{
              return (
                  <button onClick={()=>{
                    handleActiveChild(kid.username)
                  }} className="btn border-t-gray-900 text-center text-green-600 font-bold text-xl" key={kid._id}>
                    {kid.username}
                  </button>
                  )
            })}
            </>
          )}
        </nav>

        <div className="flex flex-wrap flex-col">
          
          <section id="task-section" className="cork w-auto flex flex-wrap flex-col">
              {getActiveChildTasks()}
          </section>

          <section id="inventory-div" className="cork w-auto flex flex-wrap flex-col">
            {getActiveChildInventory()}
          </section>
        </div>

        </>
    )
}


export default KidsPage