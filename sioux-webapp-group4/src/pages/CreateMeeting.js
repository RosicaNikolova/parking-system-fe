import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function CreateMeeting() {

    // with axious we get the meetings HERE!!!
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
    // here we store available filtered meetings, if we have method for this, we dont need initial meetings
    const [availableMeetings, setAvailableMeetings] = useState(initialMeetings);
    const mockEmployees = [
        {
            firstName: "Jakub",
            lastName: "Jelinek",
            email: "jelinej2012@gmail.com"
        },
        {
            firstName: "John",
            lastName: "Doe",
            email: "johnDoe@gmail.com"
        },
        {
            firstName: "Emily",
            lastName: "Holy",
            email: "emilyHoly@gmail.com"
        },
    ]
    // our main meeting -> this is sent to backend
    const [meeting, setMeeting] = useState({});


    //filters the meetings by date selected
    useEffect(() => {
        retrieveFilteredMeetings();
    },[meeting.dateForFiltering]);

    const retrieveFilteredMeetings = () => {
        const filtered = initialMeetings.filter(input =>
            Object.values(input).some(val =>
                typeof val === "string" && val.includes(meeting.dateForFiltering)));
        setAvailableMeetings(filtered);
    }
    //setAvailableMeetings will be used in axios getMeetingsByDate
    
    const [employeesName, setEmployeesName] = useState("");
    const [employees, setEmployees] = useState(mockEmployees);
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    //thanks to this method we can search through employees on every change in input
    useEffect(() => {
        if (employeesName !== "") {
            document.getElementById("dropdown").style.display = "block";
            retrieveEmployeesWithSearchedLastName(employeesName);
             //this one will list all the employees into dropdown
        }
        else {
            document.getElementById("dropdown").style.display = "none";
            // retrieveEmployees();
        }
    });

    const pickAvailableMeeting = (availableMeeting) => {
        setMeeting(meeting => ({ ...meeting, date: meeting.dateForFiltering+"T"+availableMeeting.dateTime.split('T')[1]}))

    }

    const textChangedName = e => {
        setEmployeesName(e.target.value);
    }

    //retrieves employees with input name
    const retrieveEmployeesWithSearchedLastName = (employeesName) => {
        const filtered = mockEmployees.filter(input =>
            Object.values(input).some(val =>
                typeof val === "string" && val.includes(employeesName)));
        setEmployees(filtered);
        //here we need method from backend which recieves 
    };

    const selectEmployee = (employeeSearched) => {
        setMeeting(meeting => ({ ...meeting, employeesEmail: employeeSearched.email, employeesFirstName: employeeSearched.firstName, employeesLastName: employeeSearched.lastName }))
    }

    //Post
    function add() {
         alert("Request has been sent")
        // alert(JSON.stringify(meeting));
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
                    "firstName": meeting.employeesFirstName,
                    "lastName": meeting.employeesLastName,
                    "email": meeting.employeesEmail //probably we use useEffect for searching for employees email by his last name
                },
                dateTime: meeting.date,
                licensePlate: meeting.licensePlate,
                comesByCar: meeting.byCar
            }), {
                headers: { 'Content-Type': 'application/json' }
            })
    }

    const handleChange = (event) => {
        if (event.target.name === "byCar") {
            const name = event.target.name;
            const value = event.target.checked;
            setMeeting(values => ({ ...values, [name]: value }));
        }
        else {
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
                    <div className="create-meeting">
                        <div className="create-meeting-divider">
                            <hr />
                            <p> Employee </p>
                            <hr />
                        </div>
                        <span>Appointment with
                            <input onChange={textChangedName} type="text" placeholder="Employee's last name"></input>
                        </span>
                        <div id="dropdown" className="create-meeting-employee-dropdown">
                            {employees.map((employeeSearched, i) => {
                                return (
                                    <div key={i} className="create-meeting-employee-dropdown-individual">
                                        <p>{employeeSearched.email}</p>
                                        <p>{employeeSearched.firstName} {employeeSearched.lastName}</p>
                                        <button className="submit-btn" onClick={() => selectEmployee(employeeSearched)}>Select</button>
                                    </div>
                                )
                            })}
                        </div>
                        <span>Email<input type="text" disabled={true}
                            value={meeting.employeesEmail}/></span>
                        {/* after selecting above, it will show filtered available time slots with dateTime local format */}
                        <span>Date<input type="date" name="dateForFiltering"
                                value={meeting.dateForFiltering || ""}
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
                        <span>Selected date and time for meeting<input type="dateTime-local" value={meeting.date} disabled={true} /></span>
                        {/* onSubmit={add} */}
                        <form>  
                            <div className="create-meeting-divider">
                                <hr />
                                <p> Visitor </p>
                                <hr />
                            </div>
                            <span>First name<input placeholder="First name" type="text" name="firstName"
                                value={meeting.firstName || ""}
                                onChange={handleChange} /></span>
                            <span>Last name<input placeholder="Last name" type="text" name="lastName"
                                value={meeting.lastName || ""}
                                onChange={handleChange} /></span>
                            <span>Phone number<input placeholder="Phone number" type="text" name="phone"
                                value={meeting.phone || ""}
                                onChange={handleChange} /></span>
                            <span>Email<input placeholder="Email" type="email" name="email"
                                value={meeting.email || ""}
                                onChange={handleChange} /></span>
                            <span>By car<input type="checkbox" name="byCar"
                                value={meeting.byCar || checked}
                                onChange={handleChange} onClick={handleClick} checked={checked} />{checked && (<input placeholder="License plate" type="text" name="licensePlate"
                                    value={meeting.licensePlate || ""}
                                    onChange={handleChange} />)}</span>
                            <button onClick={add} className="submit-btn" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


// <span>Availability<select name="availability" value={meeting.availability} onChange={handleChange}>
//                             <option value="9-10">9am-10am</option>
//                             <option value="10-11">10am-11am</option>
//                             <option value="11-12">11am-12pm</option>
//                             {/* this value is taken 11-12 */}
//                             <option value="12-13">12pm-13pm</option>
//                         </select></span>

