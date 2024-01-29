import React, { useState } from 'react';
import {ENDPOINTS} from "../../api/endpoints"

const Product = ({ id, image, name, prices, description, colors, sizes, onAddToCart }) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [selectedSize, setSelectedSize] = useState(Object.keys(prices)[0]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(Object.values(prices)[0]);


    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        setSelectedPrice(prices[size]);
    };

    const handleAddToCart = () => {
        if (selectedColor && selectedSize) {
            onAddToCart({
                productId: id,
                name,
                price: selectedPrice,
                selectedColor,
                selectedSize,
                selectedImage,
            });

            setSelectedColor(colors[0]);
            setSelectedSize(Object.keys(prices)[0]);
            setSelectedImage(null);
            setSelectedPrice(Object.values(prices)[0]);
        } else {
            alert('Please choose a color and size before adding to the cart.');
        }
    };

    return (
        <div className="product">
            <div className="product-details">
                <img
                    src={ENDPOINTS.Media + "/" + image}
                    alt={name}
                    className="product-image"
                />
                <div className="product-info">
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>Price: ${selectedPrice}</p>
                </div>
                <div className="product-options">
                    <div>
                        <label htmlFor="colorSelect"><strong>Color:</strong></label>
                        <select
                            id="colorSelect"
                            value={selectedColor}
                            onChange={(e) => handleColorChange(e.target.value)}
                        >
                            <option value="">Choose color</option>
                            {colors.map((color) => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sizeSelect"><strong>Size:</strong></label>
                        <select
                            id="sizeSelect"
                            value={selectedSize}
                            onChange={(e) => handleSizeChange(e.target.value)}
                        >
                            <option value="">Choose size</option>
                            {sizes.map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;
