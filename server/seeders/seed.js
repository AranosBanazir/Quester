const db = require('../config/connection');
const { BaseUser, Child, Task, Reward, Parent,} = require('../models');
const taskData = require('./taskData.json')
const parentData = require('./parentData.json')
const rewardData = require('./rewardData.json')
const childData = require('./childData.json')




db.once('open', async () => {
  try {
    await BaseUser.deleteMany()
    await Task.deleteMany()
    await Reward.deleteMany()
    const children = await Child.create(childData)
    const parents = await Parent.create(parentData)
    const rewards = await Reward.create(rewardData)

 
    //randomly assign a task to a child
    let rndChild = Math.floor(Math.random() * children.length)
    const modifiedTasks = taskData.map(task=>{
      return {...task, owner: children[rndChild]._id}
    })

    
    for (const reward of rewards){
      for (const parent of parents){
        await Parent.findByIdAndUpdate({_id: parent._id}, {
          $addToSet: {rewards: reward}
        })
      }
    }

    const tasks = await Task.create(modifiedTasks)
    for (const task of tasks){
      await Child.findByIdAndUpdate(task.owner, {
        $addToSet: {tasks: task._id }
      })
    }

    

   
    for (const parent of parents){
      rndChild = Math.floor(Math.random() * children.length)

      await Parent.findByIdAndUpdate({_id: parent._id}, {
        $addToSet: {kids: children[rndChild]}
      })
    }


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
