// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { ME } from '../utils/queries'
// import { Navigate } from 'react-router-dom';
import Child from './ChildPage'
import Parent from './ParentPage'



const Home = () => {
  return (
    <main>
      <Child/>
      <Parent/>
    </main>
  );
};
export default Home;




// const Redirect = () => {
//   const {data} = useQuery(ME)
  


//   if (ME) {
//      switch (ME) {
//       case 'Parent':
//         return <Navigate to="/Parent" />
//       case 'Child':
//         return <Navigate to="/Child" />
//       default:
//         return (
//           <main>
//             <div className="flex-row justify-center">
//               <div className="col-12 col-md-10 my-3">
//                 <h1>Home</h1>
//                 <h1>task page</h1>
//               </div>
//             </div>
//           </main>
//         );
//      }
//   }
// }


