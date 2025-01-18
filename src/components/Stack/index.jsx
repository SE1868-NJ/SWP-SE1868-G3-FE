// import React from 'react';
import PropTypes from 'prop-types';

function Stack({ direction, gap, className, children }) {
	let configs = 'stack';
	if (direction) configs = direction + configs;
	if (gap) configs += ` gap-${gap}`;
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

Stack.propTypes = {
	direction: PropTypes.string,
	gap: PropTypes.number,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Stack;
