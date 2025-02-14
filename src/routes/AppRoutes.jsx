import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
import ListPage from "../pages/ListPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/listpage",
        element: <ListPage />,
      },
	  {
		path: '/profile',
		element: <Profile/>
    },
      			{
				path: '/cart',
                element: <Cart/>
			},
			{
				path: '/checkout',
				element: <Checkout/>
			}
    ],
  },

]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
