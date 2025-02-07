import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getProducts } from '../api';

function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		getProducts().then((response) => {
			setProducts(response.data.products);
			console.log(response.data);
		});
	}, []);

	return (
		<Card>
			<Card.Header className={`d-flex gap-2`}>
				<input
					type='search'
					name='search'
					className='form-control'
					placeholder='Search'
				/>
				<button type='submit' className='btn btn-danger'>
					Search
				</button>
			</Card.Header>
			<Card.Body>
				<table className='table'>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>First</th>
							<th scope='col'>Last</th>
							<th scope='col'>Handle</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => (
							<tr key={index}>
								<th scope='row'>{product.id}</th>
								<td>{product.title}</td>
								<td>{product.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card.Body>
		</Card>
	);
}

export default Products;
