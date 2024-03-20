import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
// import UsersLayout from "./layouts/UsersLayout";
import HomePage from "./Pages/Home/HomePage";
import UsersPage from "./Pages/Users/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/users",
        element: <UsersPage />,
      },
    ],
  },
]);

export default router;
