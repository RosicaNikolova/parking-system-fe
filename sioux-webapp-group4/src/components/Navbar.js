import React from 'react';
import { NavLink } from "react-router-dom";

export default function Navbar(props){
    
    const links = [
        {
            id: 1,
            path: "/overview",
            text: "Overview"
        },
        {
        id: 2,
            path: "/",
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
    </nav>
    )
}