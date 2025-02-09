import { Routes, Route } from 'react-router';
import Login from './Login';
import Test from './Test';
import Profile from './Profile';
import Container from '../components/Container';
import Signup from './Signup';

function Pages() {
	return (
		<Container fluid={`lg`}>
			<Routes>
				<Route path='/' element={<h1>Home</h1>} />
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<Signup />} />
				<Route path='test' element={<Test />} />
				<Route path='profile' element={<Profile />} />

			</Routes>
		</Container>
	);
}

export default Pages;
