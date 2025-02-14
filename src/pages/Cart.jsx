import React, { useState } from "react";
import avt from "../assets/images/avt.jpg";
import { Link } from "react-router-dom"; 
const Cart = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Bún Cá", price: 59600, originalPrice: 85000, quantity: 1, selected: false },
    { id: 2, name: "Bún Đậu Mắm Tôm", price: 59600, originalPrice: 85000, quantity: 1, selected: false },
    { id: 3, name: "Bún Riêu Cua", price: 59600, originalPrice: 85000, quantity: 1, selected: false },
  ]);

  const [selectAll, setSelectAll] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setProducts(products.map((product) => ({ ...product, selected: !selectAll })));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const handleApplyVoucher = () => {
    setDiscount(voucher === "DISCOUNT10" ? 0.1 : 0);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const total = products.reduce(
    (sum, product) => (product.selected ? sum + product.price * product.quantity : sum),
    0
  );

  const totalAfterDiscount = total * (1 - discount);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product List */}
        <div className="col-md-8">
          <h4 className="fw-bold">GIỎ HÀNG</h4>
          <table className="table mt-3">
            <thead className="table-light">
              <tr>
                <th>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="form-check-input" />
                  <span className="ms-2">Tất cả ({products.length} sản phẩm)</span>
                </th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input type="checkbox" checked={product.selected} onChange={() => setProducts(products.map((p) => p.id === product.id ? { ...p, selected: !p.selected } : p))} className="form-check-input" />
                    <img src={avt} alt="book" className="img-fluid" style={{ width: "5em", marginLeft: "10px", marginRight: "10px" }} />
                    {product.name}
                  </td>
                  <td>
                    <span className="text-dark fw-bold">{product.price.toLocaleString()}đ</span>
                    <del className="ms-2 text-muted">{product.originalPrice.toLocaleString()}đ</del>
                  </td>
                  <td>
                    <input type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)} className="form-control w-50" />
                  </td>
                  <td className="text-danger fw-bold">{(product.price * product.quantity).toLocaleString()}đ</td>
                  <td>
                    <button onClick={() => handleDelete(product.id)} className="btn btn-link text-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment Section */}
        <div className="col-md-4">
          <div className="p-3 border rounded">
            <h5 className="fw-bold">Giao tới <span className="text-danger" style={{ cursor: "pointer" }}>Thay đổi</span></h5>
            <p>Phạm Thu An - 0963780216</p>
            <p>Nhà, Nho Quan, Thị trấn Nho Quan, Ninh Bình</p>
            <hr />

            {/* Voucher Section */}
            <h5 className="fw-bold">Nhập mã giảm giá</h5>
            <div className="input-group mb-3">
              <input type="text" value={voucher} onChange={(e) => setVoucher(e.target.value)} className="form-control" placeholder="Nhập mã voucher" />
              <button onClick={handleApplyVoucher} className="btn btn-danger">Áp dụng</button>
            </div>

            <h5 className="fw-bold">Tổng tiền thanh toán</h5>
            <p className="text-danger fs-5 fw-bold">{total > 0 ? `${totalAfterDiscount.toLocaleString()}đ` : "Vui lòng chọn sản phẩm"}</p>
            <Link to={`/checkout`} className="btn btn-danger w-100" disabled={total === 0}>Mua Hàng ({products.filter(p => p.selected).length})</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
