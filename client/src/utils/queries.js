import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
    }
  }
`;

export const ME = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

/*Taken from in class example. Might need adjustments ~Nick*/


export const GET_TASKS = gql`
  query GetTasks{
    getTasks{
    _id
    name
    points
    description  
    }
  }
`

export const GET_REWARDS = gql`
  query GetRewards {
    getRewards {
      _id
      cost
      description
      name
    }
  }
`


export const QUERY_REWARDS = gql`
  query getRewards($rewards: ID) {
    rewards(reward: $reward) {
      _id
      name
      description
      points
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_REWARDS_CHECKOUT = gql`
  query getRewardsCheckout($rewards: [RewardInput]) {
    checkout(rewards: $rewards) {
      session
    }
  }
`;

export const QUERY_ALL_REWARDS = gql`
  {
    rewards {
      _id
      name
      image
      description
      points
      category {
        name
      }
    }
  }
`;
