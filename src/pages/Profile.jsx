import React, { useState } from "react";
import avt1 from "../assets/images/avt1.png";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(avt1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (userData.name.length > 30) {
      newErrors.name = "Tên không được quá 30 chữ";
    }
    if (!userData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email phải theo định dạng @gmail.com";
    }
    if (userData.phone.length !== 10 || isNaN(userData.phone)) {
      newErrors.phone = "Số điện thoại phải có đúng 10 chữ số";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSave = () => {
    if (isEditing) {
      if (validate()) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-5 d-flex">
      {/* Sidebar */}
      <div className="col-md-3">
        <h5 className="d-flex align-items-center">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          {userData.name || "Tên User"}
        </h5>
        <ul className="list-group list-group-flush margin-right-10">
          <li className="list-group-item border-0">
            Tài khoản của tôi
            <ul>
              <li className="list-group-item border-0">Hồ sơ</li>
              <li className="list-group-item border-0">Ngân hàng</li>
              <li className="list-group-item border-0">Địa chỉ</li>
              <li className="list-group-item border-0">Đổi mật khẩu</li>
            </ul>
          </li>
          <li className="list-group-item border-0">Đơn mua</li>
          <li className="list-group-item border-0">Kho voucher</li>
        </ul>
      </div>

      {/* Profile Form */}
      <div className="col-md-6 border p-3">
        <h4>Hồ sơ của tôi</h4>
        <div className="form-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {errors.name && <p className="text-danger">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={userData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label>Giới tính:</label>
          <div>
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={userData.gender === "Nam"}
              onChange={handleChange}
              disabled={!isEditing}
            />{" "}
            Nam
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={userData.gender === "Nữ"}
              onChange={handleChange}
              className="ms-3"
              disabled={!isEditing}
            />{" "}
            Nữ
            <input
              type="radio"
              name="gender"
              value="Khác"
              checked={userData.gender === "Khác"}
              onChange={handleChange}
              className="ms-3"
              disabled={!isEditing}
            />{" "}
            Khác
          </div>
        </div>
        <button className="btn btn-danger mt-3" onClick={handleEditSave}>
          {isEditing ? "Lưu" : "Cập nhật"}
        </button>
      </div>

      {/* Avatar Upload */}
      <div className="col-md-3 text-center">
        <div className="position-relative d-inline-block ">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        <div className="mt-2">
          <label className="btn btn-light btn-sm">
            Chọn tệp
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
