import React from "react";
import { SidebarProvider } from "./ui/sidebar";
import { AppSideBar } from "./AppSideBar";
import { AppLayout } from "./AppLayOut";

function Dashboard() {
  return (

        <div className="flex bg-black">
          {/* Sidebar */}
          <AppSideBar />

          {/* Main content */}
          <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            {/* Greeting / Summary */}
            <section className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Hello, Yousuf!</h1>
              <p className="text-gray-600">Here’s what’s happening today:</p>
            </section>

            {/* Key Metrics / KPIs */}
            <section className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">Metric 1</div>
              <div className="bg-white p-4 rounded shadow">Metric 2</div>
              <div className="bg-white p-4 rounded shadow">Metric 3</div>
            </section>

            {/* Charts */}
            <section className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow h-64">Chart 1</div>
              <div className="bg-white p-4 rounded shadow h-64">Chart 2</div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
              <ul className="text-gray-700">
                <li>Activity 1</li>
                <li>Activity 2</li>
                <li>Activity 3</li>
              </ul>
            </section>
          </div>
        </div>
  );
}

export default Dashboard;
