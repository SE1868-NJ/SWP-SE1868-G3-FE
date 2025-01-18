import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Stack from '../components/Stack/index.jsx';

function Layout({ children }) {
	return (
		<Stack direction={`v`} gaps={5} className='min-vh-100'>
			<Header />
			{children}
			<Footer />
		</Stack>
	);
}

Layout.propTypes = {
	children: PropTypes.node,
};

export default Layout;
