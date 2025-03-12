import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useChat } from "../../hooks/contexts/chatContext";

const ShopInfo = ({ shop }) => {
    const { openChat } = useChat();

    const handleChatClick = () => {
        openChat(shop.shop_id);
    };

    return (
        <Card className="p-3 shadow-sm border-0 mx-auto mt-5" style={{ maxWidth: "1200px" }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center gap-3">
                    <img
                        src={shop.shop_logo}
                        alt="Shop Logo"
                        style={{ width: "70px", height: "70px", borderRadius: "50%" }}
                    />
                    <div>
                        <h5 className="fw-bold mb-1">{shop.shop_name}</h5>
                        <span style={{ color: "#00a046", fontSize: "0.9rem" }}>
                            Online {shop.status}
                        </span>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <Button variant="danger" className="fw-bold px-4" onClick={handleChatClick}>Chat Ngay</Button>
                    <Link to={`/shop/${shop.shop_id}/homepage`}>
                        <Button variant="outline-secondary px-4">Xem Shop</Button>
                    </Link>
                </div>
            </div>

            <hr />
            <div className="d-flex flex-wrap justify-content-between text-center">
                <div className="flex-grow-1">
                    <p className="text-muted mb-1">Đánh Giá</p>
                    <span className="fw-bold text-danger">{shop.reviews}</span>
                </div>
                <div className="flex-grow-1">
                    <p className="text-muted mb-1">Sản Phẩm</p>
                    <span className="fw-bold text-danger">{shop.products}</span>
                </div>
                <div className="flex-grow-1">
                    <p className="text-muted mb-1">Tỉ Lệ Phản Hồi</p>
                    <span className="fw-bold text-danger">{shop.responseRate}%</span>
                </div>
                <div className="flex-grow-1">
                    <p className="text-muted mb-1">Thời Gian Phản Hồi</p>
                    <span className="fw-bold text-danger">{shop.responseTime}</span>
                </div>
                <div className="flex-grow-1">
                    <p className="text-muted mb-1">Tham Gia</p>
                    <span className="fw-bold text-danger">{shop.joined}</span>
                </div>
                <div className="flex-grow-1">
                    <p className="text-muted mb-1">Người Theo Dõi</p>
                    <span className="fw-bold text-danger">{shop.followers}</span>
                </div>
            </div>
        </Card>
    );
};

export default ShopInfo;