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
    
    console.log(data)


    return (
        <>

        <h1>CHILD PAGE</h1>
        {data?.tasks?.map((task) => {
            return <TaskCard  task={task} key={`taskCard-${task._id}`}/>
        })}
        </>
    )
}

export default ChildTasks