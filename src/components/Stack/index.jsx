// import React from 'react';
import PropTypes from 'prop-types';

function Stack({ direction, className, children }) {
	if (direction !== 'v' || direction !== 'h') {
		throw new Error('Wrong value! (`h` or `v`))');
	}

	let configs = 'stack';
	if (direction) configs = `${direction + configs}`;
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

Stack.propTypes = {
	direction: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Stack;
