import React from 'react';
import './App.css';

const data = [
    { visitor: "Anom", email: "anom@gmail.com", phone: "+31 722 635 269", appointmentWith: "Bob", date: "10-11-2022", time: "15:00", withCar: "yes", licensePlate: "B153LEO" },
    { visitor: "Megha", email: "megha@gmail.com", phone: "+31 722 635 269", appointmentWith: "Steve", date: "12-11-2022", time: "12:00", withCar: "no", licensePlate: "" },
    { visitor: "Subham", email: "subham@gmail.com", phone: "+31 722 635 269", appointmentWith: "Bob", date: "14-11-2022", time: "11:00", withCar: "yes", licensePlate: "B11MTJ"},
]

function ListOfMeetings() {
    return (
        <div className="ListOfMeetings">
            <table>
                <tr>
                    <th>Id</th>
                    <th>Visitor</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Appointment with</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>With Car</th>
                    <th>License Plate</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.visitor}</td>
                            <td>{val.email}</td>
                            <td>{val.phone}</td>
                            <td>{val.appointmentWith}</td>
                            <td>{val.date}</td>
                            <td>{val.time}</td>
                            <td>{val.withCar}</td>
                            <td>{val.licensePlate}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default ListOfMeetings;