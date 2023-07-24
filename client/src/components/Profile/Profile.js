// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from "../Navbar/Navbar";
// import MyReservations from '../Reservation/MyReservations';

// export default function Profile() {
//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneno: "",
//         gender: "",
//         dob: ""
//     });

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3100/user/getById/${localStorage.getItem('user-info')._id}`);
//                 setUser(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUser((prevUser) => ({ ...prevUser, [name]: value }));
//     };

//     const handleSubmit = async () => {
//         try {
//             await axios.put(`http://localhost:3100/user/update/${localStorage.getItem('user-info')._id}`, user);
//             // You can add a success notification or redirect to another page after successful update
//         } catch (error) {
//             console.log(error);
//             // Handle error and show appropriate message
//         }
//     };

//     return (
//         <>
//             <Navbar />
//             <div id="reservation" className="reservations-main pad-top-100 pad-bottom-100">
//                 <div className="container">
//                     <div className="row">
//                         <div className="form-reservations-box">
//                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                                 <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
//                                     <h2 className="block-title text-center">
//                                         Profile
//                                     </h2>
//                                 </div>
//                                 <div style={{ marginTop: "5%" }}>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className="form-box">
//                                             <input type="text" value={user.firstName} onChange={handleInputChange} name="firstName" placeholder="First Name" required />
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className="form-box">
//                                             <input type="text" value={user.lastName} onChange={handleInputChange} name="lastName" placeholder="Last Name" required />
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className="form-box">
//                                             <input type="email" value={user.email} onChange={handleInputChange} name="email" placeholder="Email" required />
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className="form-box">
//                                             <input type="number" value={user.phoneno} onChange={handleInputChange} name="phoneno" placeholder="Phone No" required />
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className="form-box">
//                                             <select name="gender" value={user.gender} onChange={handleInputChange}>
//                                                 <option value="" disabled>Gender</option>
//                                                 <option value="male">Male</option>
//                                                 <option value="female">Female</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                                         <div className="form-box">
//                                             <input type="date" value={user.dob} onChange={handleInputChange} name="dob" required />
//                                         </div>
//                                     </div>

//                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                                         <div className="reserve-book-btn text-center">
//                                             <button onClick={handleSubmit} className="hvr-underline-from-center" type="submit" value="SEND" id="submit">EDIT PROFILE</button>
//                                         </div>
//                                     </div>
//                                     <MyReservations />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";

export default function Profile() {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneno: "",
        gender: "",
        dob: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3100/user/getById/${localStorage.getItem('user-info')._id}`);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            // Create a separate object with only the fields to update
            const updatedUserData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneno: user.phoneno,
                gender: user.gender,
                dob: user.dob
            };

            // Send the updated user data in the request body
            await axios.put(`http://localhost:3100/user/update/${localStorage.getItem('user-info')._id}`, updatedUserData);
            // You can add a success notification or redirect to another page after successful update
        } catch (error) {
            console.log(error);
            // Handle error and show appropriate message
        }
    };

    return (
        <>
            <Navbar />
            <div id="reservation" className="reservations-main pad-top-100 pad-bottom-100">
                <div className="container">
                    <div className="row">
                        <div className="form-reservations-box">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                                    <h2 className="block-title text-center">
                                        Profile
                                    </h2>
                                </div>
                                <div style={{ marginTop: "5%" }}>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-box">
                                            <input type="text" value={user.firstName} onChange={handleInputChange} name="firstName" placeholder="First Name" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-box">
                                            <input type="text" value={user.lastName} onChange={handleInputChange} name="lastName" placeholder="Last Name" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-box">
                                            <input type="email" value={user.email} onChange={handleInputChange} name="email" placeholder="Email" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-box">
                                            <input type="number" value={user.phoneno} onChange={handleInputChange} name="phoneno" placeholder="Phone No" required />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-box">
                                            <select name="gender" value={user.gender} onChange={handleInputChange}>
                                                <option value="" disabled>Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div className="form-box">
                                            <input type="date" value={user.dob} onChange={handleInputChange} name="dob" required />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="reserve-book-btn text-center">
                                            <button onClick={handleSubmit} className="hvr-underline-from-center" type="submit" value="SEND" id="submit">EDIT PROFILE</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

