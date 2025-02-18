import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductImages from '../components/Products/ProductImages';
import ProductInfo from '../components/Products/ProductInfo';
import ProductTabs from '../components/Products/ProductTabs';
import ShopInfo from "../components/Products/ShopInfo";
import { productService } from "../services/productService";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await productService.getProductById(id);
            setProduct(response);
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <h2 className="text-center mt-5">Product not found!</h2>;
    }

    return (
        <Container className="mt-4" style={{ maxWidth: '1200px' }}>
            <Row className="g-4">
                <Col md={5}>
                    <ProductImages images={[product.image_url]} />
                </Col>

                <Col md={7}>
                    <ProductInfo
                        product={product}
                        selectedSize={selectedSize}
                        quantity={quantity}
                        onSizeSelect={setSelectedSize}
                        onQuantityChange={(value) => setQuantity(Math.min(value, product.stock))}
                    />
                </Col>
            </Row>

            <ShopInfo shop={product.shop} />

            <ProductTabs product={product} />

        </Container>
    );
};

export default ProductDetail;