import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Login from './components/Login.jsx';
// import Register from './components/Register.jsx'; 
import './index.css'
import App from './App.jsx'


const routerDefinitions = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {routerDefinitions}/>


  </StrictMode>
)
