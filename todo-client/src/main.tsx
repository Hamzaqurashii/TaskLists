import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateTask from "./components/Create-Task.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        lazy: async () => {
          const Tasks = await import("./components/Tasks.tsx");
          return { Component: Tasks.default };
        },
      },
      {
        path: "/create-task",
        element: <CreateTask />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </React.StrictMode>
);
