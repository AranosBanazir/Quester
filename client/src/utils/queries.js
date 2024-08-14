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
query User($userId: ID!) {
  user(userId: $userId) {
    __typename
    ...on Parent{
      _id
      username
      kids {
        username
        _id
        wallet
      }

      rewards {
        _id
        cost
        name
        description
      }
    }
    ...on Child{
      _id
      username
      tasks {
        _id
        name
        description
        points
        owner
        childConfirmed
        parentConfirmed
      }
      inventory {
        _id
        cost
        name
        description
      }
      wallet
    }
  }
}
`;

export const ME = gql`
  query Me {
    me {
    __typename
      ...on Parent{
        username
        _id
      }

    ...on Child{
      username
      _id
    }
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
