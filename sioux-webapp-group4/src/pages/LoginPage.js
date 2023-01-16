import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/App.css";
import AuthenticationService from "../services/AuthenticationService";

function LoginPage() {

    let navigate = useNavigate();
    const [message, setMessage] = useState("");

    const [user, setUser] = useState(
        {
            email: "",
            password: ""
        }
    );
    const { email, password } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        AuthenticationService.login(user)
            .then(response => {
                const accessToken = response.accessToken;
                const roles = response.roles;
                //for debug
                console.log("Login: " + "AccessToken: " + accessToken);
                console.log("Roles: " + roles);
                navigate("/overview");
                window.location.reload();
            })
            .catch(message => setMessage("Ivalid credentials"));
    };
    return (
        <div>
            {/* <div className="top-panel">
                <h3>Login Page</h3>
            </div> */}
            <div className="page-layout">
                {/* <Login /> */}
                <section className="signup">
                        <form onSubmit={(e) => onSubmit(e)} className="logincard">
                        <section className="sign-in-panel">
                            <h3>Sign In</h3>
                        </section>
                            <div>
                                <span>Email address</span>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <span>Password</span>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>
                            <div>
                                <button type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div>{message}</div>
                    </section>
            </div>
        </div>
    )
}

export default LoginPage;