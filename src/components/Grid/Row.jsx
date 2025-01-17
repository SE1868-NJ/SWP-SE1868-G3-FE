import PropTypes from 'prop-types';

function Row({ cols, sm, md, lg, xl, className, children }) {
	let configs = 'row';

	if (cols) configs += ` row-cols-${cols}`;
	if (sm) configs += ` row-cols-sm-${sm}`;
	if (md) configs += ` row-cols-md-${md}`;
	if (lg) configs += ` row-cols-lg-${lg}`;
	if (xl) configs += ` row-cols-xl-${xl}`;

	if (className) configs += ` ${className}`;

	return <div className={configs}>{children}</div>;
}

Row.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	cols: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
};

export default Row;
