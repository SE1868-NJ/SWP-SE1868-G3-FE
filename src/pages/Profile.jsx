import React, { useState } from "react";
import avt1 from "../assets/images/avt1.png";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "pthuan8324",
    name: "pho mai que",
    email: "ph**********@gmail.com",
    phone: "*****16",
    gender: "male",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (userData.name.length > 30) {
      newErrors.name = "Tên không được quá 30 kí tự";
    }
    if (!userData.email.endsWith("@gmail.com")) {
      newErrors.email = "Sai định dạng Email";
    }
    if (userData.phone.length !== 10 || isNaN(userData.phone)) {
      newErrors.phone = "Số điện thoại phải có đúng 10 chữ số";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (validate()) {
      setIsEditing(false);
      // Thêm logic lưu thông tin vào database tại đây nếu cần
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{userData.username}</h5>
              <button className="btn btn-danger btn-sm">Sửa Hồ Sơ</button>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">Tài Khoản Của Tôi</li>
                <li className="list-group-item">Hồ Sơ</li>
                <li className="list-group-item">Ngân Hàng</li>
                <li className="list-group-item">Địa Chỉ</li>
                <li className="list-group-item">Đổi Mật Khẩu</li>
              </ul>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">Đơn Mua</li>
                <li className="list-group-item">Kho Voucher</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Hồ Sơ Của Tôi</h5>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              <div className="mb-3 text-center">
                <img
                  src={avt1}
                  alt="Avatar"
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>Tên đăng nhập</td>
                    <td>{userData.username}</td>
                  </tr>
                  <tr>
                    <td>Tên</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!isEditing}
                      />
                      {errors.name && <p className="text-danger">{errors.name}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!isEditing}
                      />
                      {errors.email && <p className="text-danger">{errors.email}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td>Số điện thoại</td>
                    <td>
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!isEditing}
                      />
                      {errors.phone && <p className="text-danger">{errors.phone}</p>}
                    </td>
                  </tr>
                  <tr>
                    <td>Giới tính</td>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={userData.gender === "male"}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <label className="form-check-label">Nam</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          checked={userData.gender === "female"}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <label className="form-check-label">Nữ</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="other"
                          checked={userData.gender === "other"}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <label className="form-check-label">Khác</label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn btn-secondary me-2" onClick={handleEdit} disabled={isEditing}>
                Cập Nhật
              </button>
              <button className="btn btn-danger" onClick={handleSave} disabled={!isEditing}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
