import Container from '../components/Container';

function Footer() {
	return (
		<footer className='bg-body-tertiary border-1 border-top mt-auto'>
			<Container fluid={'lg'}>
				<div className='w-100 text-center py-3'>
					© 2025 Chợ Làng. Tất cả các quyền được bảo lưu.
				</div>
			</Container>
		</footer>
	);
}

export default Footer;
