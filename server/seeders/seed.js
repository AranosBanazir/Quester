const db = require('../config/connection');
const { BaseUser, Child, Task, Reward, Parent,} = require('../models');
const taskData = require('./taskData.json')
const parentData = require('./parentData.json')
const rewardData = require('./rewardData.json')
const childData = require('./childData.json')




db.once('open', async () => {
  try {
    await BaseUser.deleteMany()
    const children = await Child.create(childData)

    //randomly assign a task to a child
    const rndChild = Math.floor(Math.random() * children.length)
    const modifiedTasks = taskData.map(task=>{
      return {...task, owner: children[rndChild]._id}
    })

    const tasks = await Task.create(modifiedTasks)
    for (const task of tasks){
      await Child.findByIdAndUpdate(task.owner, {
        $addToSet: {tasks: task._id }
      })
    }

    

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
