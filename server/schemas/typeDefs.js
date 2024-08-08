const typeDefs = `
type Task {
  _id: ID!
  name: String!
  description: String!
  points: Int!
  owner: Child!
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
    owner: ChildInput
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
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation {
    addParent(username: String!, email: String!, password: String!): Auth
    addChild(username: String!, password: String!): Auth

    addTask(name: String!, description: String!, points: Int!, owner: ChildInput!): Task
    updateTask(taskId: ID!, updateInput: TaskInput!): Task
    delTask(taskId: ID!): Task

    addReward(name: String!, description: String, const: Int!): Reward
    updateReward(rewardId: ID!, rewardInput: RewardInput!): Reward
    delReward(rewardId: ID!): Reward


    login(username: String!, password: String!): Auth

    removeUser: User    
  }
`;

module.exports = typeDefs;
