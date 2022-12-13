import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationService from '../services/AuthenticationService';

export default function Navbar(props){
    let navigate = useNavigate();

    const logout = ()=>{

        AuthenticationService.logout();
        console.log("logout");
        navigate("/login");
    }
    
    const links = [
        {
            id: 1,
            path: "/overview",
            text: "Overview"
        },
        {
        id: 2,
            path: "/createmeeting",
            text: "Create Meeting"}
    ]


    
    return (
        <nav>
        <ul>
            {links.map(link => {
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
        <button onClick={logout}>Logout</button>

        </div>
    </nav>
    )
}