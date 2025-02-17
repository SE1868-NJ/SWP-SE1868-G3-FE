import { useState } from "react";
import { Card, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImages = ({ images }) => {
    if (!images || images.length === 0) {
        images = ["https://via.placeholder.com/500"];
    }

    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
    };

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[newIndex]);
        setCurrentIndex(newIndex);
    };

    return (
        <div className="d-flex flex-column align-items-center w-100">
            {/* Ảnh to */}
            <Card className="border-0 shadow-lg position-relative w-100">
                <button
                    className="btn btn-light position-absolute start-0 top-50 translate-middle-y"
                    style={{ zIndex: 10, padding: "10px" }}
                    onClick={handlePrev}
                >
                    ←
                </button>

                <Zoom>
                    <Card.Img
                        variant="top"
                        src={selectedImage}
                        alt="Ảnh sản phẩm"
                        style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "550px",
                            borderRadius: "0.5rem",
                        }}
                    />
                </Zoom>

                <button
                    className="btn btn-light position-absolute end-0 top-50 translate-middle-y"
                    style={{ zIndex: 10, padding: "10px" }}
                    onClick={handleNext}
                >
                    →
                </button>
            </Card>

            {/* Ảnh nhỏ */}
            <div className="d-flex gap-2 mt-3">
                {images.map((img, index) => (
                    <Image
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index}`}
                        className="img-thumbnail shadow"
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            cursor: "pointer",
                            border: selectedImage === img ? "3px solid red" : "1px solid lightgray",
                            transition: "border 0.3s ease-in-out",
                        }}
                        onClick={() => {
                            setSelectedImage(img);
                            setCurrentIndex(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

ProductImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProductImages;
