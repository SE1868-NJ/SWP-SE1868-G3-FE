import React from 'react';

function VoucherHeader({ title, subtitle, showRequiredNote = false }) {
	return (
		<div className='mb-3'>
			<h2 className='fw-bold'>{title}</h2>
			<p className='text-muted fst-italic'>
				{subtitle} {showRequiredNote && <span> Các trường có dấu <span className="text-danger">*</span> là bắt buộc.</span>}
			</p>
		</div>
	);
}

export default VoucherHeader;