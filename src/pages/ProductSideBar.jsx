import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

function ProductSideBar() {
    return (
        <div className="p-3 border bg-light">
            <h5 className="fw-bold mb-3">BỘ LỌC TÌM KIẾM</h5>

            {/* Danh mục */}
            <div className="mb-3">
                <h6 className="fw-bold">Theo Danh Mục</h6>
                <div><input type="checkbox" />Đồ ăn</div>
                <div><input type="checkbox" /> Đồ uống</div>
                <div><input type="checkbox" /> Đồ ăn chay</div>
                <div><input type="checkbox" /> Đồ ăn sống</div>
            </div>

            {/* Nơi bán */}
            <div className="mb-3">
                <h6 className="fw-bold">Khoảng giá</h6>
                <div><input type="checkbox" /> Từ 10K - 100K</div>
                <div><input type="checkbox" /> Từ 100K - 200K</div>
                <div><input type="checkbox" /> Từ 200K - 300K</div>
                <div><input type="checkbox" /> Từ 300K - 500K</div>
            </div>
        </div>
    );
}

export default ProductSideBar;
