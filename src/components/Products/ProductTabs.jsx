import { Tab, Nav, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import ProductDetails from "./ProductDetails";
import ProductDescription from "./ProductDescription";
import ProductReviews from "./ProductReviews";

const ProductTabs = ({ product }) => {
    if (!product || !product.id) {
        return <p className="text-center text-muted mt-4">⏳ Đang tải dữ liệu sản phẩm...</p>;
    }

    return (
        <Container className="mt-5">
            <Tab.Container defaultActiveKey="details">
                {/* Tabs Navigation */}
                <Nav variant="tabs" className="border-bottom fw-bold fs-5">
                    <Nav.Item>
                        <Nav.Link eventKey="details" className="px-4 text-dark">
                            Chi tiết sản phẩm
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="description" className="px-4 text-dark">
                            Mô tả sản phẩm
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="reviews" className="px-4 text-dark">
                            Đánh giá
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="details">
                        <ProductDetails product={product} />
                    </Tab.Pane>

                    <Tab.Pane eventKey="description">
                        <ProductDescription product={product} />
                    </Tab.Pane>

                    <Tab.Pane eventKey="reviews">
                        <ProductReviews productId={product.id} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default ProductTabs;
