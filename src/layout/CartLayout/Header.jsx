import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useAuthActions } from "../../hooks/contexts/AuthContext";

function Header() {
  const { user, isAuthenticated } = useAuth();
  const { logoutAndRedirect } = useAuthActions();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutAndRedirect('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <div className="shadow-sm">
      {/* Thanh trên cùng */}
      <nav className="bg-danger">
        <div className="container d-flex py-2 flex-wrap border-bottom border-light">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link to="/seller" className="nav-link text-light px-2 ps-0 active">
                Kênh người bán
              </Link>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light px-2"
                role="button"
                data-bs-toggle="dropdown"
              >
                {user?.name || 'Tài khoản'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm bg-body-tertiary">
                <li>
                  <Link to="/purchase" className="dropdown-item">
                    Đơn mua
                  </Link>
                </li>
                <li><hr className="dropdown-divider m-0 p-0" /></li>
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Tài khoản của tôi
                  </Link>
                </li>
                <li><hr className="dropdown-divider m-0 p-0" /></li>
                <li>
                  <a onClick={handleLogout} className="dropdown-item" href="#">
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Thanh logo + tìm kiếm */}
      <div className="py-3 border-bottom bg-danger">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <i className="bi bi-bag-heart-fill text-light me-2" style={{ fontSize: '1.5rem' }}></i>
              <span className="fs-4 fw-bold text-light">Chợ Làng</span>
            </Link>
            <h5 className="ms-3 mb-0 text-light">| Giỏ Hàng</h5>
          </div>
          <form className="col-12 col-lg-auto mb-lg-0" role="search" onSubmit={handleSearch} style={{ maxWidth: "600px" }}>
            <div className="input-group">
              <input
                type="search"
                className="form-control border-0"
                style={{ boxShadow: 'none' }}
                placeholder="Tìm sản phẩm, tên shop..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn bg-white border-0">
                <i className="bi bi-search text-danger"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;