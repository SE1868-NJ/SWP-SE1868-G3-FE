import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import { authRoutes } from './modules/auth.routes';
import { shopRoutes } from './modules/shop.routes';
import { userRoutes } from './modules/user.routes';
import { homeRoute } from './modules/home.routes';
import { sellerRoutes } from './modules/seller.routes';
import SellerLayout from '../layout/SellerLayout';
import { supplierRoutes } from './modules/supplier.routes';
import { AuthProvider } from '../hooks/contexts/AuthContext';
import { orderDetailRoutes } from './modules/orderDetail.routes';
const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [...homeRoute, ...authRoutes, ...userRoutes, ...orderDetailRoutes],
	},
	{
		path: '/seller',
		element: <SellerLayout />,
		children: [...sellerRoutes, ...supplierRoutes, ...shopRoutes],
	},
];

const router = createBrowserRouter(routes);

function AppRoutes() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default AppRoutes;
