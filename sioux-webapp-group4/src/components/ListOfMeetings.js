import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';
import BaseUrl from "../services/BaseUrl";

function ListOfMeetings() {
    
    const [meetings, setMeetings] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(BaseUrl.baseUrl+"/appointment/appointments", {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setMeetings(response.data.appointmentList)
            console.log(response.data.appointmentList)
        });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const openUpdate = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleRemove =
        (id) => {
            axios.delete(BaseUrl.baseUrl+"/appointment/" + id, {
                headers: { 'Content-Type': 'application/json' }
            }).then(
                setMeetings(meetings.filter(item => item.id !== id)))
            alert("Deleted")
        }

    return (
        <div className="list-of-meetings">
            <table>
                <thead>
                    <tr>
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
                    {meetings.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.firstNameEmployee + " " + item.lastNameEmployee}</td>
                                <td>{item.firstNameVisitor + " " + item.lastNameVisitor}</td>
                                <td>{item.phoneVisitor}</td>
                                <td>{item.emailVisitor}</td>
                                <td>{JSON.stringify(item.comesByCar)}</td>
                                <td>{item.dateTime}</td>
                                <td>
                                    <button onClick={() => openUpdate(item.id)}>Update</button>
                                </td>
                                {<td><button onClick={() => handleRemove(item.id)} type="submit" value={item.id}> Delete</button></td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListOfMeetings;