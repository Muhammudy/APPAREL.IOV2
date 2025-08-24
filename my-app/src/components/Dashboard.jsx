import React from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSideBar } from "./AppSideBar";
import { useEffect } from "react";
import { useState } from "react";
import { AppLayout } from "./AppLayOut";



function Dashboard({}){
const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar_state="))
      ?.split("=")[1];

    setDefaultOpen(cookieValue === "true");
  }, []);

//   useEffect(() => { use Effect for loggingout automatically kicks

//   },[]);
    return(
        <>
        <AppLayout></AppLayout>
        

        </>
    );



}


export default Dashboard;

