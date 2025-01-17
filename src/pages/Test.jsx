import Col from '../components/Grid/Col';
import Row from '../components/Grid/Row';

function Test() {
	return (
		<Row cols={1} lg={4}>
			<Col>col</Col>
			<Col>col</Col>
			<Col>col</Col>
			<Col>col</Col>
		</Row>
	);
}

export default Test;
