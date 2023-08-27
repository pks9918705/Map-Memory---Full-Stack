import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import CustomAuthContext from './context/authContext';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: < App/>,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  } 

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  < CustomAuthContext>
    <RouterProvider router={router} />
    
  </CustomAuthContext>
);








