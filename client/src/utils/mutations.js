import { gql } from '@apollo/client';

export const ADD_PARENT = gql`
  mutation addParent($username: String!, $email: String!, $password: String!) {
    addParent(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_CHILD = gql`
mutation addChild($username: String!, $password: String!) {
  addChild(username: $username, password: $password) {
    ...on Child {
      username
      _id
    }
  }
}
`



export const ADD_TASK = gql`
  mutation AddTask($task: TaskInput!) {
    addTask(task: $task) {
      _id
      name
      description
      points  
      owner
    }
  }
`

export const UPDATE_CHILD = gql`
  mutation UpdateChild($updatedChildInfo: ChildUpdateInput) {
    updateChild(updatedChildInfo: $updatedChildInfo) {
      ... on Parent {
        _id
        username
        email
        kids {
          username
        }
      }
      ... on Child {
        username
      }
    }
  }
`;

export const UPDATE_PARENT = gql`
  mutation UpdateParent($updatedParentInfo: ParentUpdateInput) {
    updateParent(updatedParentInfo: $updatedParentInfo) {
      ... on Parent {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: ID!, $updatedTask: TaskInput!) {
    updateTask(taskId: $taskId, updatedTask: $updatedTask) {
      name
      points
      description
      _id
    }
  }
`

export const CONFIRM_TASK = gql`
mutation ConfirmTaskComplete($taskId: ID!, $childId: ID!) {
  confirmTaskComplete(taskId: $taskId, childId: $childId) {
    childConfirmed
    parentConfirmed
  }
}
`

export const DELETE_TASK = gql`
 mutation DelTask($taskId: ID!) {
    delTask(taskId: $taskId) {
    _id
    name  
    }
  } 
`

export const ADD_REWARD = gql`
  mutation AddReward($reward: RewardInput!) {
    addReward(reward: $reward) {
      cost
      description
      name
      _id
    }
  }
`

export const BUY_REWARD = gql`
  mutation BuyReward($rewardId: ID!) {
    buyReward(rewardId: $rewardId) {
      _id
      name
    }
  }
`

export const CASH_IN_REWARD = gql`
  mutation CashInReward($rewardId: ID!){
    cashInReward(rewardId: $rewardId){
      _id
    }
  }
`


export const CONFIRM_REWARD = gql`
  mutation ConfirmRewardComplete($rewardId: ID!) {
    confirmRewardComplete(rewardId: $rewardId) {
      name
      childConfirmed
      parentConfirmed
    }
  }
`

export const DELETE_REWARD = gql`
 mutation DelReward($rewardId: ID!) {
    delReward(rewardId: $rewardId) {
    _id
    name  
    }
  }` 
  
export const UPDATE_REWARD = gql`
  mutation UpdateReward($rewardId: ID!, $updatedReward: RewardInput!) {
  updateReward(rewardId: $rewardId, updatedReward: $updatedReward) {
    _id
    cost
    name
    description
  }
}
`



export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const DELETE_USER = gql`
mutation RemoveUser($creds: UserInput!) {
  removeUser(creds: $creds) {
    ...on Parent{
      username
    }

    ...on Child {
      username
    }
  }
}
`