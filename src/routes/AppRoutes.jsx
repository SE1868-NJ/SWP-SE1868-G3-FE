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
}

export default AppRoutes;
