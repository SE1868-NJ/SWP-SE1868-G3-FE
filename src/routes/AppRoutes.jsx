<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/Home";
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
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
=======
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
		],
	},
]);

function AppRoutes() {
	return <RouterProvider router={router} />;
>>>>>>> main
}

export default AppRoutes;
