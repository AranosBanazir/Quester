const { BaseUser, Reward, Task, Child, Parent } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  UserTypes:{
    __resolveType(obj, contextValue, info){
      if (obj.rewards){
        return 'Parent'
      }

      if (obj.tasks){
        return 'Child'
      }
      return null
    }
  },
  Query: {
    users: async () => {
      return BaseUser.find();
    },

    user: async (parent, { userId }, context) => {
      if (context.user){

        const user = await BaseUser.findById({_id: userId}, '__t')
        if (user.__t === 'Parent'){

        
        const parent = await Parent.findById({ _id: userId })
                                   .populate('kids')
                                   .populate('rewards')
            
        
            for(const kid of parent.kids){
              let tasks = []
              let inventory = []
              const child = await Child.findById({_id: kid._id}).populate('tasks').populate('inventory')

              for (const item of child.inventory){
                inventory.push(item)
              }

              for (const task of child.tasks){
                tasks.push(task)
              }
              kid.inventory = inventory
              kid.tasks = tasks
            }
          return parent
        }else if (user.__t === 'Child'){
          const child = await Child.findById({ _id: userId })
          .populate('inventory')
          .populate('tasks')
          
          
              return child
        }
        return AuthenticationError
      }
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await BaseUser.findOne({ _id: context.user._id }).populate('kids');
        return user
      }
      throw AuthenticationError;
    },
    getTasks: async (parent, args, context)=>{
      if (context.user){
        const user = await BaseUser.findById({_id: context.user._id}, '__t')
        if (user.__t === 'Child'){
          const child = await Child.findById({_id: context.user._id}, 'tasks').populate('tasks')
          return child.tasks
        }else if (user.__t === 'Parent'){
          let tasks = []
          //getting all the kids under the Parent account
          const parent = await Parent.findById({_id: context.user._id}, 'kids').populate('kids')
          //Looping through the kids to get all the task id's
          for (const kid of parent.kids){
            tasks = [...tasks, ...kid.tasks]
          }

          let parsedTasks = []
          //loop through the task id's to get the full task objects
          for(const task of tasks){
            const parsedTask = await Task.findById({_id: task})
            parsedTasks.push(parsedTask)
          }
          
          return parsedTasks
        }
      }
      throw AuthenticationError
    },
    getRewards: async (parent, args, context)=>{
      if (context.user){
        const user = await BaseUser.findById({_id: context.user._id}, '__t')
        if (user.__t === 'Child'){
          const parent = await Parent.find({kids: {$all: context.user._id}}, 'rewards').populate('rewards')
      
          return parent[0].rewards || []
        }else if (user.__t === 'Parent'){
          const rewards = await Parent.findById({_id: context.user._id}, 'rewards').populate('rewards')
          
          return rewards.rewards
        }
        return user
      }
    }
  },

  Mutation: {
    addParent: async (parent, { username, email, password }) => {
      const user = await Parent.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addChild: async (parent, { username, password }, context) => {
      if (context.user){
        const child = await Child.create({username, password})
        const parent = await Parent.findByIdAndUpdate({_id: context.user._id}, {
          $addToSet: {kids: child}
        })        

        
        return child;
      }
      throw AuthenticationError
    },
    login: async (parent, { username, password }) => {
      const user = await BaseUser.findOne({ username });
      if (!user) {
        throw AuthenticationError;
      }
      
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // Set up mutation so a logged in user can only remove their user and no one else's
    removeUser: async (parent, {creds}, context) => {
      if (context.user){
      
        const user = await BaseUser.findOne({ username: creds.username });
      
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(creds.password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }

      await BaseUser.deleteOne({ username: creds.username})
      return user
      }
      throw AuthenticationError
    
    
  },
    updateChild: async (parent, {updatedChildInfo}, context) =>{
      if (context.user){
        const currentUser = await BaseUser.findById(context.user._id).populate('kids');
          
        if (currentUser.__t === 'Parent'){ 
          //Loops through the kids to see if the requested user to delete is in the array
          for (const kid of currentUser.kids){
            if (kid.username === updatedChildInfo.oldUsername){
              const targetKid = await BaseUser.findByIdAndUpdate({_id: kid._id}, updatedChildInfo, {
                new: true,
              })
              return targetKid
            } 
          }
        }
      }
      throw AuthenticationError
    },
    updateParent: async (parent, {updatedParentInfo}, context) =>{
      if (context.user){
        const user = await Parent.findByIdAndUpdate({_id: context.user._id}, updatedParentInfo)
        return user
      }
      throw AuthenticationError
    },
  
    addTask: async (parent, {task}, context) =>{
      if (context.user){
        const newTask = await Task.create(task)
        const child = await Child.findByIdAndUpdate({_id: task.owner}, {
          $addToSet: {tasks: newTask._id}
        })
        return newTask
      }
      throw AuthenticationError
    },
    updateTask: async (parent, {taskId, updatedTask}, context)=>{
      if (context.user){
        const task = await Task.findByIdAndUpdate({_id: taskId}, updatedTask)
        return task
      }
      throw AuthenticationError
    },
    confirmTaskComplete: async (parent, {taskId, childId}, context)=>{
      //confirming both tasks by parent and child to ensure the task is done
      if (context.user){
        const user = await BaseUser.findById({_id: context.user._id})
        if (user.__t === 'Child'){
          const task = await Task.findByIdAndUpdate({_id: taskId},{
            childConfirmed: true
          },{
            new: true
          })
          return task
        }else if (user.__t == 'Parent'){
          const task = await Task.findById({_id: taskId})
          const child = await Child.findById({_id: childId})
          if (task.childConfirmed === true){
            child.payForTask(task.points)       
          }

          task.resetTask()
          return task
        }
      }
      throw AuthenticationError
    },
    delTask: async (parent, {taskId}, context)=>{
      if (context.user){
        return await Task.findByIdAndDelete(taskId)
      }
      throw AuthenticationError
    },
    denyTask: async (parent, {taskId}, context)=>{
      if (context.user){
        const task = await Task.findByIdAndUpdate(taskId, {
          childConfirmed: false,
          parentConfirmed: false
        })

        return task
        
      }
      throw AuthenticationError
    },

    addReward: async (parent, {reward}, context)=>{
      if (context.user){
        const newReward = await Reward.create(reward)
        const parent = await Parent.findByIdAndUpdate({_id: context.user._id},{
          $addToSet: {rewards: newReward._id}
        })
        return newReward
      }
      throw AuthenticationError
    },
    updateReward: async (parent, {rewardId, updatedReward}, context)=>{
      if (context.user){
        const reward = await Reward.findByIdAndUpdate({_id: rewardId}, updatedReward)
        return reward
      }
      throw AuthenticationError
    },
    cashInReward: async (parent, {rewardId}, context)=>{

      if (context.user){
        //getting the child from the DB by context
        const test = await Reward.deleteOne({_id: rewardId})
        return await Reward.findById(rewardId)
      }

      throw AuthenticationError

    },
    buyReward: async (parent, {rewardId}, context) =>{

      if (context.user){
        
        //finding the reward to clone
        const reward = await Reward.findById({_id: rewardId})
        const {name, description, cost} = reward

        //cloning reward for inventory
        const newReward = await Reward.create({name, description, cost})

        //checking if the user is broke
        const user = await Child.findById(context.user._id)
        const hadEnoughMoney = await user.buyReward(reward.cost)


        if (hadEnoughMoney){
          //Hey they weren't broke! lets push in the cloned reward so we can stop deleting the original!
          const user = await Child.findByIdAndUpdate({_id: context.user._id}, {
            $push: {inventory: newReward._id},
          })
        }
        
        return newReward
      }
      return AuthenticationError
    },
    delReward: async (parent, {rewardId}, context)=>{
      if (context.user){
        return await Reward.findByIdAndDelete({_id: rewardId}) 
      }
    }
  },
};

module.exports = resolvers;
