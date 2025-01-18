import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Layout({ children }) {
	return (
		<div className='vstack gap-5 min-vh-100'>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node,
};

export default Layout;
