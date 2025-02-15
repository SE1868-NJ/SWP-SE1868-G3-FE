import React from "react";
import { Carousel } from "react-bootstrap";

const ProductImage = ({ images }) => {
    return (
        <Carousel>
            {images.map((img, index) => (
                <Carousel.Item key={index}>
                    <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductImage;
