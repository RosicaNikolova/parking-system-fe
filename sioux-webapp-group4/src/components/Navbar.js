import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService';
import logo from '../images/siouxlogo.png';

export default function Navbar(props) {
    let navigate = useNavigate();
    let admin = false;

    const logout = () => {

        AuthenticationService.logout();
        console.log("logout");
        navigate("/login");
    }

    const linksSecretary = [
        {
            id: 1,
            path: "/overview",
            text: "Overview"
        },
        {
            id: 2,
            path: "/createmeeting",
            text: "Create meeting"
        },
        {
            id:3,
            path:"/employees",
            text:"Employees"
        }
    ]

    const linksAdmin = [
        {
            id: 1,
            path: "/admin",
            text: "Overview"
        },
        {
            id: 2,
            path: "/createemployee",
            text: "Create employee"
        }
    ]



    return ( 
        <nav>
            <img id='logo' src={logo} alt='logo'/>
            <ul>
                {linksSecretary.map(link => {
                    return (
                        <li key={link.id}>
                            <NavLink to={link.path}>
                                {link.text}
                            </NavLink>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className='logout' onClick={logout}>Logout</button>

            </div>
        </nav>
    )
}