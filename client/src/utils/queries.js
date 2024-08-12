import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
    }
  }
`;

/*Taken from in class example. Might need adjustments ~Nick*/

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
