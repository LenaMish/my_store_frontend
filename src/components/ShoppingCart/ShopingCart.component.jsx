import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSelectedProductId, getShoppingCartProducts, removeProductFromShoppingCart, removeSelectedProductId, getSelectedShoppingCartProductIds } from '../../shoppingCart/shoppingCart';
import './ShoppingCart.component.css';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getShoppingCartProducts());
  const [selectedIds, setSelectedIds] = useState(getSelectedShoppingCartProductIds())

  const handleRemoveFromCart = (id) => {
    removeProductFromShoppingCart(id);
    setCart(getShoppingCartProducts());
  };

  const goToOrder = () => {
    navigate('/order');
  };

  const onChangeSelectedProduct = (id) => {
      if(selectedIds.includes(id)) {
          removeSelectedProductId(id)
      } else {
          addSelectedProductId(id)
      }
      setSelectedIds(getSelectedShoppingCartProductIds())
  } 

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart ({cart.length} items)</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <input id={"item_" + item.id} type="checkbox" checked={selectedIds.includes(item.id)} onClick={() => onChangeSelectedProduct(item.id)}></input>{" "}
              <label htmlFor={"item_" + item.id}>{item.name} - {item.selectedColor}, {item.selectedSize}</label>
            </div>
            <div className="buttons">
              <button
                className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="order-button" onClick={goToOrder}>
        Order now!
      </button>
    </div>
  );
};

export default ShoppingCart;
