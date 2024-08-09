import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import CreateTask from './pages/CreateTask.jsx'
import MyTasks from './pages/MyTasks.jsx'
import RewardsStrore from './pages/RewardsStore.jsx'


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
      }, {
        path: '/create',
        element: <CreateTask />
      }, {
        path: '/tasks',
        element: <MyTasks />
      }, {
        path: '/rewards',
        element: <RewardsStrore />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
