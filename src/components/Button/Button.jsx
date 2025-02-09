// import React from 'react';
import PropTypes from 'prop-types';

// props
// let props;

function Button({ color, shadow, children }) {
	let configs = 'btn';

	if (color) configs += ` btn-${color}`;
	if (shadow) configs += ` shadow`;

	return <button className={configs}>{children}</button>;
}

Button.propTypes = {
	color: PropTypes.string,
	children: PropTypes.node.isRequired,
	shadow: PropTypes.bool,
};

export default Button;
