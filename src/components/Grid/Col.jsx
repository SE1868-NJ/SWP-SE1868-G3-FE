import PropTypes from 'prop-types';

function Col({ col, sm, md, lg, xl, className, children }) {
	let configs = 'col';

	if (col) configs += ` col-${col}`;
	if (sm) configs += ` col-sm-${sm}`;
	if (md) configs += ` col-md-${md}`;
	if (lg) configs += ` col-lg-${lg}`;
	if (xl) configs += ` col-xl-${xl}`;

	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

Col.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	col: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
};

export default Col;
