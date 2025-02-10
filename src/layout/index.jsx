import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Stack from '../components/Stack/index.jsx';
import { Outlet } from 'react-router';
import Container from '../components/Container';

function Layout() {
	return (
		<Stack direction={`v`} gap={5} className='min-vh-100'>
			<Header />
			<Container fluid={`lg`}>
				<Outlet />
			</Container>
			<Footer />
		</Stack>
	);
}

export default Layout;