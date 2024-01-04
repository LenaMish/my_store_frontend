import React, { useState } from 'react';

const Product = ({ id, image, name, price, description, colors, sizes, onAddToCart }) => {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (selectedColor && selectedSize) {
            onAddToCart({ id, name, price, selectedColor, selectedSize });
            // Dodaj dowolne inne dane produktu, które chcesz przekazać do koszyka
        } else {
            alert('Proszę wybrać kolor i rozmiar przed dodaniem do koszyka.');
        }
    };

    return (
        <div className="product">
            <img src={image} alt={name} className="product-image" />
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Price: ${price}</p>
            
            {/* Wybór koloru */}
            <div>
                <strong>Color:</strong>
                {colors.map((color) => (
                    <span
                        key={color}
                        className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                    ></span>
                ))}
            </div>

            {/* Wybór rozmiaru */}
            <div>
                <strong>Size:</strong>
                {sizes.map((size) => (
                    <span
                        key={size}
                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(size)}
                    >
                        {size}
                    </span>
                ))}
            </div>

            {/* Przycisk dodawania do koszyka */}
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

const Home = () => {
    const [cart, setCart] = useState([]);

    // Funkcja do dodawania produktu do koszyka
    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div>
            <div className="products">
                <Product
                    id="1"
                    image="path/to/image1.jpg"
                    name="Product 1"
                    price={19.99}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    colors={['red', 'blue', 'green']}
                    sizes={['S', 'M', 'L']}
                    onAddToCart={handleAddToCart}
                />
                <Product
                    id="2"
                    image="path/to/image2.jpg"
                    name="Product 2"
                    price={29.99}
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    colors={['yellow', 'purple', 'pink']}
                    sizes={['M', 'L', 'XL']}
                    onAddToCart={handleAddToCart}
                />
                {/* Dodaj więcej produktów w podobny sposób */}
            </div>

            {/* Wyświetl koszyk */}
            <div className="cart">
                <h2>Shopping Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.selectedColor}, {item.selectedSize}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;