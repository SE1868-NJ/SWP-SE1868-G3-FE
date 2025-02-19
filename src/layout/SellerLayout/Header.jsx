// import React from 'react';
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top border-bottom border-1">
      <div className="container-fluid">
        <div className="navbar-brand">Kênh Người Bán</div>
        <div className="d-inline-flex">
          <button
            type="button"
            className="navbar-toggler border-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            style={{ boxShadow: '0' }}
          >
            <i className="navbar-toggler-icon"></i>
          </button>
          <Link to={'/profile'} className="btn btn-danger">
            Trang cá nhân
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
