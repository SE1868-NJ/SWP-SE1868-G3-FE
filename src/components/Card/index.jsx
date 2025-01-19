// import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

function Card({ className, children }) {
	let configs = 'card';
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

Card.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
