import PropTypes from 'prop-types';

function Header({ title, subtitle, showRequiredNote }) {
    return (
        <div className='mb-3'>
            <h2 className='fw-bold'>{title}</h2>
            <p className='text-muted fst-italic'>
                {subtitle} {showRequiredNote && <span> Các trường có dấu <span className="text-danger">*</span> là bắt buộc.</span>}
            </p>
        </div>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    showRequiredNote: PropTypes.bool
};

export default Header;
