import React from 'react';

const NavigationBar = () => {
	return (
		<div style={{
			display: 'flex',
			backgroundColor: 'white',
			borderBottom: '1px solid #f5f5f5',
			marginTop: '10px'
		}}>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px',
				color: '#ee4d2d',
				borderBottom: '2px solid #ee4d2d'
			}}>Đạo</div>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px'
			}}>TẤT CẢ SẢN PHẨM</div>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Thời Trang Nam</div>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Phụ Kiện & Trang Sức</div>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Thời Trang Nữ</div>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Túi Ví Nữ</div>
			<div style={{
				padding: '15px 20px',
				cursor: 'pointer',
				fontSize: '14px',
				display: 'flex',
				alignItems: 'center'
			}}>
				Thêm <i style={{ marginLeft: '5px' }}>▼</i>
			</div>
		</div>
	);
};

export default NavigationBar;