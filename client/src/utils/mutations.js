import { gql } from '@apollo/client';

export const ADD_PARENT = gql`
  mutation addParent($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;


export const ADD_CHILD = gql`
mutation addChild($username: String!, $password: String!) {
  addChild(username: $username, password: $password) {
    token
    user {
      _id
      username
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

`

export const UPDATE_REWARD = gql`
  
`

export const DELETE_REWARD = gql`
  
`

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const DELTE_USER = gql`

`