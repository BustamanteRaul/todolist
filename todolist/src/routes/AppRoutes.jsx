import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompletedScreen from "../pages/CompletedScreen";
import HomeScreen from "../pages/HomeScreen";
import Login from "../pages/Login";
import PendingScreen from "../pages/PendingScreen";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/HomeScreen",
    element: <HomeScreen />,
  },
  {
    path: "/PendingScreen",
    element: <PendingScreen />,
  },
  {
    path: "/CompletedScreen",
    element: <CompletedScreen />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
