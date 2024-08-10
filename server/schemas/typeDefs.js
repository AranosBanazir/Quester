const typeDefs = `
type Task {
  _id: ID!
  name: String!
  description: String!
  points: Int!
  owner: ID!
  childConfirmed: Boolean
  parentConfirmed: Boolean
}  

type Reward {
  name: String!
  description: String
  cost: Int!
}

type Child {
    tasks: [Task]
    inventory: [Reward]
    wallet: Int
}

input ChildInput {
    tasks: [TaskInput]
    inventory: [RewardInput]
    wallet: Int
}

type Parent {
    username: String!
    email: String!
    password: String!
    rewards: [Reward]
    kids: [Child]
}

type User {
    _id: ID
    username: String!
    password: String!
  }

  input TaskInput {
    name: String
    description: String
    points: Int
    owner: ID!
  }

  input RewardInput {
    name: String
    description: String
    cost: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    getTasks: [Task]
    getRewards: [Reward]
    getInventory(userId: ID!): [Reward]
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation {
    addParent(username: String!, email: String!, password: String!): Auth
    addChild(username: String!, password: String!): Auth

    addTask(task: TaskInput!): Task
    updateTask(taskId: ID!, updatedTask: TaskInput!): Task
    confirmTaskComplete(taskId: ID!): Task
    delTask(taskId: ID!): Task

    addReward(reward: RewardInput!): Reward
    updateReward(rewardId: ID!, updatedReward: RewardInput!): Reward
    delReward(rewardId: ID!): Reward

    login(username: String!, password: String!): Auth

    removeUser: User    
  }
`;

module.exports = typeDefs;
