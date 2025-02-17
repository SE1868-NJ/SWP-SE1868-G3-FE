import { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Row, Col, Badge, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState({
        rating: 4.9,
        total: 4383,
        counts: { 5: 4200, 4: 129, 3: 34, 2: 11, 1: 9 },
        commentsCount: 2600,
        mediaCount: 1500,
        reviews: [
            {
                id: 1,
                user: "NhanPhan0108",
                avatar: "https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/480222434_1645392322853151_8669160422104446507_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=i0YS7vhAbqwQ7kNvgGus73U&_nc_oc=AdhCqsnRCw5YppARDi-i-v0SYe2lI57uOV6VgoS4hIs8BZ02w69-6CqvvLsuMzLWpR8&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=AxvbotMgvNB7gjhldSIgexY&oh=00_AYBVeofxQabFakc6-HP6wiz9ekO9N9cWCl3SLzEklCSpHA&oe=67B8D66E",
                rating: 5,
                date: "2025-02-16",
                variant: "Màu đen",
                material: "Da",
                comment: "Bún ngon vch!",
                images: [
                    "https://th.bing.com/th/id/OIP.KTaEv0FYG_-vJnOaU0qg4QAAAA?w=178&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
                    "https://th.bing.com/th/id/OIP.UlfsTmelHiOXH8buhyHNbgHaFj?w=317&h=190&c=7&r=0&o=5&dpr=2&pid=1.7"
                ],
                sellerReply: "Cảm ơn Bạn đã ủng hộ YUUMY!"
            },
            {
                id: 2,
                user: "DongGanhTeam",
                avatar: "https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-1/312365193_194567642985082_4776211034853657131_n.jpg?stp=c0.0.1536.1536a_dst-jpg_s480x480_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_ohc=jcAkrRxT0qwQ7kNvgHpP7m2&_nc_oc=AdiZX-rV5hlzlRrZNYHVweAi6fbugT5H5FFV7cRg3JeW5s51yLORLZgZvCIsQAfCn0w&_nc_zt=24&_nc_ht=scontent.fhan14-1.fna&_nc_gid=AB0cm9mJHVKlISO_pYeDv5Y&oh=00_AYDLDioPbg6C_pNyCT5vQT5wyv4x-QiexsrUAmZr7ljnDg&oe=67B8C098",
                rating: 4,
                date: "2023-07-11",
                variant: "Màu nâu",
                material: "Da",
                comment: "Ăn bth!",
                images: []
            }
        ]
    });

    const [selectedFilter, setSelectedFilter] = useState({ rating: 'all', type: 'all' });

    const filteredReviews = selectedFilter.rating === 'all'
        ? reviews.reviews
        : reviews.reviews.filter(r => r.rating === selectedFilter.rating);

    return (
        <div className="p-3">

            {/* Rating Summary */}
            <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col md={3} className="text-center border-end">
                            <div className="display-4 fw-bold text-danger">{reviews.rating}</div>
                            <div className="text-muted mb-2">trên 5</div>
                            <div className="star-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-warning h4">★</span>
                                ))}
                            </div>
                        </Col>

                        <Col md={6} className="px-4">
                            {[5, 4, 3, 2, 1].map(star => (
                                <div
                                    key={star}
                                    className={`d-flex align-items-center mb-2 ${selectedFilter.rating === star ? 'fw-bold' : ''}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedFilter(prev => ({
                                        ...prev,
                                        rating: prev.rating === star ? 'all' : star
                                    }))}
                                >
                                    <span
                                        className="me-2"
                                        style={{
                                            width: '71px',
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            color: selectedFilter.rating === star ? "#DC3545" : "#333",
                                            fontWeight: selectedFilter.rating === star ? "bold" : "normal",
                                            border: selectedFilter.rating === star ? "2px solid #DC3545" : "2px solid #ccc",
                                            cursor: "pointer",
                                            backgroundColor: selectedFilter.rating === star ? "#F8D7DA" : "transparent",
                                            transition: "all 0.3s ease-in-out"
                                        }}
                                    >
                                        {star} sao
                                    </span>
                                    <span className="text-muted me-2">({reviews.counts?.[star] || 0})</span>
                                    <div className="flex-grow-1">
                                        <div
                                            className="bg-warning"
                                            style={{
                                                height: '8px',
                                                width: `${(reviews.counts?.[star] / reviews.total * 100 || 0)}%`,
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Col>

                        <Col md={3} className="text-center">
                            <Button
                                variant={selectedFilter.rating === 'all' ? "danger" : "outline-danger"}
                                className="w-100 mb-2"
                                onClick={() => setSelectedFilter({ rating: 'all', type: 'all' })}
                            >
                                Tất Cả ({reviews.total})
                            </Button>
                            <Button
                                variant={selectedFilter.type === 'comment' ? "danger" : "outline-danger"}
                                className="w-100 mb-2"
                                onClick={() => setSelectedFilter(prev => ({ ...prev, type: 'comment' }))}
                            >
                                Có Bình Luận ({reviews.commentsCount})
                            </Button>
                            <Button
                                variant={selectedFilter.type === 'media' ? "danger" : "outline-danger"}
                                className="w-100"
                                onClick={() => setSelectedFilter(prev => ({ ...prev, type: 'media' }))}
                            >
                                Có Hình Ảnh/Video ({reviews.mediaCount})
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* Reviews List */}
            <ListGroup>
                {filteredReviews.length === 0 ? (
                    <p className="text-muted">Không có đánh giá nào cho bộ lọc này.</p>
                ) : (
                    filteredReviews.map((review, index) => (
                        <ListGroup.Item key={index} className="mb-3 shadow-sm">
                            <Row>
                                <Col md={1}>
                                    <Image src={review.avatar} roundedCircle width={50} height={50} />
                                </Col>
                                <Col md={11}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <Badge bg="warning" className="me-2">{review.rating} ★</Badge>
                                            <strong>{review.user}</strong>
                                        </div>
                                        <span className="text-muted">{review.date}</span>
                                    </div>

                                    <div className="text-muted small">
                                        {review.variant && <span>Phân loại hàng: {review.variant} | </span>}
                                        {review.material && <span>Chất liệu: {review.material}</span>}
                                    </div>

                                    <p className="mt-2 mb-0">{review.comment}</p>

                                    {/* Images */}
                                    {review.images.length > 0 && (
                                        <div className="d-flex mt-2">
                                            {review.images.map((img, imgIdx) => (
                                                <Image key={imgIdx} src={img} className="me-2" width={60} height={60} />
                                            ))}
                                        </div>
                                    )}

                                    {/* Seller Reply */}
                                    {review.sellerReply && (
                                        <div className="bg-light p-2 mt-2 rounded text-muted small">
                                            <strong>Phản hồi của người bán:</strong> {review.sellerReply}
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </div>
    );
};

ProductReviews.propTypes = {
    productId: PropTypes.string.isRequired
};

export default ProductReviews;
