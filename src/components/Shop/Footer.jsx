import React from 'react';

const Footer = () => {
	return (
		<div style={{ backgroundColor: '#333', color: '#fff', padding: '20px', marginTop: '20px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
				<div>
					<h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Thông Tin Liên Hệ</h4>
					<p>Địa chỉ: 123 Đường ABC, TP. HCM</p>
					<p>Điện thoại: 0123 456 789</p>
					<p>Email: contact@example.com</p>
				</div>
				<div>
					<h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Liên Kết</h4>
					<ul style={{ listStyle: 'none', padding: 0 }}>
						<li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Về Chúng Tôi</a></li>
						<li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Chính Sách</a></li>
						<li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Hỗ Trợ</a></li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;