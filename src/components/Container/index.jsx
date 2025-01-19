// import React from 'react'
import PropTypes from 'prop-types';

function Container({ fluid, className, children }) {
	let configs = 'container';

	if (fluid) configs += `${configs}-fluid container-${fluid}`;
	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

Container.propTypes = {
	fluid: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Container;
