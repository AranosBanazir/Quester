const typeDefs = `
type Task {
  _id: ID!
  name: String!
  description: String!
  points: Number!
  owner: Child!
  deadline: Date
}  

type Reward {
  name: String!
  description: String
  cost: Number!
}

type Child {
    tasks: [Task]
    inventory: [Reward]
    wallet: Number
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
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeUser: User    
  }
`;

module.exports = typeDefs;
