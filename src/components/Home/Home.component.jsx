import React, { useState } from 'react';
import Product from './Product.component';
import "./Product.component.css"

const Home = () => {
    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    const handleRemoveFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    const productsData = [
        {
            id: "1",
            image: "path/to/image1.jpg",
            name: "Enchanted Elegance Bouquet",
            prices: { 'S': 19.99, 'M': 24.99, 'L': 29.99 },
            description: "A timeless arrangement of roses and lilies, the Enchanted Elegance Bouquet exudes sophistication and grace for any special occasion.",
            colors: ['pink', 'white', 'beige', 'red'],
            sizes: ['S', 'M', 'L'],
        },
        {
            id: "2",
            image: "path/to/image2.jpg",
            name: "Whimsical Garden Dream Bouquet",
            prices: { 'S': 29.99, 'M': 34.99, 'L': 39.99 },
            description: "A burst of vibrant tulips and wildflowers, the Whimsical Garden Dream Bouquet brings joy and nature's enchantment into any space.",
            colors: ['pink', 'white', 'beige', 'red'],
            sizes: ['S', 'M', 'L'],
        },
        {
            id: "3",
            image: "path/to/image3.jpg",
            name: "Serenity Bliss Blossoms",
            prices: { 'S': 29.99, 'M': 34.99, 'L': 39.99 },
            description: "An aromatic blend of lavender roses and chamomile daisies, the Serenity Bliss Blossoms create a peaceful atmosphere for conveying heartfelt well wishes",
            colors: ['pink', 'white', 'beige', 'red'],
            sizes: ['S', 'M', 'L'],
        },
        

    ];

    return (
        <div>
            <div className="products-container">
                {productsData.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        prices={product.prices}
                        description={product.description}
                        colors={product.colors}
                        sizes={product.sizes}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>

            <div className="cart">
                <h2>Shopping Cart</h2>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            {item.name} - {item.selectedColor}, {item.selectedSize}
                            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
