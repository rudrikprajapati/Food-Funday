import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";

export default function Menu() {
  const [APIData, setAPIData] = useState([]);
  const [selectMenu, setSelectMenu] = useState("");
  const [menu, setMenu] = useState([]); // Define the 'menu' state here

  useEffect(() => {
    // Get the menu data from the backend API
    axios.get(`http://localhost:3100/menu/get`).then((response) => {
      setMenu(response.data.data);
    });

    // Get the food data from the backend API
    axios.get(`http://localhost:3100/food/get`).then((response) => {
      setAPIData(response.data.data);
    });
  }, []);

  // Function to handle order submission
  const handleOrderSubmit = async (foodId) => {
    try {
      // You can get the user ID from localStorage or your authentication system.
      const userId = JSON.parse(localStorage.getItem('user-info'))._id;

      const payload = {
        user_id: userId,
        food_id: foodId,
        // You can add more fields here if required, like quantity, special requests, etc.
      };

      // Send the order data to the backend API to be processed.
      const response = await axios.post('http://localhost:3100/order-food/add', payload);
      console.log('Order placed successfully!');
      console.log(response.data); // If you want to handle the response from the server.
    } catch (error) {
      console.log('Error placing the order:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div id="menu" className="menu-main pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <h2 className="block-title text-center">
                  Our Menu
                </h2>
                <h2 className="block-title text-center">Variety of Menus available</h2>

                <div className="center">
                  <div className="form-box">
                    <select value={selectMenu} onChange={(e) => setSelectMenu(e.target.value)}>
                      <option selected >Select Menu</option>
                      {
                        menu.map(data =>
                          <option value={data._id} key={data.id} >{data.menu_name}</option>
                        )
                      }
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <div className="slider slider-single">
                  {
                    APIData.map((data) =>
                      data.menu_id._id === selectMenu ? (
                        <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={data.id}>
                          <div className="offer-item">
                            <div>
                              <h3>{data.food_name}</h3>
                              <p>
                                {data.menu_id.menu_name} <br />
                                {data.description}
                              </p>
                            </div>
                            <div className="offer-price">&#8377;{data.price}</div>
                            <div className="order-button-container">
                              <button
                                onClick={() => handleOrderSubmit(data._id)}
                                style={{
                                  backgroundColor: '#d63c09',
                                  color: '#fff',
                                  padding: '10px 20px',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '16px',
                                  marginTop: '10px',
                                  transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#eb8752'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#d63c09'}
                              >
                                Order Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}