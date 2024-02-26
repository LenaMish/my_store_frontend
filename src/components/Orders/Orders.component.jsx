import React, { useContext } from 'react';
import { OrdersContext } from '../../context/ordersContext';
import "./Orders.component.css";

const Orders = () => {
  const { orders } = useContext(OrdersContext);

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
