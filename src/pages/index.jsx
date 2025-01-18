import { Routes, Route } from 'react-router';
import Login from './Login';
import Test from './Test';
import Container from '../components/Container';

function Pages() {
	return (
		<Container fluid={`lg`}>
			<Routes>
				<Route path='/' element={<h1>Home</h1>} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<h1>SignUp</h1>} />
				<Route path='test' element={<Test />} />
			</Routes>
		</Container>
	);
}

export default Pages;
