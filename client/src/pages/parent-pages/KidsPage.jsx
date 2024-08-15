import Spinner from "../../components/Spinner";
import TaskCard from "../../components/TaskCard";
import { ME, QUERY_SINGLE_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import AddChildForm from "./AddChildForm";
import { redirect } from "react-router-dom";

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
        {tasks.filter(task=> task.childConfirmed === true
        )
        .map(task=>{
          return <TaskCard task={{name: task.name, description: task.description, points: task.points}}/>
        })}
        </>
      )
    }


    const getActiveChildInventory = () =>{
      const tasks = activeChildState?.tasks || []
      return (
        <>

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
        <nav className="flex flex-row justify-evenly flex-wrap mt-10 items-center h-auto">
          {userLoading || loading || user.loading ? (<Spinner classNames="mx-auto"/>) : (
            <>
            {user?.kids.map(kid=>{
              return (
                  <button onClick={()=>{
                    handleActiveChild(kid.username)
                  }} className="bg-transparent text-center text-black font-bold text-xl sign btn-sign permanent-marker-regular" key={kid._id}>
                    <p className="mt-5 mr-7">
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
                  <p>
                    Completed Tasks
                  </p>
                </div>
              <div className="flex flex-wrap flex-row mx-auto items-center justify-center kid-item-container">
                <section id="task-section" className="w-auto flex flex-wrap flex-row justify-evenly" style={{margin: '20px'}}>
                    {getActiveChildTasks()}
                </section>
              </div>
              <div className="text-white font-extrabold text-6xl mx-10 permanent-marker-regular">
                  <p>
                    Inventory
                  </p>
                </div>
                <div className="flex flex-wrap flex-row mx-auto items-center justify-center kid-item-container">
                <section id="inventory-div" className="w-auto flex flex-wrap flex-row justify-evenly" style={{margin: '20px'}}>
                  {getActiveChildInventory()}
                </section>
              </div>
            </div>)}
      </>
    )
}


export default KidsPage