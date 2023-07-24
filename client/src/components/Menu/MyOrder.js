import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user's orders from the backend API
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/orderfood/getByUserId/${userId}`);
        setOrders(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Food Name</th>
              <th>Menu Name</th>
              <th>Quantity</th>
              {/* Add more fields here if needed */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.order_id}</td>
                <td>{order.food_id.food_name}</td>
                <td>{order.food_id.menu_id.menu_name}</td>
                <td>{order.qty}</td>
                {/* Display more fields here if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
