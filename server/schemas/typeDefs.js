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
  _id: ID!
  name: String!
  description: String
  cost: Int!
}

type Child {
    _id: ID!
    username: String!
    tasks: [Task]
    inventory: [Reward]
    wallet: Int
}

input ChildInput {
    tasks: [TaskInput]
    inventory: [RewardInput]
    wallet: Int
}

input UserInput{
    username: String!
    password: String!
}
  
input ChildUpdateInput{
  oldUsername: String
  username: String
  password: String
  email: String
}

input ParentUpdateInput{
  username: String
  password: String
  email: String
}

type Parent {
    _id: ID!
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
  
  union UserTypes = User | Parent | Child


  type Query {
    users: [UserTypes]!
    user(userId: ID!): UserTypes
    getTasks: [Task]
    getRewards: [Reward]
    getInventory(userId: ID!): [Reward]
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: UserTypes
  }

  type Mutation {
    addParent(username: String!, email: String!, password: String!): Auth
    addChild(username: String!, password: String!): UserTypes
    updateChild(updatedChildInfo: ChildUpdateInput):UserTypes
    updateParent(updatedParentInfo: ParentUpdateInput): UserTypes
    removeUser(creds:UserInput!):UserTypes  


    addTask(task: TaskInput!): Task
    updateTask(taskId: ID!, updatedTask: TaskInput!): Task
    confirmTaskComplete(taskId: ID!, childId: ID!): Task
    delTask(taskId: ID!): Task
    denyTask(taskId: ID!): Task

    buyReward(rewardId: ID!): Reward
    addReward(reward: RewardInput!): Reward
    cashInReward(rewardId: ID!): Reward
    updateReward(rewardId: ID!, updatedReward: RewardInput!): Reward
    delReward(rewardId: ID!): Reward
    
    login(username: String!, password: String!): Auth

      
  }
`;

module.exports = typeDefs;