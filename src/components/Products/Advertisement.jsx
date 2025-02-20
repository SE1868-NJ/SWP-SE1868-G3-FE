import PropTypes from 'prop-types';

const Advertisement = ({ images }) => {
	return (
		<div id='ads' className='carousel slide' data-bs-ride='carousel'>
			<div className='carousel-inner'>
				{images.map((image, index) => (
					<div
						className={`carousel-item ${index === 0 ? 'active' : ''}`}
						key={index}
					>
						<div className='w-100' style={{ height: '20rem' }}>
							<img
								src={image}
								className='d-block w-100 h-100 object-fit-cover'
								alt={`Slide ${index}`}
								style={{ width: '100%', objectFit: 'cover' }}
							/>
						</div>
					</div>
				))}
			</div>
			<button
				className='carousel-control-prev'
				type='button'
				data-bs-target='#ads'
				data-bs-slide='prev'
			>
				<span className='carousel-control-prev-icon' aria-hidden='true' />
				<span className='visually-hidden'>Previous</span>
			</button>
			<button
				className='carousel-control-next'
				type='button'
				data-bs-target='#ads'
				data-bs-slide='next'
			>
				<span className='carousel-control-next-icon' aria-hidden='true' />
				<span className='visually-hidden'>Next</span>
			</button>
		</div>
	);
};

Advertisement.propTypes = {
	images: PropTypes.array,
};

export default Advertisement;
