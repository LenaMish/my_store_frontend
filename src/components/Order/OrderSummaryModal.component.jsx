import React from "react";
import { useState } from "react";
import Modal from 'react-modal';
import { ENDPOINTS } from '../../api/endpoints';
import { getSelectedShoppingCartProductIds, getShoppingCartProducts } from "../../shoppingCart/shoppingCart";


const OrderSummaryModal = ({ isOpen, onRequestClose, orderSummary }) => {
    const getDeliveryMethodName = (deliveryId) => {
        switch (deliveryId) {
            case 1:
                return "Courier - Inpost";
            case 2:
                return "In store pick-up";
            case 3:
                return "Inpost Parcel locker 24/7";
            case 4:
                return "Pick-up point - Żabka";
            default:
                return "Unknown Delivery Method";
        }
    };

    const [items, setItems] = useState(getShoppingCartProducts())
    const [selectedIds, setSelectedIds] = useState(getSelectedShoppingCartProductIds())

    const getItemDetails = (item) => {
        return <div key={item.shoppingCartId}>
            <img width={"200px"} src={ENDPOINTS.Media + "/" + item.image}></img>
            {item.name}
            {item.price}
        </div>
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Order Summary"
        >
            <div className="order-summary-container">
                <div>
                    <h2>Order Summary</h2>
                    {orderSummary && (
                        <div>
                            <p>Contact Details:</p>
                            <p>Name: {orderSummary.contact.name}</p>
                            <p>Street: {orderSummary.contact.street}</p>
                            <p>Post Code: {orderSummary.contact.post_code}</p>
                            <p>City: {orderSummary.contact.city}</p>
                            <p>Phone: {orderSummary.contact.phone}</p>
                            <p>Email: {orderSummary.contact.email}</p>
                            <p>Delivery Method: {getDeliveryMethodName(orderSummary.delivery)}</p>
                            {orderSummary.payment && <p>Payment Method: {orderSummary.payment}</p>}
                        </div>
                    )}
                </div>
                <div>
                    <div>
                        <h3>Ordered Products</h3>
                        {items.length > 0 ?
                            <>
                                <div>
                                    {items.filter(item => selectedIds.includes(item.id)).map(item => getItemDetails(item))}
                                </div>
                            </>
                            : <p>Empty basket. Add something..</p>}
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button onClick={onRequestClose}>Close</button>
            </div>

        </Modal>
    );
};

export default OrderSummaryModal;
