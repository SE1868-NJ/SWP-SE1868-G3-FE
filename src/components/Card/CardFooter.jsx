// import React from 'react'
import PropTypes from 'prop-types';

function CardFooter({ className, children }) {
	let configs = 'card-footer';
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

CardFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default CardFooter;
