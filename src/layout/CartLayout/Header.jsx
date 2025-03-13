import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="shadow-sm">
      {/* Thanh trên cùng */}
      <nav className="bg-danger">
        <div className="container d-flex py-2 flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link to="/home" className="nav-link text-light px-2 ps-0 active">
                Kênh người bán
              </Link>
            </li>
            <li className="nav-link px-0 text-light">|</li>
            <li className="nav-item">
              <Link to="/feature" className="nav-link text-light px-2">
                Trở thành người bán
              </Link>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-light px-2 dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Tài khoản
              </a>
              <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm bg-body-tertiary">
                <li>
                  <Link to="/purchase" className="dropdown-item">
                    Đơn mua
                  </Link>
                </li>
                <li className="dropdown-item">
                  <hr className="m-0 p-0" />
                </li>
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Tài khoản của tôi
                  </Link>
                </li>
                <li className="dropdown-item">
                  <hr className="m-0 p-0" />
                </li>
                <li>
                  <Link to="/logout" className="dropdown-item">
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-link px-0 text-light">|</li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-light px-2">
                Đăng nhập
              </Link>
            </li>
            <li className="nav-link px-0 text-light">|</li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link text-light px-2 pe-0">
                Đăng ký
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Thanh logo + tìm kiếm */}
      <div className="container py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Link to="/" className="text-decoration-none text-dark d-flex align-items-center">
            <i className="bi bi-bag-heart-fill text-danger me-2 fs-3"></i>
            <h4 className="fw-bold text-danger mb-0">Chợ Làng</h4>
          </Link>
          <h5 className="ms-3 mb-0 text-muted">| Giỏ Hàng</h5>
        </div>
        <div className="input-group" style={{ maxWidth: "600px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm sản phẩm, thương hiệu, và tên shop..."
            aria-label="Search"
            style={{
              border: "1px solid red",
              // borderRadius: "5px", 
              outline: "none",
              padding: "8px"
            }}
          />
          <button className="btn btn-danger">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
