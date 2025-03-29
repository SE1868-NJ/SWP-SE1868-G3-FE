import Login from '../../pages/AuthPages/Login';
import Signup from '../../pages/AuthPages/Signup';

export const authRoutes = [
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
];
