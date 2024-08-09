const { BaseUser, Reward, Task, Child, Parent } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return BaseUser.find();
    },

    user: async (parent, { userId }) => {
      return BaseUser.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return BaseUser.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    getTasks: async (parent, args, context)=>{
      if (context.user){
        let tasks = []
        const user = await Child.findById({_id: userId}, 'tasks')
        console.log(user)
        return user
      }
      throw AuthenticationError
    },
    getRewards: async (parent, args, context)=>{
      if (context.user){
        const user = await BaseUser.findById({_id: context.user._id})
        if (user.__t === 'Child'){
          const parent = await Parent.find({kids: {$elemMatch: {$eq: context.user._id}}}, 'rewards')
          for (const p of parent){
            return p.rewards 
          }
        }else if (user.__t === 'Parent'){
          return user.rewards
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
    addChild: async (parent, { name, password }, context) => {
      if (context.user){
        const child = await Child.create({username, password})
        const parent = await Parent.findByIdAndUpdate({_id: context.user._id}, {
          $addToSet: {kids: child}
        })        

        const token = signToken(user);
        return { token, user };
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
    //TODO Consider changing this to allow parent to delete their kids as well...
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  
    addTask: async (parent, {task}, context) =>{
      if (context.user){
        const newTask = await Task.create(task)
        console.log(newTask)
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
