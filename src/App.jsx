import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createBrowserRouter, Outlet } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            {" "}
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

export default App;
