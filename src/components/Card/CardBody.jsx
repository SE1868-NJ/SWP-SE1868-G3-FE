// import React from 'react'
import PropTypes from 'prop-types';

function CardBody({ className, children }) {
	let configs = 'card-body';
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

CardBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export default CardBody;
