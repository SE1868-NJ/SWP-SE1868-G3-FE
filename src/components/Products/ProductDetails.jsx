import React from "react";
import { Table } from "react-bootstrap";

const ProductDetails = ({ product }) => {
    return (
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>Thương hiệu</td>
                    <td>{product.brand || "Không có"}</td>
                </tr>
                <tr>
                    <td>Chất liệu</td>
                    <td>Sợi dệt</td>
                </tr>
                <tr>
                    <td>Xuất xứ</td>
                    <td>Việt Nam</td>
                </tr>
            </tbody>
        </Table>
    );
};

export default ProductDetails;
