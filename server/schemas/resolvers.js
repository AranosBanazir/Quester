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

    user: async (parent, { userId }) => {
      return BaseUser.findOne({ _id: userId })
              .populate('kids')
              .populate('tasks')
              .populate('rewards')
              .populate('inventory');
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

        //if we have gotten this far then ther user is:
        //1.) logged in
        //2.) has the correct username and password
        //3.) either is the account or owns the account
        if (user.__t === 'Parent'){
          const parent = await BaseUser.findById({_id: context.user._id}).populate('kids')
          if (parent.username == user.username){
            await BaseUser.findByIdAndDelete({_id: parent._id})
            return user
          }

          //Loops through the kids to see if the requested user to delete is in the array
          for (const kid of parent.kids){
            if (kid.username === user.username){
              await BaseUser.deleteOne({_id: user._id})
            } 
          }
          return null
        }else if (user.__t === 'Child'){
          throw AuthenticationError
        }
      }

    },
    updateUser: async (parent, {creds, updatedUserInfo}, context) =>{
      if (context.user){
        
        const user = await BaseUser.findOne({ username: creds.username });
     
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(creds.password);
        
        if (!correctPw) {
          throw AuthenticationError;
        }

        //if we have gotten this far then ther user is:
        //1.) logged in
        //2.) has the correct username and password
        //3.) either is the account or owns the account
        if (user.__t === 'Parent'){
          const parent = await BaseUser.findById({_id: context.user._id}).populate('kids')

          if (parent.username == user.username){
            await BaseUser.findByIdAndUpdate({_id: parent._id}, updatedUserInfo)
            return user
          }


        
          
        }else if (user.__t === 'Child'){ 
          const parent = await BaseUser.findById({_id: context.user._id}, 'kids').populate('kids')
          //Loops through the kids to see if the requested user to delete is in the array
          for (const kid of parent.kids){
            if (kid.username === user.username){
              const targetKid = await BaseUser.findByIdAndUpdate({_id: user._id}, updatedUserInfo, {
                new: true
              })
              return targetKid
            } 
          }
        }
      }

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
    confirmTaskComplete: async (parent, {taskId}, context)=>{
      //confirming both tasks by parent and child to ensure the task is done
      if (context.user){
        const user = await BaseUser.findById({_id: context.user._id})
        if (user.__t === 'Child'){
          const task = await Task.findByIdAndUpdate({_id: taskId},{
            childConfirmed: true
          })
          return task
        }else if (user.__t == 'Parent'){
          const task = await Task.findByIdAndUpdate({_id: taskId},{
            parentConfirmed: true
          })
          return task
        }
      }
      throw AuthenticationError
    },
    delTask: async (parent, {taskId}, context)=>{
      if (context.user){
        const user = BaseUser.find({})
        return await Task.findByIdAndDelete({_id: taskId})
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
        const task = await Task.findByIdAndUpdate({_id: taskId}, updatedTask)
        return task
      }
      throw AuthenticationError
    },
    delReward: async (parent, {rewardId}, context)=>{
      if (context.user){
        return await Reward.findByIdAndDelete({_id: rewardId}) 
      }
    }
  },
};

module.exports = resolvers;
