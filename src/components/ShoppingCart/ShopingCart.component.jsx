import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getShoppingCartProducts, removeProductFromShoppingCart } from '../../shoppingCart/shoppingCart';
import './ShoppingCart.component.css'; 

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getShoppingCartProducts());

  const handleRemoveFromCart = (id) => {
    removeProductFromShoppingCart(id);
    setCart(getShoppingCartProducts());
  };

  const goToOrder = () => {
    navigate('/order');
  };

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart ({cart.length} items)</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              {item.name} - {item.selectedColor}, {item.selectedSize}
            </div>
            <div className="buttons">
              <button className="order-button" onClick={goToOrder}>
                Order now!
              </button>
              <button
                className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingCart;
