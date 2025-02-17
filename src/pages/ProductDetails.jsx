import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ProductImages from '../components/Products/ProductImages';
import ProductInfo from '../components/Products/ProductInfo';
import ProductTabs from '../components/Products/ProductTabs';
import ShopInfo from "../components/Products/ShopInfo";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = () => {
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            const found = storedProducts.find(p => p.id === id);
            setProduct(found ? {
                ...found,
                reviews: found.reviews || []
            } : null);
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <h2 className="text-center mt-5">Product not found!</h2>;
    }

    const shopData = {
        logo: "https://down-bs-vn.img.susercontent.com/vn-11134216-7r98o-ly7v40gqbsy5f0_tn.webp",
        name: "Yuumy Official",
        lastActive: "3 phút trước",
        reviews: "136,6k",
        products: "380",
        responseRate: "83",
        responseTime: "trong vài giờ",
        joined: "7 năm trước",
        followers: "477,8k"
    };

    return (
        <Container className="mt-4" style={{ maxWidth: '1200px' }}>
            <Row className="g-4">
                <Col md={5}>
                    <ProductImages images={[product.img]} />
                </Col>

                <Col md={7}>
                    <ProductInfo
                        product={{
                            ...product,
                            formattedPrice: `{product.price?.toLocaleString('en-US')}`,
                            formattedOldPrice: product.oldPrice
                                ? `{product.oldPrice?.toLocaleString('en-US')}`
                                : ''
                        }}
                        selectedSize={selectedSize}
                        quantity={quantity}
                        onSizeSelect={setSelectedSize}
                        onQuantityChange={(value) => setQuantity(Math.min(value, product.stock))}
                    />
                </Col>
            </Row>

            <ShopInfo shop={shopData} />

            <ProductTabs product={product} />

        </Container>
    );
};

export default ProductDetail;