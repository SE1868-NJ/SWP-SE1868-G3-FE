import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductImage from "../components/Products/ProductImage";
import ProductInfo from "../components/Products/ProductInfo";
import ProductDetails from "../components/Products/ProductDetails";
import ProductReviews from "../components/Products/ProductReviews";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const foundProduct = storedProducts.find((p) => p.id === id);
        setProduct(foundProduct || null);
    }, [id]);

    if (!product) {
        return <h2 className="text-center mt-5"> Sản phẩm không tồn tại!</h2>;
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={5}>
                    <ProductImage images={[product.img]} />
                </Col>

                <Col md={7}>
                    <ProductInfo product={product} />
                </Col>
            </Row>

            <h5 className="mt-5"> CHI TIẾT SẢN PHẨM</h5>
            <ProductDetails product={product} />

            <h5 className="mt-5"> MÔ TẢ SẢN PHẨM</h5>
            <p>{product.description || "Chất liệu mềm mại, giữ ấm tốt, thoải mái khi vận động."}</p>

            <ProductReviews productId={product.id} />
        </Container>
    );
}

export default ProductDetail;
