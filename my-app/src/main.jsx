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
import Dashboard from './components/Dashboard.jsx';
import React from "react";
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.jsx';
import { useEffect } from 'react';
import { useState } from 'react';

import { AppSidebar } from './components/ui/appsidebar.jsx';



const routerDefinitions = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} action = {loginAction}/>
      <Route path = "/oauth/callback" element = { <OAuthCallback/>} />
      <Route path = '/signup' element = { < SignUp/>} action = {signUpAction}/>
      <Route path = '/dashboard' element = { <Dashboard />} />

    </>
  )
);


function Root({}){
  const [defaultOpen, setDefaultOpen] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar_state="))
      ?.split("=")[1];

    setDefaultOpen(cookieValue === "true");
  }, []);

  return(
      <AuthProvider>
      <SidebarProvider defaultOpen = {defaultOpen}>
        
        <AppSidebar />
        <SidebarTrigger />

        <RouterProvider router={routerDefinitions} />
        <Toaster
          position="top-center"
          expand={true}
          richColors
        />
      </SidebarProvider>
    </AuthProvider>

  );

}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
)

