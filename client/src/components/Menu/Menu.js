// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from "../Navbar/Navbar";

// export default function Menu() {

//     const [APIData, setAPIData] = useState([]);
//     const [nameFilter, setNameFilter] = useState("");
//     const [selectMenu, setSelectMenu] = useState("");

//     //get data
//     const [menu, setMenu] = useState([]);
  
//     useEffect(() => {
//         //get data
//         axios.get(`http://localhost:3100/menu/get`)
//         .then((response) => {
//             // console.log("r ", response.data.data);
//             setMenu(response.data.data);
//         })

//         axios.get(`http://localhost:3100/food/get`)
//             .then((response) => {
//                // console.log("r ", response.data.data);
//                 setAPIData(response.data.data);
//             })
//     }, [])

//     return (
//         <>
//             <Navbar />
//             <div id="menu" class="menu-main pad-top-100 pad-bottom-100">
//                 <div class="container">
//                     <div class="row">
//                         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                             <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
//                                 <h2 class="block-title text-center">
//                                     Our Menu
//                                 </h2>
//                                 <h2 class="block-title text-center">Variety of Menus available </h2>

//                                 <div class="center">
//                                     <div class="form-box" >
//                                         {/* <select style={{ textAlign: "center" }} name="gender" id="gender" value={selectMenu}
//                                             onChange={(e) => setSelectMenu(e.currentTarget.value, console.log("d ", e.currentTarget.value))}>
//                                             <option selected>Select Menu Category</option>
//                                             <option value="625722f08c940ddf7e2e3920" >Indian</option>
//                                             <option value="625a646f5da82f80c073fd5f" >Chinese</option>
//                                         </select> */}
//                                          <select value={selectMenu} onChange={(e) => setSelectMenu(e.target.value)}>
//                                             <option selected >Select Menu</option>
//                                             {
//                                                 menu.map(data =>

//                                                     <option value={data._id} key={data.id} >{data.menu_name}</option>)
//                                             }
//                                         </select>
                                   
//                                     </div>

//                                 </div>
//                             </div>

//                             <div class="">

//                                 {/* <select
//                                     value={selectMonthFilter}
//                                     onChange={(e) => setSelectMonthFilter(e.currentTarget.value,console.log("d ",e.currentTarget.value))}
//                                 >
//                                     <option value="">---</option>
//                                     <option value="625722f08c940ddf7e2e3920">Indian</option>
//                                     <option value="625a646f5da82f80c073fd5f">Chinese</option>
//                                     <option value="03">Mar</option>
//                                     <option value="04">Apr</option>
//                                     <option value="05">May</option>
//                                     <option value="06">Jun</option>
//                                     <option value="07">Jul</option>
//                                     <option value="08">Aug</option>
//                                     <option value="09">Sep</option>
//                                     <option value="10">Oct</option>
//                                     <option value="11">Nov</option>
//                                     <option value="12">Dec</option>
//                                 </select> */}

//                                 <div class="slider slider-single">
//                                     {
//                                         APIData.map(data => (
//                                             data.menu_id._id === selectMenu ?
//                                                 <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 ">
//                                                     <div class="offer-item" key={data.id}>
//                                                         <div>
//                                                             <h3>{data.food_name}</h3>
//                                                             <p>
//                                                                 {data.menu_id.menu_name} <br></br>
//                                                                 {data.description}
//                                                             </p>
//                                                         </div>
//                                                         <span class="offer-price">&#8377;{data.price}</span>
//                                                     </div>
//                                                 </div> :
//                                                 <div></div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";

export default function Menu() {
  const [APIData, setAPIData] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
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