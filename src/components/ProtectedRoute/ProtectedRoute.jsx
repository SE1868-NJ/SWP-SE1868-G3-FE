import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="d-flex justify-content-center p-5">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Đang tải...</span>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return children;
};

ProtectedRoute.propTypes = {
	children: PropTypes.node,
};

export default ProtectedRoute;