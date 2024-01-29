import React, { useState } from "react";
import './Checkout.component.css'; 

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePaymentChange = (paymentOption) => {
    setSelectedPayment(paymentOption);
  };

  return (
    <div className="checkout-container"> 
      <h2>Checkout</h2>
      <div className="payment-options"> 
        <p>Choose payment method:</p>
        <label className="payment-option">
          <input
            type="radio"
            value="card"
            checked={selectedPayment === "card"}
            onChange={() => handlePaymentChange("card")}
          />
          Card
        </label>
        <label className="payment-option">
          <input
            type="radio"
            value="cash"
            checked={selectedPayment === "cash"}
            onChange={() => handlePaymentChange("cash")}
          />
          Cash
        </label>
      </div>
      {selectedPayment && (
        <div>
          <p>Selected payment method: {selectedPayment}</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
