import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import CartLayout from "../layout/CartLayout/";
import { authRoutes } from './modules/auth.routes';
import { shopRoutes } from './modules/shop.routes';
import { userRoutes } from './modules/user.routes';
import { homeRoute } from './modules/home.routes';
import { orderRoutes } from './modules/order.routes';
import { sellerRoutes } from './modules/seller.routes';
import SellerLayout from '../layout/SellerLayout';
import { supplierRoutes } from './modules/supplier.routes';
import { voucherRoutes } from './modules/voucher.routes';
import { AuthProvider } from '../hooks/contexts/AuthContext';

const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [...homeRoute, ...authRoutes, ...userRoutes],
	},
	{
		path: '/seller',
		element: <SellerLayout />,
		children: [...sellerRoutes, ...supplierRoutes, ...shopRoutes, ...voucherRoutes],
	},
	{
		path: "/order",
		element: <CartLayout />,
		children: orderRoutes,
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
