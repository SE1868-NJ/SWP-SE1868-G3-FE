import React, { useState, useEffect } from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Giả lập lấy đánh giá từ localStorage hoặc API
        const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [
            {
                productId: "1",
                username: "quocphong10900",
                rating: 5,
                comment: "Sản phẩm rất đẹp, giống như hình, chất vải tốt!",
                date: "2024-02-10",
                images: [
                    "https://via.placeholder.com/100",
                    "https://via.placeholder.com/100",
                    "https://via.placeholder.com/100",
                ],
            },
            {
                productId: "1",
                username: "trump095",
                rating: 5,
                comment: "Màu sắc đẹp, đúng như mô tả, vải mềm mịn!",
                date: "2024-02-12",
            },
        ];

        const productReviews = storedReviews.filter((r) => r.productId === productId);
        setReviews(productReviews);
    }, [productId]);

    return (
        <Card className="mt-4">
            <Card.Header>
                <h5>📝 Đánh Giá Sản Phẩm</h5>
            </Card.Header>
            <ListGroup variant="flush">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <ListGroup.Item key={index}>
                            <div>
                                <strong>{review.username}</strong> - <span className="text-muted">{review.date}</span>
                                <div>
                                    {Array(review.rating)
                                        .fill()
                                        .map((_, i) => (
                                            <span key={i} style={{ color: "gold", fontSize: "16px" }}>⭐</span>
                                        ))}
                                </div>
                                <p>{review.comment}</p>

                                {/* Hiển thị hình ảnh đánh giá nếu có */}
                                {review.images && review.images.length > 0 && (
                                    <div className="d-flex">
                                        {review.images.map((img, i) => (
                                            <img key={i} src={img} alt={`Review ${i}`} className="me-2" style={{ width: "80px", borderRadius: "8px" }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>❌ Chưa có đánh giá nào cho sản phẩm này.</ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
};

export default ProductReviews;
