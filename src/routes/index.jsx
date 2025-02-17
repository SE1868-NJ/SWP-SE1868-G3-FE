import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import { authRoutes } from './modules/auth.routes';
import { shopRoutes } from './modules/shop.routes';
import { userRoutes } from './modules/user.routes';
import { homeRoute } from './modules/home.routes';
// import { mainRoutes } from "./main.routes";

const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [...homeRoute, ...authRoutes, ...shopRoutes, ...userRoutes],
	},
];

const router = createBrowserRouter(routes);

function AppRoutes() {
	return <RouterProvider router={router} />;
}

export default AppRoutes;
