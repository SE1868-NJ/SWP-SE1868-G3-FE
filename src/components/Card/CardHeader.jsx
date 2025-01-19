// import React from 'react'
import PropTypes from 'prop-types';

function CardHeader({ className, children }) {
	let configs = 'card-header';
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

CardHeader.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default CardHeader;
