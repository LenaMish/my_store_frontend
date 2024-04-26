import React from "react";
import { useState } from "react";
import Modal from 'react-modal';
import { ENDPOINTS } from '../../api/endpoints';
import { getSelectedShoppingCartProductIds, getShoppingCartProducts, removeProductFromShoppingCart } from "../../shoppingCart/shoppingCart";
import Paypal from "./Paypal.component";
import './OrderSummaryModal.css'; 
import { useContext } from "react";
import { TokenContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";


const OrderSummaryModal = ({ isOpen, onRequestClose, orderSummary }) => {
    const [items, setItems] = useState(getShoppingCartProducts())
    const [selectedIds, setSelectedIds] = useState(getSelectedShoppingCartProductIds())
    const [delivery, setDelivery] = useState({})

    const {token} = useContext(TokenContext)
    const navigate = useNavigate()

    const getDelivery = async (deliveryId) => {
        if(deliveryId == null) {
            return
        }

        try {
            const response = await axios.get(ENDPOINTS.Delivery + `/${deliveryId}`)
            if(response.status === 200) {
                setDelivery(response.data)
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(orderSummary != null) {
            getDelivery(orderSummary.delivery)
        }
    }, [orderSummary])

    const calculateTotal = () => {
        let total = 0;
        items.filter(item => selectedIds.includes(item.id)).forEach(item => {
            total += parseFloat(item.price);
        });
        if(delivery != null && delivery.price != undefined) {
            total += parseFloat(delivery.price)
        }

        return total.toFixed(2);
    };
    

    const getItemDetails = (item) => {
        return (
            <div key={item.shoppingCartId} className="item-details">
                <img className="item-image" width="100px" src={ENDPOINTS.Media + "/" + item.image} alt={item.name} />
                <div className="item-info">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">{item.price}</p>
                </div>
            </div>
        );
    }

    const createOrder = async() => {
        const body = {
            delivery: orderSummary.delivery,
            payment_type: orderSummary.payment,
            items: items
                .filter(item => selectedIds.includes(item.id))
                .map(item => ({product_id: item.productId, color: item.selectedColor, size: item.selectedSize})),
            ...orderSummary.contact
        }
        
        try {
            const response = await axios.post(ENDPOINTS.Transaction, body, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            if (response.status === 200) {
                return orderSummary.payment === "online" ? response.data.id : "Success"
            }
        } catch (error) {
            console.log(error.response.data.message)
            return null
        }
    }

    const onApprove = async (data) => {
        console.log(data)
    
        const body = {}
        
        try {
            const response = await axios.post(ENDPOINTS.TransactionFinished.replace("{paypal_id}", data.orderID), body, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            toast.success("Success")
            items
                .filter(item => selectedIds.includes(item.id))
                .forEach(item => removeProductFromShoppingCart(item.id))
            navigate("/")
            return response.data
        } catch (error) {
            console.log(error.response.data.message)
            return error.response.data
        }
    }

    const createOrderByCash = async () => {
        const response = await createOrder()
        if(response === "Success") {
            toast.success("Success")
            items
                .filter(item => selectedIds.includes(item.id))
                .forEach(item => removeProductFromShoppingCart(item.id))
            navigate("/")
        } else {
            toast.error("Failed to fetch response")
        }
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
                            <p>Delivery Method: {delivery.name} ({delivery.price}zł)</p>
                            {orderSummary.payment && <p>Payment Method: {orderSummary.payment}</p>}
                            <p>Total: {calculateTotal()}</p>
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
                {orderSummary != null &&
                 (orderSummary.payment === "online" ? 
                <Paypal createOrder={createOrder} onApprove={onApprove}/> : 
                <button className="close-button" onClick={createOrderByCash}>Approve payment by cash</button> )}
                <button className="close-button" onClick={onRequestClose}>Close</button>
            </div>
        </Modal>
    );
};

export default OrderSummaryModal;
