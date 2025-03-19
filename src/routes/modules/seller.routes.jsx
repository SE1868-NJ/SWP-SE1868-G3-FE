// import { Navigate } from 'react-router-dom';
import ShopInfoPage from '../../pages/SellerPages/Shop/ShopInfoPage';

export const sellerRoutes = [
	{
		path: '/seller',
		// element: <Navigate to={'/seller/login'} />,
		element: <span>Seller</span>,
	},
	// {
	// 	path: '/login',
	// 	// element: <SellerLogin />,
	// },
	{
		path: '/seller/shop-info',
		element: <ShopInfoPage />,
	},
];
