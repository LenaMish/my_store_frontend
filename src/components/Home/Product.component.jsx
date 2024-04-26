import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {ENDPOINTS} from "../../api/endpoints"

const Product = ({ id, image, name, prices, description, variants, onAddToCart }) => {
    const [selectedColor, setSelectedColor] = useState();
    const [selectedSize, setSelectedSize] = useState(Object.keys(prices)[0]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(Object.values(prices)[0]);

    const [availableSizes, setAvailableSizes] = useState([])
    const [availableColors, setAvailableColors] = useState([])

    useEffect(() => {
        if(variants.length > 0) {
            setAvailableColors(Array.from(new Set(variants.map(v => v.color))))
            const variant = variants[0]
            handleColorChange(variant.color)
            setSelectedPrice(variant.price)
            setSelectedSize(variant.size)
        }
    }, [])

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedPrice(null)
        setSelectedSize(null)
        setAvailableSizes(variants.filter(v => v.color === color).map(v => v.size))  
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
                image,
            });
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
                            {availableColors.map((color) => (
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
                            {availableSizes.map((size) => (
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
