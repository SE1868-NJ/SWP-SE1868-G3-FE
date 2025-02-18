import PropTypes from "prop-types";
import { Card, Image } from "react-bootstrap";

const ProductDescription = ({ product }) => {
    if (!product) {
        return <p className="text-center text-muted">Sản phẩm không tồn tại hoặc đang tải...</p>;
    }

    const displayImage = product.descriptionImages?.length > 0
        ? product.descriptionImages[0]
        : product.img || "";

    return (
        <Card className="border-0 bg-transparent">
            <Card.Body>
                {displayImage ? (
                    <Image
                        src={displayImage}
                        alt="Ảnh mô tả sản phẩm"
                        className="img-fluid rounded mb-3"
                        style={{ maxWidth: "100%", objectFit: "contain" }}
                    />
                ) : (
                    <p className="text-muted">Không có hình ảnh mô tả cho sản phẩm này.</p>
                )}

                <p className="lead" style={{ lineHeight: "2rem", whiteSpace: "pre-line" }}>
                    {product.fullDescription || "Bún bò Huế là một món ăn đặc sản nổi tiếng của vùng cố đô Huế, được yêu thích vì sự kết hợp tinh tế giữa hương vị đậm đà và màu sắc hấp dẫn. Với lịch sử lâu đời và sự kết hợp của các yếu tố gia vị, bún bò Huế đã trở thành biểu tượng ẩm thực của thành phố này. Nước dùng của bún bò Huế có màu vàng đỏ đặc trưng, được nấu từ xương bò và gia vị như mắm ruốc (mắm tôm) và bột ớt. Nước dùng phải đạt được sự cân bằng hoàn hảo giữa vị mặn, ngọt và cay, với độ béo vừa phải. Sợi bún thường là bún tươi, có dạng sợi tròn và dai, rất phù hợp để hấp thụ nước dùng đậm đà. Thịt bò được sử dụng là bắp bò hoặc gân bò, được cắt thành lát mỏng hoặc miếng vừa ăn. Một số phiên bản còn thêm giò heo hoặc tiết bò. Bún bò Huế thường được phục vụ trong một tô lớn với nước dùng nóng hổi, sợi bún, thịt bò, và giò heo. Khi ăn, thực khách có thể thêm các gia vị như ớt tươi, chanh, và mắm tôm để tăng cường hương vị. Rau sống và giá đỗ được ăn kèm giúp món ăn thêm phần tươi mát và hấp dẫn. "}
                </p>
            </Card.Body>
        </Card>
    );
};

ProductDescription.propTypes = {
    product: PropTypes.shape({
        fullDescription: PropTypes.string,
        descriptionImages: PropTypes.arrayOf(PropTypes.string),
        img: PropTypes.string
    })
};

export default ProductDescription;
