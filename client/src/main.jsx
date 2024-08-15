import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'


import App from './App.jsx'
import Home from './pages/base-pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/base-pages/Error';
import CreateTask from './pages/base-pages/CreateTask';
import MyTasks from './pages/base-pages/MyTasks';
import RewardsStore from './pages/base-pages/RewardsStore';
import Rewards from './pages/base-pages/Rewards.jsx';
import ParentAccount from './pages/parent-pages/ParentAccount.jsx';
import KidsPage from './pages/parent-pages/KidsPage.jsx';
//TODO: need to expand the router to work with new pages
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
        element: <CreateTask/>
      },
      {
        path: '/tasks',
        element: <MyTasks/>
      },
      {
        path: '/rewards',
        element: <Rewards/>
      },
      {
        path: '/account',

        element: <ParentAccount/>
      },{
        path: '/kids',
        element: <KidsPage/>
      }
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
