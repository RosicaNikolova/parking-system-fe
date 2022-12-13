import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

export default function EditMeeting(props) {

    // these are parameters for get method -> timeslots!
    const [filters, setFilters] = useState([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    let navigate = useNavigate();
    const [oldMeeting, setOldMeeting] = useState(
        {
            id: props.id,
            // comesByCar: props.comesByCar,
            dateTime: props.dateTime,
            // licensePlate: props.licensePlate
        }
    );
    const [editedMeeting, setEditedMeeting] = useState(oldMeeting);
    //this needs to be replaced by get method
    const initialMeetings = [
        {
            id: 1,
            dateTime: "2022-11-17",
        },
        {
            id: 2,
            dateTime: "2022-11-15",
        },
        {
            id: 3,
            dateTime: "2022-11-17",
        },
        {
            id: 4,
            dateTime: "2022-11-21",
        },
        {
            id: 5,
            dateTime: "2022-11-21",
        },
        {
            id: 6,
            dateTime: "2022-12-21",
        }
    ];
    const [availableMeetings, setAvailableMeetings] = useState(initialMeetings);

    const [datesExpectedValues, setDatesExpectedValues] = useState([]);
    let myArray = []; //here i store dates for calendar

    useEffect(() => {
        convertToExpectedValues();
    })

    //this one converts retrieved dates to expected value so we can see them in calendar
    const convertToExpectedValues = () => {
        for (let day of initialMeetings) {
            myArray.push(addDays(new Date(day.dateTime), 0))
        }
        return setDatesExpectedValues(myArray);
    }

    useEffect(() => {
        filterData();
        //here should be the axios get method
    }, [filters])

    //Axios get timeslots
    async function filterData() {
        axios.get("http://localhost:8080/appointment/", {
            params: {
                id: oldMeeting.employee_id, //employee id
                year: filters.year,
                month: filters.month,
                day: filters.day
            }
        },
            {
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                setAvailableTimeSlots(response.data.timeSlots);
                console.log(filters);
            })
    }

    
    // const [checked, setChecked] = useState(oldMeeting.comesByCar);

    // filteres availabale meetings
    useEffect(() => {
        retrieveFilteredMeetings();
        console.log(editedMeeting.dateForFiltering);
        // console.log(JSON.stringify(availableMeetings));
    }, [editedMeeting.dateForFiltering]);

    const retrieveFilteredMeetings = () => {
        const filtered = initialMeetings.filter(input =>
            Object.values(input).some(val =>
                typeof val === "string" && val.includes(editedMeeting.dateForFiltering)));
        setAvailableMeetings(filtered);
    }

    // concatenates date into the right format
    const pickAvailableMeeting = (availableTimeSlot) => {
        setEditedMeeting(meeting => ({ ...meeting, dateTime: editedMeeting.dateForFiltering + "T" + availableTimeSlot }))
    }

    // const handleClick = () => setChecked(!checked);

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
                // comesByCar: editedMeeting.comesByCar, //is not in backend
                // licensePlate: editedMeeting.licensePlate //is not in backend
            }), {
                headers: { 'Content-Type': 'application/json' }
            })
        navigate("/overview");
    }
    //--------------end of axios (2methods) ----------------------

    const [startDate, setStartDate] = useState(oldMeeting.dateTime);
    // const handleChange = (event) => {
    //     // if (event.target.name === "comesByCar") {
    //     //     const name = event.target.name;
    //     //     const value = event.target.checked;
    //     //     setEditedMeeting(values => ({ ...values, [name]: value }));
    //     // }
    //     // else {
    //     //     const name = event.target.name;
    //     //     const value = event.target.value;
    //     //     setEditedMeeting(values => ({ ...values, [name]: value }));
    //     // }
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setEditedMeeting(values => ({ ...values, [name]: value }));
    // }
    return (
        <div>
            <div className="top-panel">
                <h3>Edit Meeting</h3>
            </div>
            <div className="page-layout">
                <div className="page-container">
                    <Navbar />
                    <div className="create-meeting">
                        <span>Date
                            <DatePicker
                                inline
                                type="date"
                                dateFormat="yyyy/MM/dd"
                                selected={startDate}
                                highlightDates={datesExpectedValues}
                                includeDates={datesExpectedValues}
                                onChange={(date) => { setEditedMeeting(values => ({ ...values, dateForFiltering: moment(date).format("YYYY-MM-DDTkk:mm").split('T')[0] })); setStartDate(date); setFilters(params => ({ ...params, year: moment(date).format("YYYY"), month: moment(date).format("MM"), day: moment(date).format("DD") })) }}
                            />
                        </span>
                        <div className="available-meetings-container">{availableTimeSlots.map(
                            (availableTimeSlot, j) => {
                                return (
                                    <div className="available-meeting" key={j}>
                                        <h2>{availableTimeSlot}</h2>
                                        <button className="submit-btn" onClick={() => pickAvailableMeeting(availableTimeSlot)}>Select</button>
                                    </div>
                                )
                            }
                        )}
                        </div>
                        
                        <span>Selected date and time for meeting<input type="dateTime-local" value={editedMeeting.dateTime} disabled={true} /></span>
                        <form onSubmit={put}>
                            {/* <span>By car<input type="checkbox" name="comesByCar"
                                value={editedMeeting.comesByCar || checked}
                                onChange={handleChange} onClick={handleClick} checked={checked} />{checked && (<input placeholder={oldMeeting.licensePlate} type="text" name="licensePlate"
                                    value={editedMeeting.licensePlate || ""}
                                    onChange={handleChange} />)}</span> */}
                            <button className="submit-btn" type="submit">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}