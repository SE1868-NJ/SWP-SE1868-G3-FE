import { useState } from "react";
import { FaFacebookF, FaHeart, FaFacebookMessenger } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Media = () => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(2800); // hard code tym

    // Xử lý event click vào nút yêu thích
    const toggleLike = () => {
        if (liked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="d-flex align-items-center gap-3 mt-2">
            {/* Share */}
            <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold">Chia sẻ:</span>
                <Button variant="outline-secondary" className="p-2 rounded-circle px-2">
                    <FaFacebookMessenger color="#0084ff" />
                </Button>
                <Button variant="outline-secondary" className="p-2 rounded-circle px-2">
                    <FaFacebookF color="#1877f2" />
                </Button>
            </div>

            {/* Like */}
            <div className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }} onClick={toggleLike}>
                <FaHeart color={liked ? "red" : "gray"} size={20} />
                <span className="fw-semibold">{liked ? "Đã thích" : "Thích"} ({likeCount.toLocaleString("vi-VN")})</span>
            </div>
        </div>
    );
};

export default Media;
