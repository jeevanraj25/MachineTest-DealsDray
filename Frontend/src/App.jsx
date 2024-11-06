import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom'
import Login from './Componets/Login'
import Home from './pages/Home'
import EmployeeList from './Componets/EmployeeList'
import CreateEmployee from './Componets/CreateEmployee'
import NavBar from './Componets/NavBar'
import { Edit } from 'lucide-react'
import EditEmployee from './Componets/EditEmployee'

function AppLayout() {
  return (
    <div>
      <NavBar />
      <div className="pt-16"> 
        <Outlet /> 
      </div>
    </div>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '', element: <Navigate to="/home" /> },
        { path: 'home', element: <Home /> },
        { path: 'employee', element: <EmployeeList/> },
        { path: 'add-employee', element: <CreateEmployee /> },
        { path: 'edit-employee/:id', element: <EditEmployee/> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
