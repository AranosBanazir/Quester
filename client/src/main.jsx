import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import CreateTask from './pages/CreateTask';
import MyTasks from './pages/MyTasks';
import RewardsStore from './pages/RewardsStore';



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
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:userId',
        element: <Profile />
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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
