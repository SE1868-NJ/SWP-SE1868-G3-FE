import { Navigate } from 'react-router-dom';

function Home() {
	return <Navigate to={'/list_page'} />;
}
export default Home;
