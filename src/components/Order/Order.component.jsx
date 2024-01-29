import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DELIVERY } from "../../api/productsData";
import './Order.component.css'; 

const Order = () => {
    const navigate = useNavigate(); 
    const [deliveryList, setDeliveryList] = useState(DELIVERY);
    const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY[0].id);

    const handleForm = (e) => {
        e.preventDefault();
    };

    const goToCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="order-container"> 
            <form onSubmit={handleForm}>
                <div className="delivery-options"> 
                    <p>Choose Delivery:</p>
                    {deliveryList.map(de => (
                        <div key={de.id} className="delivery-option">
                            <input
                                name="delivery"
                                checked={selectedDelivery === de.id}
                                onChange={() => setSelectedDelivery(de.id)}
                                id={"delivery_" + de.id}
                                type="radio"
                            />
                            <label htmlFor={"delivery_" + de.id}>{de.name}</label>
                        </div>
                    ))}
                </div>
            </form>
            <div className="buttons">
                <button className="checkout-button" onClick={goToCheckout}>
                    Go to checkout
                </button>
            </div>
        </div>
    );
};

export default Order;
