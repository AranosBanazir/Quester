import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import CreateTask from './pages/CreateTask';
import MyTasks from './pages/MyTasks';
import RewardsStore from './pages/RewardsStore';
import Parent from '../src/pages/ParentPage.jsx'
import Child from '../src/pages/ChildPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/create-task',
        element: <CreateTask />
      },
      {
        path: '/my-tasks',
        element: <MyTasks />
      },
      {
        path: '/rewards-store',

        element: <RewardsStore />
      },
      {
        path: '/parent',
        element: <Parent />
      }, {
        path: '/child',
        element: <Child />
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
