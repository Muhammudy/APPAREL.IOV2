import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Login from './components/Login.jsx';
import OAuthCallback from './components/OAuthCallback.jsx';
import { Toaster } from "sonner";
// import Register from './components/Register.jsx'; 
import './index.css'
import App from './App.jsx'
import SignUp from './components/SignUp.jsx';
import { signUpAction } from './components/SignUp.jsx';
import { loginAction } from './components/Login.jsx';
import ToastTest from './components/ToastTest.jsx';
import { AuthContext } from './components/Context/AuthContext.jsx';
import { AuthProvider } from './components/Context/AuthContext.jsx';


const routerDefinitions = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} action = {loginAction}/>
      <Route path = "/oauth/callback" element = { <OAuthCallback/>} />
      <Route path = '/signup' element = { < SignUp/>} action = {signUpAction}/>
      {/* <Route path = '/dashboard' element = { <Dashboard />} action = {dashboardAction} /> */}

    </>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>

    <RouterProvider router = {routerDefinitions}/>
    <Toaster
      position="top-center"
      expand={true}
      richColors
    />
    </AuthProvider>



  </StrictMode>
)
