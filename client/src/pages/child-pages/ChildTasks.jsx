import TaskCard from "../../components/TaskCard"

// example tasks

// const tasks = [
//     {
//         _id: 1,
//         name: 'dishes',
//         description: 'clean them',
//         points: 5000000,
//         owner: 1,
//         childConfirmed: false,
//         parentConfirmed: false
//   },
//   {
//     _id: 2,
//     name: 'laundry',
//     description: 'clean them x2',
//     points: 5,
//     owner: 2,
//     childConfirmed: false,
//     parentConfirmed: false
//     }

// ]



const ChildTasks = ({data}) =>{
    return (
        <>
        <div id="section-container" className="mt-10">
              <div className="font-extrabold text-6xl mx-10 permanent-marker-regular task-header-text">
                  <p>
                    My Tasks
                  </p>
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