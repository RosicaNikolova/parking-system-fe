import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import { useNavigate } from "react-router-dom";


export default function TempOverviewMeeting() {
  const [meetings, setMeetings] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get("http://localhost:8080/appointment/appointments", {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      setMeetings(response.data.appointmentList)
      console.log(response.data.appointmentList)
      //console.log(response.data.reservationList)
    });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const openUpdate = (id) => {
    navigate(`/edit/${id}`);
  }

  const handleRemove =
    (id) => {
      axios.delete("http://localhost:8080/appointment/" + id, {
        headers: { 'Content-Type': 'application/json' }
      }).then(
        setMeetings(meetings.filter(item => item.id !== id)))
      //console.log(reservations);
      alert("Deleted")
    }

  return (
    <div id="meetings" className="list">
      <table>
        <thead>
          <tr>
            <th>Employee name</th>
            <th>Visitor name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>By car</th>
            <th id="start">Start time</th>
            <th id="end">End time</th>
            <th>Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            meetings.map((item,i) =>
              <tr key={i}>
                <td>{item.firstNameEmployee + " " + item.lastNameEmployee}</td>
                <td>{item.firstNameVisitor + " " + item.lastNameVisitor}</td>
                <td>{item.phoneVisitor}</td>
                <td>{item.emailVisitor}</td>
                <td>{JSON.stringify(item.comesByCar)}</td>
                <td id="start">{moment(item.dateTime).format("hh:mm")}</td>
                <td id="end">{item.endTime.substring(0, 5)}</td>
                <td>{moment(item.dateTime).format("YYYY-MM-DD")}</td>
                <td>
                  <button id="edit" onClick={() => openUpdate(item.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleRemove(item.id)} type="submit" value={item.id}> Delete</button>
                </td>
              </tr>
              )
          }
        </tbody>
      </table>
    </div>
  );
}