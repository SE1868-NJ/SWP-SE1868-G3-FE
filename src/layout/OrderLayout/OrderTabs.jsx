import React from 'react';
import { useOrderContext } from '../../hooks/contexts/OrderContext';

const OrderTabs = () => {
	const { status, handleStatusChange } = useOrderContext();

	return (
		<div className='bg-white mb-3'>
			<ul
				className='nav nav-tabs border-0 container nav-justified'
				style={{ display: 'flex' }}
			>
				{[
					{ key: 'all', label: 'Tất cả' },
					{ key: 'PENDING', label: 'Chờ thanh toán' },
					{ key: 'COMPLETED', label: 'Hoàn thành' },
					{ key: 'CANCELLED', label: 'Đã hủy' },
				].map((tab) => (
					<li key={tab.key} className='nav-item flex-fill'>
						<button
							className={`nav-link ${status === tab.key ? 'active' : ''}`}
							onClick={() => handleStatusChange(tab.key)}
							style={{
								width: '100%',
								color: '#000',
								fontWeight: 'bold',
							}}
						>
							{tab.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default OrderTabs;
