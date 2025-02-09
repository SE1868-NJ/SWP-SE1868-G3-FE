import React, { useState } from "react";
import Container from "../components/Container";
import Stack from "../components/Stack";
import { Row, Col } from "../components/Grid";
import Card from "../components/Card";
import avt from "../assets/images/avt.jpg";
function Profile() {
  // Thông tin giả định của người dùng
  const [user, setUser] = useState({
    avatar: "https://via.placeholder.com/100",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "123 Đường ABC, Hà Nội",

  });

  // Trạng thái chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  // Xử lý thay đổi dữ liệu nhập vào
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Lưu thông tin cập nhật
  const handleSave = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <Container>
      <h2 className="text-danger fw-bold text-center">
         Quản lý Thông tin Cá nhân
      </h2>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center">
                <img
                  src={avt}
                  alt="Avatar"
                  className="rounded-circle mb-3"
                  style={{ width: "100px" }}
                />
              </div>

              <Stack direction="v" gap={3}>
                <div>
                  <label className="fw-bold">Họ và Tên</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="fw-bold">Email</label>
                  <p>{user.email}</p>
                </div>

                <div>
                  <label className="fw-bold">Số điện thoại</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={updatedUser.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{user.phone}</p>
                  )}
                </div>

                

                <div>
                  <label className="fw-bold">Địa chỉ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={updatedUser.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{user.address}</p>
                  )}
                </div>

               

                <div className="text-center">
                  {isEditing ? (
                    <>
                      <button
                        className="btn btn-success me-2"
                        onClick={handleSave}
                      >
                        Lưu
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setIsEditing(false)}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Chỉnh sửa
                    </button>
                  )}
                </div>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
