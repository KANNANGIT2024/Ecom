
import './App.css';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Admin/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';

import ProtectedRoute from './Utiles/isAuthenticated';
import Adduser from './Admin/addUser';
import Addtasks from './Admin/addTask';

import Header from './Components/Header';
import UserTable from './Admin/userTable';
import Tasktable from './Admin/Tasktable';
import Adminhome from './Admin/Home';
import UserProfile from './Components/UserProfile';
import TaskManager from './Components/Taskdetailes';
import Initialpage from './Utiles/Initialpage';
import Addproject from './Admin/addProject';
import Updatetask from './Admin/updateTask';
function App() {
    return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Initialpage/>} />
          <Route path='/login' element={<Login></Login>} />

          <Route path='/Register' element={<Register />} />
          <Route path='/UserProfile' element={<UserProfile></UserProfile>} />
          <Route path='/TaskManager' element={<TaskManager></TaskManager>} />


  
          {/* Protected Routes */}
          <Route 
            path="/Adminhome" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Adminhome></Adminhome>
              </ProtectedRoute>
            }
          >

            




            {/* Nested Routes */}
            <Route path="Adduser" element={<Adduser />} />
            <Route path="Addtask/:user" element={<Addtasks />} />
            <Route path="UserTable" element={<UserTable />} />
            <Route path="taskTable/:user" element={<Tasktable />} />
          </Route>
  
          {/* Admin Routes with protected routes */}
          <Route 
            path="/Adduser" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Adduser />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/UserTable" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserTable />
              </ProtectedRoute>
            } 
          />

<Route 
            path="/Addproject" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Addproject></Addproject>
              </ProtectedRoute>
            } 
          />



          <Route 
            path="/Addtask/:users/:username/:project/:projectid" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Addtasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/taskTable/:projectid/:users/:projectname" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Tasktable />
              </ProtectedRoute>
            } 
          />

<Route 
            path="/updatetask" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Updatetask></Updatetask>
              </ProtectedRoute>
            } 
          />
          




        </Routes>
      </Router>
    );
  }
  
  export default App;


  
// import './App.css';
// import { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Register from './Admin/Register';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Components/Login';

// import ProtectedRoute from './Utiles/isAuthenticated';
// import Adduser from './Admin/addUser';
// import Addtasks from './Admin/addTask';

// import Header from './Components/Header';
// import UserTable from './Admin/userTable';
// import Tasktable from './Admin/Tasktable';
// import Adminhome from './Admin/Home';
// import UserProfile from './Components/UserProfile';
// import TaskManager from './Components/Taskdetailes';
// function App() {
//     return (
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path='/' element={<Login />} />
//           <Route path='/Register' element={<Register />} />
//           <Route path='/UserProfile' element={<UserProfile></UserProfile>} />
//           <Route path='/TaskManager' element={<TaskManager></TaskManager>} />


  
//           {/* Protected Routes */}
//           <Route 
//             path="/Adminhome" 
//             element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <Adminhome></Adminhome>
//               </ProtectedRoute>
//             }
//           >
//             {/* Nested Routes */}
//             <Route path="Adduser" element={<Adduser />} />
//             <Route path="Addtask/:user" element={<Addtasks />} />
//             <Route path="UserTable" element={<UserTable />} />
//             <Route path="taskTable/:user" element={<Tasktable />} />
//           </Route>
  
//           {/* Admin Routes with protected routes */}
//           <Route 
//             path="/Adduser" 
//             element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <Adduser />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/UserTable" 
//             element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <UserTable />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/Addtask/:user" 
//             element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <Addtasks />
//               </ProtectedRoute>
//             } 
//           />
//           <Route 
//             path="/taskTable/:user" 
//             element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <Tasktable />
//               </ProtectedRoute>
//             } 
//           />
//         </Routes>
//       </Router>
//     );
//   }
  
//   export default App;
