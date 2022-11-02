import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import EditMeeting from "./EditMeeting";
export default function CreateMeeting() {

    const [meeting, setMeeting] = useState({});

    // const updateValue = (inputMeeting, newValue) => {
    //     // const newMeeting = {...meeting, inputName: newValue};
    //     // setMeeting(newMeeting);
    //     setMeeting(values => ({ ...values, [inputMeeting]: newValue }));
    //     // setMeeting(values => ({ ...values, [inputName]: newValue }));
    //     // console.log(meeting);
    //     // setMeeting(newMeeting);
    // }

    //Post
    function add(){ 
     alert("Request has been sent")   
     axios
        .post("http://localhost:8080/appointment", JSON.stringify({
            visitor: 
            {
                "firstName": meeting.firstName,
                "lastName": meeting.lastName,
                "email": meeting.email,
                "phoneNumber": meeting.phone
            }, 
            employee: 
            {
                "firstName": meeting.employee,
                "lastName": meeting.employee,
                "email": ""
            }, 
            dateTime: meeting.date,
            licensePlate: meeting.licensePlate,
            comesByCar: meeting.byCar
        }),{
        headers: { 'Content-Type': 'application/json' } 
        })
    }
    

    //musi byt tady
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(meeting));
    }

    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    const handleChange = (event) => {
        if(event.target.name === "byCar")
        {
            const name = event.target.name;
            const value = event.target.checked;
            setMeeting(values => ({ ...values, [name]: value }));
        }
        else
        {
            const name = event.target.name;
            const value = event.target.value;
            setMeeting(values => ({ ...values, [name]: value }));
        }
    }


    return (
        <div>
            <div className="top-panel">
                <h3>WebApp</h3>
            </div>
            <div className="page-layout">
                <div className="page-container">
                    <Navbar />
                    <form onSubmit={add} className="form-create-meeting">
                        <span>Appointment with<input placeholder="Employee" type="text"
                            name="employee"
                            value={meeting.employee || ""}
                            onChange={handleChange} /></span>
                        <span>Date<input type="datetime-local" name="date"
                            value={meeting.date || ""}
                            onChange={handleChange} /></span>
                        <span>Availability<select name="availability" value={meeting.availability} onChange={handleChange}>
                            <option value="9-10">9am-10am</option>
                            <option value="10-11">10am-11am</option>
                            <option value="11-12">11am-12pm</option>
                            <option value="12-13">12pm-13pm</option>
                        </select></span>
                        <span>First name<input placeholder="First name" type="text" name="firstName"
                            value={meeting.firstName || ""}
                            onChange={handleChange} /></span>
                        <span>Last name<input placeholder="Last name" type="text" name="lastName"
                            value={meeting.lastName || ""}
                            onChange={handleChange} /></span>
                        <span>Phone number<input placeholder="Phone number" type="text" name="phone"
                            value={meeting.phone || ""}
                            onChange={handleChange} /></span>
                        <span>Email<input placeholder="Email" type="text" name="email"
                            value={meeting.email || ""}
                            onChange={handleChange} /></span>
                        <span>By car<input type="checkbox" name="byCar"
                            value={meeting.byCar || checked}
                            onChange={handleChange} onClick={handleClick} checked={checked} />{checked && (<input placeholder="License plate" type="text" name="licensePlate"
                                value={meeting.licensePlate || ""}
                                onChange={handleChange} />)}</span>


                        {/* useEffect method to search through */}

                        <button onclick = {add} className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

