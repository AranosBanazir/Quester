import TaskCard from "../../components/TaskCard";

const ChildTasks = ({ data }) => {
  console.log(data)
  return (
    <>
        <div >
          <img src="/assets/my-tasks-banner.png" alt="" />
        </div>
      <div id="section-container" className="mt-10">
        <div className="flex flex-wrap flex-row mx-auto items-center justify-center kid-item-container">
          <section
            id="task-section"
            className="w-auto flex flex-wrap flex-row justify-evenly"
            style={{ margin: "20px" }}
          >
            {data?.tasks
              .filter(task=> !task.childConfirmed)
              .map((task) => {
                return <TaskCard
                    task={task}
                    showDeleteButton={false}
                    userType={data.__typename}
                    key={task._id}
                  />
            })}
          </section>
        </div>
      </div>
    </>
  );
};

export default ChildTasks;
