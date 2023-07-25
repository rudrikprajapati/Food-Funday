// MyOrders.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders for the specified user using the user's ID
    axios.get(`http://localhost:3100/order/user/${userId}`)
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <div>
        <Navbar />
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status_id.status_name}</p>
              <p>Comments: {order.comments}</p>
              <p>Timestamp: {order.timestamp}</p>
              <h4>Order Food Details:</h4>
              <ul>
                {order.orderFoodDetails.map((orderFood) => (
                  <li key={orderFood._id}>
                    <p>Food Name: {orderFood.food_id.food_name}</p>
                    <p>Quantity: {orderFood.qty}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;