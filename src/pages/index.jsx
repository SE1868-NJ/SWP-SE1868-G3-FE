import { Routes, Route } from 'react-router';
import Login from './Login';
import Products from './Products';
import Suppliers from './suppliers/Suppliers';
import AddSupplier from './suppliers/AddSupplier';
import EditSupplier from './suppliers/EditSupplier';
import ViewSupplier from './suppliers/ViewSupplier';
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
				<Route path='suppliers' element={<Suppliers />} />
				<Route path='/suppliers/add' element={<AddSupplier />} />
				<Route path='/suppliers/edit/:id' element={<EditSupplier />} />
				<Route path='/suppliers/view/:id' element={<ViewSupplier />} />
			</Routes>
		</Container>
	);
}

export default Pages;
