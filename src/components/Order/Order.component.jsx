import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DELIVERY } from "../../api/productsData";
import './Order.component.css'; 
import OrderSummaryModal from './OrderSummaryModal.component';
import Checkout from './Checkout.component';
import Input from "../common/Input.component";

const Order = () => {
    const navigate = useNavigate(); 
    const [deliveryList, setDeliveryList] = useState(DELIVERY);
    const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY[0].id);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [contactFormData, setContactFormData] = useState({
        name: "",
        street: "",
        post_code: "",
        city: "",
        phone: "",
        email: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderSummary, setOrderSummary] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);

    const contactFields = [
        {id: "name", name: "name", label: "First name and last name", type: "text"},
        {id: "street", name: "street", label: "Street and building number", type: "text"},
        {id: "post_code", name: "post_code", label: "Post code", type: "text"},
        {id: "city", name: "city", label: "City", type: "text"},
        {id: "phone", name: "phone", label: "Phone number", type: "tel"},
        {id: "email", name: "email", label: "Email", type: "email"},
    ];

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactFormData({
            ...contactFormData,
            [name]: value,
        });
    };

    const handleForm = (e) => {
        e.preventDefault();
        const summary = {
            contact: contactFormData,
            delivery: selectedDelivery,
            payment: selectedPayment,
        };
        setOrderSummary(summary);
        setShowCheckout(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (showCheckout && orderSummary) {
            navigate('/');
        } else {
            setShowCheckout(false);
        }
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

                <div className="payment-options">  
                    <p>Choose payment method:</p>
                    {['card', 'cash'].map((paymentMethod) => (
                        <div key={paymentMethod} className="payment-option">
                            <input
                                id={paymentMethod}
                                type="radio"
                                value={paymentMethod}
                                checked={selectedPayment === paymentMethod}
                                onChange={() => setSelectedPayment(paymentMethod)}
                            />
                            <label htmlFor={paymentMethod}>
                                {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                            </label>
                        </div>
                    ))}
                </div>

                {contactFields.map(field => (
                    <div key={field.id} className="contact-field">
                        <label htmlFor={field.id}>{field.label}</label>
                        <Input
                            type={field.type}
                            id={field.id}
                            name={field.name}
                            value={contactFormData[field.name]}
                            onChange={handleContactChange}
                        />
                    </div>
                ))}

                <div className="buttons">
                    <button className="checkout-button" type="submit">
                        Go to checkout
                    </button>
                </div>
            </form>

            <OrderSummaryModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                orderSummary={orderSummary}
            />

            {showCheckout && <Checkout />}
        </div>
    );
};

export default Order;
