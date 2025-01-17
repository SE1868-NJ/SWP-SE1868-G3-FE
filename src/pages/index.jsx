import { Routes, Route } from 'react-router';
import Login from './Login';
import Test from './Test';

function Pages() {
	return (
		<div className='container-fluid container-lg my-5'>
			<Routes>
				<Route path='/' element={<h1>Home</h1>} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<h1>SignUp</h1>} />
				<Route path='/test' element={<Test />} />
			</Routes>
		</div>
	);
}

export default Pages;
