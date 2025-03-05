import React from 'react';

const CategorySection = () => {
	return (
		<div style={{
			width: '200px',
			backgroundColor: 'white',
			padding: '15px',
			marginTop: '20px'
		}}>
			<div style={{
				color: '#ee4d2d',
				fontWeight: '600',
				fontSize: '16px',
				marginBottom: '15px'
			}}>Danh Mục</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px',
				color: '#ee4d2d'
			}}>Sản Phẩm</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Thời Trang Nam</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Phụ Kiện & Trang Sức Nữ</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Thời Trang Nữ</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Túi Ví Nữ</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Balo & Túi Ví Nam</div>

			<div style={{
				padding: '10px 0',
				cursor: 'pointer',
				fontSize: '14px'
			}}>Thể Thao & Du Lịch</div>
		</div>
	);
};

export default CategorySection;