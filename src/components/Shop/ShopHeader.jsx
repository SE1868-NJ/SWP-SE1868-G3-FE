import React from 'react';

const ShopHeader = () => {
	return (
		<div style={{
			display: 'flex',
			padding: '15px',
			backgroundColor: 'white',
			borderBottom: '1px solid #f5f5f5'
		}}>
			<div style={{
				display: 'flex',
				alignItems: 'center'
			}}>
				<div style={{ marginRight: '15px' }}>
					<img src="https://down-tx-vn.img.susercontent.com/f8288c425d9891c4b3b92a7fc37e52e7_tn.webp" alt="KICHAELS" style={{
						width: '80px',
						height: '80px',
						borderRadius: '50%'
					}} />
				</div>
				<div>
					<h1 style={{
						margin: '0',
						fontSize: '20px',
						fontWeight: '600'
					}}>KICHAELS</h1>
					<p style={{
						color: '#888',
						margin: '5px 0',
						fontSize: '14px'
					}}>Online 4 phút trước</p>
					<button style={{
						padding: '6px 12px',
						borderRadius: '4px',
						cursor: 'pointer',
						fontSize: '14px',
						border: '1px solid #ee4d2d',
						backgroundColor: 'white',
						color: '#ee4d2d'
					}}>Yêu Thích</button>
				</div>
			</div>
			<div style={{
				display: 'flex',
				alignItems: 'center',
				marginLeft: '30px'
			}}>
				<button style={{
					padding: '6px 12px',
					borderRadius: '4px',
					cursor: 'pointer',
					fontSize: '14px',
					backgroundColor: 'white',
					color: '#222',
					border: '1px solid #ccc',
					margin: '0 10px'
				}}>
					<i style={{ marginRight: '5px' }}>+</i> Theo Dõi
				</button>
				<button style={{
					padding: '6px 12px',
					borderRadius: '4px',
					cursor: 'pointer',
					fontSize: '14px',
					backgroundColor: 'white',
					color: '#222',
					border: '1px solid #ccc',
					margin: '0 10px'
				}}>
					<i style={{ marginRight: '5px' }}>💬</i> Chat
				</button>
			</div>
			<div style={{
				marginLeft: 'auto',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
				gridGap: '10px'
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Sản Phẩm:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>74</span>
				</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Người Theo Dõi:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>28,2k</span>
				</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Đang Theo:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>0</span>
				</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Đánh Giá:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>4.4 (52,7k Đánh Giá)</span>
				</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Tỉ Lệ Phản Hồi Chat:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>98% (Trong Vài Giờ)</span>
				</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Tỉ Lệ Shop Hủy Đơn:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>2%</span>
				</div>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					fontSize: '14px'
				}}>
					<span style={{
						color: '#888',
						marginRight: '5px'
					}}>Tham Gia:</span>
					<span style={{
						color: '#ee4d2d',
						fontWeight: '500'
					}}>5 Năm Trước</span>
				</div>
			</div>
		</div>
	);
};

export default ShopHeader;