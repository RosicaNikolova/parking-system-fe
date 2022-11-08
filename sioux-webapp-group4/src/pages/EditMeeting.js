import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

import axios from "axios";

export default function EditMeeting(props) {

    const [initialMeetings, setInitialMeetings] = useState([
        {
            id:1,
            dateTime: "2022-11-17T11:00",
        },
        {
            id:2,
            dateTime: "2022-11-15T11:30",
        },
        {
            id:3,
            dateTime: "2022-11-17T12:00",
        },
        {
            id:4,
            dateTime: "2022-11-20T12:30",
        },
        {
            id:5,
            dateTime: "2022-11-17T13:00",
        }
    ]);
    const [availableMeetings, setAvailableMeetings] = useState(initialMeetings);

    const [oldMeeting, setOldMeeting] = useState(
        {
        id: props.id,
        comesByCar: props.comesByCar,
        dateTime: props.dateTime,
        licensePlate: props.licensePlate
    }
    );

    const [editedMeeting, setEditedMeeting] = useState(oldMeeting);
    const [checked, setChecked] = useState(oldMeeting.comesByCar);

    // filteres availabale meetings
    useEffect(() => {
        retrieveFilteredMeetings();
        console.log(JSON.stringify(availableMeetings));
    },[editedMeeting.dateForFiltering]);

    const retrieveFilteredMeetings = () => {
        const filtered = initialMeetings.filter(input =>
            Object.values(input).some(val =>
                typeof val === "string" && val.includes(editedMeeting.dateForFiltering)));
        setAvailableMeetings(filtered);
        console.log("vytvoril se novej list");
    }
    // concatenates date into the right format
    const pickAvailableMeeting = (availableMeeting) => {
        setEditedMeeting(meeting => ({ ...meeting, dateTime: editedMeeting.dateForFiltering+"T"+availableMeeting.dateTime.split('T')[1]}))
    }
    
    const handleClick = () => setChecked(!checked);
 
    //----------------AXIOS----------------
    //Get
    useEffect(() => {
        axios.get("http://localhost:8080/appointment/" + props.id, {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setOldMeeting(response.data)
            console.log(response.data)
        });
    }, [props.id]);

    //Put
    function put() {
        alert("Request has been sent");
        axios
           .put("http://localhost:8080/appointment", JSON.stringify({
               id: props.id,
               dateTime: editedMeeting.dateTime,
               comesByCar: editedMeeting.comesByCar, //is not in backend
               licensePlate: editedMeeting.licensePlate //is not in backend
           }),{
           headers: { 'Content-Type': 'application/json' } 
           })
    }
    //--------------end of axios (2methods) ----------------------

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
    return (
        <div>
            <div className="top-panel">
                <h3>Edit Meeting</h3>
            </div>
            <div className="page-layout">
                <div className="page-container">
                    <Navbar />
                    <div  className="create-meeting">
                    <span>Date<input type="date" name="dateForFiltering"
                                value={editedMeeting.dateForFiltering || ""}
                                onChange={handleChange} /></span>
                        <div className="available-meetings-container">{availableMeetings.map(
                            availableMeeting => {
                                return(
                                    <div className="available-meeting" key={availableMeeting.id}>
                                        <h2>{availableMeeting.dateTime.split('T')[1]}</h2>
                                        <button className="submit-btn" onClick={() => pickAvailableMeeting(availableMeeting)}>Select</button>
                                    </div> 
                                )
                            }
                        )}
                        </div>
                        <span>Selected date and time for meeting<input type="dateTime-local" value={editedMeeting.dateTime} disabled={true} /></span>
                    <form onSubmit={put}>
                        {/* <span>Appointment with<input placeholder={oldMeeting.employee} type="text"
                            name="employee"
                            value={editedMeeting.employee || ""}
                            onChange={handleChange} /></span> */}
                        {/* <span>Date<input type="datetime-local" name="dateTime" placeholder={oldMeeting.dateTime}
                            value={editedMeeting.dateTime || oldMeeting.dateTime}
                            onChange={handleChange} /></span> */}
                        {/* <span>Availability<select name="availability" value={editedMeeting.availability || ""} onChange={handleChange}>
                            <option value="9-10">9am-10am</option>
                            <option value="10-11">10am-11am</option>
                            <option value="11-12">11am-12pm</option>
                            <option value="12-13">12pm-13pm</option>
                        </select></span> */}
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
                            onChange={handleChange} /></span>*/}
                        <span>By car<input type="checkbox" name="comesByCar"
                            value={editedMeeting.comesByCar || checked}
                            onChange={handleChange} onClick={handleClick} checked={checked} />{checked && (<input placeholder={oldMeeting.licensePlate} type="text" name="licensePlate"
                                value={editedMeeting.licensePlate || ""}
                                onChange={handleChange} />)}</span>
                        <button className="submit-btn" type="submit">Submit</button>
                    </form>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}