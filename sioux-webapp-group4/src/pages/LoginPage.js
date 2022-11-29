import React, { Component } from "react";
import Login from "../components/Login";
import "../components/App.css";
import Navbar from "../components/Navbar";


function LoginPage() {
    return (
        <div>
            <div className="top-panel">
                <h3>Login Page</h3>
            </div>
            <div className="page-layout">
                <div className="page-container">
                    <Navbar />
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;