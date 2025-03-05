import React from 'react';

const Banner = () => {
	return (
		<div style={{ marginTop: '20px' }}>
			<div style={{ position: 'relative' }}>
				<img src="https://down-tx-vn.img.susercontent.com/vn-11134210-7ras8-m5tidy3unpo834.webp" alt="Shop Banner" style={{
					width: '100%',
					maxHeight: '300px',
					objectFit: 'cover'
				}} />
				<div style={{
					position: 'absolute',
					bottom: '15px',
					left: '50%',
					transform: 'translateX(-50%)',
					display: 'flex'
				}}>
					<span style={{
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						backgroundColor: '#ee4d2d',
						margin: '0 5px'
					}}></span>
					<span style={{
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
						margin: '0 5px'
					}}></span>
					<span style={{
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						backgroundColor: 'rgba(255, 255, 255, 0.5)',
						margin: '0 5px'
					}}></span>
				</div>
			</div>
			<div style={{
				display: 'flex',
				marginTop: '20px',
				gap: '10px'
			}}>
				<div style={{
					flex: '1',
					backgroundColor: '#fff6f6',
					border: '1px solid #ffcdd2',
					borderRadius: '4px',
					padding: '15px',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<div>
						<div style={{
							color: '#ee4d2d',
							fontWeight: '600',
							fontSize: '16px'
						}}>Giảm 10%</div>
						<div style={{
							marginTop: '5px',
							fontSize: '14px'
						}}>Đơn Tối Thiểu ₫49k Giảm tối đa ₫20k</div>
						<div style={{
							color: '#888',
							fontSize: '12px',
							marginTop: '5px'
						}}>HSD: 14.03.2025</div>
					</div>
					<button style={{
						backgroundColor: '#ee4d2d',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						padding: '8px 15px',
						alignSelf: 'center',
						cursor: 'pointer'
					}}>Lưu</button>
				</div>
				<div style={{
					flex: '1',
					backgroundColor: '#fff6f6',
					border: '1px solid #ffcdd2',
					borderRadius: '4px',
					padding: '15px',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<div>
						<div style={{
							color: '#ee4d2d',
							fontWeight: '600',
							fontSize: '16px'
						}}>Giảm ₫6k</div>
						<div style={{
							marginTop: '5px',
							fontSize: '14px'
						}}>Đơn Tối Thiểu ₫0</div>
						<div style={{
							display: 'inline-block',
							backgroundColor: '#f5f5f5',
							borderRadius: '4px',
							padding: '3px 8px',
							fontSize: '12px',
							marginTop: '5px'
						}}>Sản phẩm nhất định</div>
						<div style={{
							color: '#888',
							fontSize: '12px',
							marginTop: '5px'
						}}>HSD: 04.04.2025</div>
					</div>
					<button style={{
						backgroundColor: '#ee4d2d',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						padding: '8px 15px',
						alignSelf: 'center',
						cursor: 'pointer'
					}}>Lưu</button>
				</div>
				<div style={{
					flex: '1',
					backgroundColor: '#fff6f6',
					border: '1px solid #ffcdd2',
					borderRadius: '4px',
					padding: '15px',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
					<div>
						<div style={{
							color: '#ee4d2d',
							fontWeight: '600',
							fontSize: '16px'
						}}>Giảm ₫1k</div>
						<div style={{
							marginTop: '5px',
							fontSize: '14px'
						}}>Đơn Tối Thiểu ₫0</div>
						<div style={{
							display: 'inline-block',
							backgroundColor: '#f5f5f5',
							borderRadius: '4px',
							padding: '3px 8px',
							fontSize: '12px',
							marginTop: '5px'
						}}>Sản phẩm nhất định</div>
						<div style={{
							color: '#888',
							fontSize: '12px',
							marginTop: '5px'
						}}>HSD: 30.05.2025</div>
					</div>
					<button style={{
						backgroundColor: '#ee4d2d',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						padding: '8px 15px',
						alignSelf: 'center',
						cursor: 'pointer'
					}}>Lưu</button>
				</div>
			</div>
		</div>
	);
};

export default Banner;