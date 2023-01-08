import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import validation from '../Validation';
import { useNavigate } from "react-router-dom";

export default function CreateMeeting() {

    let navigate = useNavigate();
    const [filters, setFilters] = useState({});
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    //this needs to be replaced by get method
    const initialMeetings = [
        {
            id: 1,
            // dateTime: "2022-11-17T11:00",
            dateTime: "2022-11-17",
        },
        {
            id: 2,
            // dateTime: "2022-11-15T11:30",
            dateTime: "2022-11-15",
        },
        {
            id: 3,
            // dateTime: "2022-11-17T12:00",
            dateTime: "2022-11-17",
        },
        {
            id: 4,
            // dateTime: "2022-11-21T12:30",
            dateTime: "2022-11-21",
        },
        {
            id: 5,
            // dateTime: "2022-11-21T13:00",
            dateTime: "2022-11-21",
        },
        {
            id: 6,
            // dateTime: "2022-12-21T13:00",
            dateTime: "2022-12-21",
        }
    ];
    const [startDate, setStartDate] = useState(new Date());
    const [datesExpectedValues, setDatesExpectedValues] = useState([]);
    let myArray = []; //here i store dates for calendar

    useEffect(() => {
        filterData();
    }, [filters])

    //Axios get timeslots
    async function filterData() {
        axios.get("http://localhost:8080/appointment/", {
            params: {
                id: filters.id, //employeeID!!
                year: filters.year,
                month: filters.month,
                day: filters.day
            }
        },
            {
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                setAvailableTimeSlots(response.data.timeSlots);
                console.log("timeslots:" + response.data.timeSlots);
            })
    }


    useEffect(() => {
        convertToExpectedValues();
    })

    const [availableMeetings, setAvailableMeetings] = useState(initialMeetings);

    //this one converts retrieved dates to expected value so we can see them in calendar
    const convertToExpectedValues = () => {
        for (let day of initialMeetings) {
            myArray.push(addDays(new Date(day.dateTime), 0))
        }
        return setDatesExpectedValues(myArray);
    }
    const [meeting, setMeeting] = useState({
        byCar: false,
    });


    //filters the meetings by date selected
    useEffect(() => {
        retrieveFilteredMeetings();
    }, [meeting.dateForFiltering]);

    const retrieveFilteredMeetings = () => {
        const filtered = initialMeetings.filter(input =>
            Object.values(input).some(val =>
                typeof val === "string" && val.includes(meeting.dateForFiltering)));
        setAvailableMeetings(filtered);
    }

    const [employeesName, setEmployeesName] = useState("");
    const [employees, setEmployees] = useState([]); //needs to be changed for axios
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    //thanks to this method we can search through employees on every change in input
    useEffect(() => {
        if (employeesName !== "") {
            document.getElementById("dropdown").style.display = "block";
            getEmployeesByLastName(employeesName);
            console.log(employees);
        }
        else {
            document.getElementById("dropdown").style.display = "none";
        }
    }, [employeesName]);

    //Sets actual date and time of the meeting
    const pickAvailableMeeting = (availableTimeSlot) => {
        console.log(availableTimeSlot);
        setMeeting(meeting => ({ ...meeting, date: meeting.dateForFiltering + "T" + availableTimeSlot }))
    }

    const textChangedName = e => {
        setEmployeesName(e.target.value);
    }

    async function getEmployeesByLastName(employeesName) {
        axios
            .get("http://localhost:8080/appointment/employees/" + employeesName, {
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                setEmployees(response.data.employeeDTOList);
                console.log(response.data.employeeDTOList);
            }
            )
    }

    //NEED TO BE CHANGED FOR AXIOS GET METHOD
    const selectEmployee = (employeeSearched) => {
        setMeeting(meeting => ({ ...meeting, employeesEmail: employeeSearched.email, employeesFirstName: employeeSearched.firstName, employeesLastName: employeeSearched.lastName }));
        setFilters(params => ({ ...params, id: employeeSearched.id })); //this stores the id of employee
    }
    const [errors, setErrors] = useState("");
    const [passing, setPassing] = useState(true);

    useEffect(()=>{
        // setErrors(validation(meeting, checked));
        setErrors(validation(meeting));
    },[meeting.email, meeting.phone]);

    useEffect(()=>{
        for (const value in errors) {
            if(errors[value] !== ""){
                // alert(errors[value]);
                setPassing(false);
                break;
            }
            else{
                setPassing(true);
            }
        };
    },[errors])

    //Axios post
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(errors));
        if(passing){
            add();
            alert(JSON.stringify(meeting));
            console.log(filters);
            alert("Submitted successfully");
            navigate("/overview"); //added
        }
        else{
            alert("Data are not in the right format!");
        }
    }

    function add() {
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
                    "id": filters.id,
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
            <div className="page-layout">
            <Navbar />
                <div className="page-container">
                <h2>Secretary</h2> 
                <div className="overview">
                <h3>Create appointment</h3>   
                <div className="create-meeting">
                        <div className="create-meeting-divider">
                            <hr />
                            <p> Employee </p>
                            <hr />
                        </div>
                        <span>Appointment with
                            <input
                                onChange={textChangedName}
                                type="text"
                                placeholder="Employee's last name"
                                required={true}
                            ></input>
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
                        <span>Email<input
                            type="email"
                            disabled={true}
                            value={meeting.employeesEmail}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            placeholder="No employee selected"
                            required={true}
                        /></span>
                        <span>Date
                            <DatePicker
                                inline
                                type="date"
                                dateFormat="yyyy/MM/dd"
                                selected={startDate}
                                highlightDates={datesExpectedValues}
                                includeDates={datesExpectedValues}
                                onChange={(date) => { setMeeting(values => ({ ...values, dateForFiltering: moment(date).format("YYYY-MM-DDTkk:mm").split('T')[0] })); setStartDate(date); setFilters(params => ({ ...params, year: moment(date).format("YYYY"), month: moment(date).format("MM"), day: moment(date).format("DD") })) }}
                            />
                        </span>
                        <div className="available-meetings-container">
                            {availableTimeSlots.map(
                                (availableTimeSlot, j) => {
                                    return (
                                        <div className="available-meeting" key={j}>
                                            <h2>{availableTimeSlot}</h2>
                                            <button className="submit-btn" onClick={() => pickAvailableMeeting(availableTimeSlot)}>Select</button>
                                        </div>
                                    )
                                }
                            )
                            }
                        </div>
                        <span>Selected date and time for meeting<input type="dateTime-local" value={meeting.date} disabled={true} /></span>
                        <form>
                            <div className="create-meeting-divider">
                                <hr />
                                <p> Visitor </p>
                                <hr />
                            </div>
                            <span>First name<input
                                placeholder="First name"
                                type="text"
                                name="firstName"
                                value={meeting.firstName || ""}
                                onChange={handleChange}
                                required={true}
                            /></span>
                            <span>Last name<input
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                value={meeting.lastName || ""}
                                onChange={handleChange}
                                required={true}
                            /></span>
                            <span>Phone number<input
                                placeholder="Phone number"
                                type="text"
                                name="phone"
                                value={meeting.phone || ""}
                                onChange={handleChange}
                                required={true}
                            /></span>{errors.phoneNumber && <span id="err">{errors.phoneNumber}</span>}
                            <span>Email<input
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={meeting.email || ""}
                                onChange={handleChange}
                                required={true}
                            />
                            </span>{errors.email && <span id="err">{errors.email}</span>}
                            <span>By car<input type="checkbox" name="byCar"
                                value={meeting.byCar || checked}
                                onChange={handleChange} onClick={handleClick} checked={checked} />{checked && (<input placeholder="License plate" type="text" name="licensePlate"
                                    value={meeting.licensePlate || ""}
                                    onChange={handleChange} />)}</span>{errors.licensePlate && <span id="err">{errors.licensePlate}</span>}
                            <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                    
                </div>
            </div>
        </div>
    )
}


