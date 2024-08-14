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
  mutation ConfirmTaskComplete($taskId: ID!) {
    confirmTaskComplete(taskId: $taskId) {
      name
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
    }
  }
`

export const BUY_REWARD = gql`
  mutation BuyReward($rewardId: ID!, $userId: ID!) {
    buyReward(rewardId: $rewardId, userId: $userId) {
      _id
      name
    }
  }
`

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

export const DELETE_REWARD = gql`
  mutation DelReward($rewardId: ID!) {
  delReward(rewardId: $rewardId) {
  _id
  name  
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

export const DELTE_USER = gql`
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