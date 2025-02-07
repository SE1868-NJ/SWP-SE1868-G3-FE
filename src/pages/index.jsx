import { Routes, Route } from 'react-router';
import Login from './Login';
import Products from './Products';
import Container from '../components/Container';
import Signup from './Signup';

function Pages() {
	return (
		<Container fluid={`lg`}>
			<Routes>
				<Route path='/' element={<h1>Home</h1>} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='products' element={<Products />} />
			</Routes>
		</Container>
	);
}

export default Pages;
