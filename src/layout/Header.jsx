// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Container from '../components/Container';
import React, { useState } from 'react';
import { useAuth } from '../hooks/contexts/AuthContext';
function Header() {
  const { cartCount } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <div className='shadow-sm'>
      <nav className='bg-danger'>
        <div className='container d-flex py-2 flex-wrap border-bottom border-light'>
          <ul className='nav me-auto'>
            <li className='nav-item'>
              <Link
                to='/home'
                className='nav-link link-body-emphasis px-2 ps-0 active text-light'
                aria-current='page'
              >
                Kênh người bán
              </Link>
            </li>
            <li className='nav-link px-0 text-light'>|</li>
            <li className='nav-item'>
              <Link
                to='/feature'
                className='nav-link link-body-emphasis px-2 text-light'
              >
                Trở thành người bán
              </Link>
            </li>
          </ul>
          <ul className='nav'>
            <li className='nav-item'>
              <a
                className='nav-link dropdown-toggle link-body-emphasis px-2 text-light'
                role='button'
                data-bs-toggle='dropdown'
              >
                Tài khoản
              </a>
              <ul className='dropdown-menu dropdown-menu-end border-0 shadow-sm bg-body-tertiary'>
                <li>
                  <Link to='/purchase' className='dropdown-item'>
                    Đơn mua
                  </Link>
                </li>
                <li className='dropdown-item'>
                  <hr className='m-0 p-0' />
                </li>
                <li>
                  <Link to='profile' className='dropdown-item'>
                    Tài khoản của tôi
                  </Link>
                </li>
                <li className='dropdown-item'>
                  <hr className='m-0 p-0' />
                </li>
                <li>
                  <Link to='/logout' className='dropdown-item'>
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </li>
            <li className='nav-link px-0 text-light'>|</li>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-link link-body-emphasis px-2 text-light'
              >
                Đăng nhập
              </Link>
            </li>
            <li className='nav-link px-0 text-light'>|</li>
            <li className='nav-item'>
              <Link
                to='/signup'
                className='nav-link link-body-emphasis px-2 pe-0 text-light'
              >
                Đăng ký
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <header className='py-3 border-bottom bg-danger'>
        <div className='container d-flex flex-wrap justify-content-center'>
          <Link
            to='/'
            className='d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none text-light'
          >
            <i
              className='bi bi-bag-heart-fill me-2'
              style={{ fontSize: '1.5rem' }}
            />
            <span className='fs-4 fw-bold'>Chợ Làng</span>
          </Link>

          <form
            className='col-12 col-lg-auto mb-3 mb-lg-0'
            role='search'
            onSubmit={handleSearch}
          >
            <div className='hstack gap-2'>
              <div className='input-group'>
                <input
                  type='search'
                  className='form-control border-0'
                  style={{ boxShadow: 'none' }}
                  placeholder='Tìm kiếm...'
                  aria-label='Search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type='button' className='btn bg-white border-0'>
                  <i className='bi bi-search' />
                </button>
              </div>
              <Link
                to='/order/cart'
                className='btn btn-outline-light border-2 position-relative'
              >
                <i className='bi bi-basket-fill' />
                {cartCount > 0 && (
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                    {cartCount}
                    <span className='visually-hidden'>items in cart</span>
                  </span>
                )}
              </Link>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Header;
