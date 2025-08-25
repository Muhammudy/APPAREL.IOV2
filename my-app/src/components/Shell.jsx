import React from "react";
import { AppLayout } from "./AppLayOut";
import { Outlet } from "react-router";


function Shell({}){

    return(
        <AppLayout>
            <Outlet>

            </Outlet>
        </AppLayout>

    );



}

export default Shell;