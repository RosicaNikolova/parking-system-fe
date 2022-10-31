import React, { useState } from "react";
import Navbar from "../components/Navbar";

import axios from "axios";

export default function EditMeeting(props) {

    const oldMeeting = {
        // firstName: "VisitorTestFirstName",
        // lastName: "VisitorTestLastName",
        // email: "VisitorTestEmail",
        // phoneNumber: "+327889541236",
        // employee: "EmployeeTestName",
        availability: "11-12",
        date: "2022-10-05T11:09",
        // licensePlate: "MeetingTestLicensePlate",
        // comesByCar: true
    };

    const [editedMeeting, setEditedMeeting] = useState(oldMeeting);

    // const [checked, setChecked] = useState(oldMeeting.comesByCar)
    // const handleClick = () => setChecked(!checked)

    const handleChange = (event) => {
        if (event.target.name === "comesByCar") {
            const name = event.target.name;
            const value = event.target.checked;
            setEditedMeeting(values => ({ ...values, [name]: value }));
        }
        else {
            const name = event.target.name;
            const value = event.target.value;
            setEditedMeeting(values => ({ ...values, [name]: value }));
        }
    }

    //Put
    function put() {
        alert(JSON.stringify(editedMeeting)+" "+props.id);

        axios
           .put("http://localhost:8080/appointment", JSON.stringify({
               id: props.id,
               dateTime: editedMeeting.date,
           }),{
           headers: { 'Content-Type': 'application/json' } 
           })
    }
    return (
        <div>
            <div className="top-panel">
                <h3>Edit Meeting</h3>
            </div>
            <div className="page-layout">
                <div className="page-container">
                    <Navbar />
                    <form onSubmit={put} className="form-create-meeting">
                        {/* <span>Appointment with<input placeholder={oldMeeting.employee} type="text"
                            name="employee"
                            value={editedMeeting.employee || ""}
                            onChange={handleChange} /></span> */}
                        <span>Date<input type="datetime-local" name="date"
                            value={editedMeeting.date || ""}
                            onChange={handleChange} /></span>
                        <span>Availability<select name="availability" value={editedMeeting.availability || ""} onChange={handleChange}>
                            <option value="9-10">9am-10am</option>
                            <option value="10-11">10am-11am</option>
                            <option value="11-12">11am-12pm</option>
                            <option value="12-13">12pm-13pm</option>
                        </select></span>
                        {/* <span>First name<input placeholder={oldMeeting.firstName} type="text" name="firstName"
                            value={editedMeeting.firstName || ""}
                            onChange={handleChange} /></span>
                        <span>Last name<input placeholder={oldMeeting.lastName} type="text" name="lastName"
                            value={editedMeeting.lastName || ""}
                            onChange={handleChange} /></span>
                        <span>Phone number<input placeholder={oldMeeting.phoneNumber} type="text" name="phoneNumber"
                            value={editedMeeting.phoneNumber || ""}
                            onChange={handleChange} /></span>
                        <span>Email<input placeholder={oldMeeting.email} type="text" name="email"
                            value={editedMeeting.email || ""}
                            onChange={handleChange} /></span>
                        <span>By car<input type="checkbox" name="comesByCar"
                            value={editedMeeting.comesByCar || checked}
                            onChange={handleChange} onClick={handleClick} checked={checked} />{checked && (<input placeholder={oldMeeting.licensePlate} type="text" name="licensePlate"
                                value={editedMeeting.licensePlate || ""}
                                onChange={handleChange} />)}</span> */}
                        <button onClick={put} className="submit-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}