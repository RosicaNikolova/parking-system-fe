import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";

import {useNavigate, useParams} from "react-router-dom";


export default function EditEmployee() {
    const{ employeeId } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8080/employee/${employeeId}`).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            firstNameChange(resp.firstName);
            lastNameChange(resp.lastName);
            emailChange(resp.email);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[firstName,firstNameChange]=useState("");
    const[lastName,lastNameChange]=useState("");
    const[email,emailChange]=useState("");



    const navigate=useNavigate();

    const handlesubmit=(e)=> {
        e.preventDefault();
        const employeeData = {id: id, firstName: firstName, lastName: lastName, email: email};


        fetch(`http://localhost:8080/employee`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(employeeData)
        }).then((res) => {
            alert('Saved successfully.')
            navigate(`/employees`);
        }).catch((err) => {
            console.log(err.message)
        })
    }


    return (
        <div>
            <div className="page-layout">
                <Navbar />
                <div className="page-container">
                    <h2>Admin</h2>
                    <div className="overview">
                        <h3>Edit employee</h3>
                        <div className="create-meeting">
                            <form onSubmit={handlesubmit}>
                                <span>First name<input
                                    placeholder="First name"
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e=>firstNameChange(e.target.value)}
                                    required={true}
                                /></span>
                                <span>Last name<input
                                    placeholder="Last name"
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={e=>lastNameChange(e.target.value)}
                                    required={true}
                                /></span>
                                <span>Email<input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e=>emailChange(e.target.value)}
                                    required={true}
                                /></span>
                                {/*</span>{errors.email && <span id="err">{errors.email}</span>}*/}
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}