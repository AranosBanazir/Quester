import TaskCard from "../../components/TaskCard"



const ChildTasks = ({data}) =>{
    return (
        <>
        <div id="section-container" className="mt-10">
              <div className="font-extrabold text-6xl mx-10 permanent-marker-regular task-header-text">
                <img src="/assets/my-tasks-banner.png" alt="" />
                </div>
              <div className="flex flex-wrap flex-row mx-auto items-center justify-center kid-item-container">
                <section id="task-section" className="w-auto flex flex-wrap flex-row justify-evenly" style={{margin: '20px'}}>
                    {data?.tasks.map(task=>{
                            return <TaskCard task={{name: task.name, description: task.description, points: task.points}}/>
                    })}
                </section>
              </div>
            </div>
        </>
    )
    
  }

export default ChildTasks