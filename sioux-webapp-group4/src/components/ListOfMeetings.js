import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';

function ListOfMeetings(props) {
    
    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get("http://localhost:8080/appointment/appointments", {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setMeetings(response.data.appointmentList)
            console.log(response.data.appointmentList)
        });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    const [showedMeetings, setShowedMeetings] = useState(meetings);
    let navigate = useNavigate();
    const showMeetings = () => {
        if(props.typedName === ""){
            setShowedMeetings(meetings);
            console.log("zkouska prazdnej string hotovo");
        }else{
            meetings.filter(meeting => meeting.lastNameEmployee.includes(props.typedName)).map(filteredMeeting => (
                setShowedMeetings(filteredMeeting)
            ));
            console.log("zkouska S "+ showedMeetings);
            console.log("hotovo2");
        }
    }
    
    useEffect(()=>{
        showMeetings();
    },[props.typedName])

    const openUpdate = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleRemove =
        (id) => {
            axios.delete("http://localhost:8080/appointment/" + id, {
                headers: { 'Content-Type': 'application/json' }
            }).then(
                setMeetings(meetings.filter(item => item.id !== id)))
            alert("Deleted")
        }

    return (
        <div id="meetings" className="list">
            <table>
                <thead>
                    <tr>
                        <th>Nr.</th>
                        <th>Employee name</th>
                        <th>Visitor name</th>
                        <th>Phone number</th>
                        <th>Visitors email</th>
                        <th>By car</th>
                        <th>Time</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showedMeetings.map((item, i) => {
                        return (
                            <tr key={item.id}>
                                <td>{i}</td>
                                <td>{item.firstNameEmployee + " " + item.lastNameEmployee}</td>
                                <td>{item.firstNameVisitor + " " + item.lastNameVisitor}</td>
                                <td>{item.phoneVisitor}</td>
                                <td>{item.emailVisitor}</td>
                                <td>{JSON.stringify(item.comesByCar)}</td>
                                <td>{item.dateTime}</td>
                                <td>
                                    <button id="edit" onClick={() => openUpdate(item.id)}>Edit</button>
                                </td>
                                {<td><button id="remove" onClick={() => handleRemove(item.id)} type="submit" value={item.id}>Remove</button></td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListOfMeetings;