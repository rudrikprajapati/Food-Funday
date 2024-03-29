import React from "react";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/")
        }
    }, [])

    async function signIn() {
        try {
            let item = { email, password };
            let result = await fetch("http://localhost:3100/user/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (result.status === 200) {
                result = await result.json();
                localStorage.setItem("user-info", JSON.stringify(result));
                navigate("/");
            } else if (result.status === 403) {
                alert("Password is incorrect");
            } else if (result.status === 404) {
                alert("No user found");
            } else {
                alert("Error while logging in");
            }
        } catch (error) {
            console.log(error);
            alert("Error while logging in");
        }
    }

    return (
        <>
           <div id="reservation" class="reservations-main pad-top-100 pad-bottom-100">
                <div class="container">
                    <div class="row">
                        <div class="form-reservations-box">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                                    <h2 class="block-title text-center">
                                        Sign In
                                    </h2>
                                </div>
                                {/* <h4 class="form-title">BOOKING FORM</h4> */}
                                <p>PLEASE FILL OUT ALL REQUIRED* FIELDS. THANKS!</p>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-box">
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="E-Mail ID"  />
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="form-box">
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"
                                             id="password" placeholder="Password" required="required" data-error="Password id is required." />
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="reserve-book-btn text-center">
                                            <button onClick={signIn} class="hvr-underline-from-center" type="submit" id="submit">SIGN IN </button>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;