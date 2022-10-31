import React, {useState, useEffect} from "react";
import axios from "axios";

export default function TempOverviewMeeting()
{
    const [meetings, setMeetings] = useState([]);
  
      useEffect(() => {
          // GET request using axios inside useEffect React hook
          axios.get("http://localhost:8080/appointment/appointments",{
            headers: { 'Content-Type': 'application/json' } 
            }).then((response) => {
                setMeetings(response.data.appointmentList)
                console.log(response.data.appointmentList)
                  //console.log(response.data.reservationList)
              } );
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
      }, []);
  
      const handleRemove = 
      (id) => 
              {
                axios.delete("http://localhost:8080/appointment/"+id,{
                    headers: { 'Content-Type': 'application/json' } 
                    }).then(
                    setMeetings(meetings.filter(item => item.id !== id))) 
                  //console.log(reservations);
                alert("Deleted")
              }
  
      return (
          <div className="AppointmentOverview">
      <table>
        <thead>
          <tr>
            <th>Employee name</th>
            <th>Visitor name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>By car</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
        {
        meetings.map(item => 
              <tr>
              <td>{item.firstNameEmployee+" "+item.lastNameEmployee}</td>
              <td>{item.firstNameVisitor+" "+item.lastNameVisitor}</td>
              <td>{item.phoneVisitor}</td>
              <td>{item.emailVisitor}</td>
              <td>{JSON.stringify(item.comesByCar)}</td>
              <td>{item.dateTime}</td>
              {/* <td><button href={"/appointment/edit/" + item.id}>update</button></td> */}
              <td><a href={"/edit/" + item.id} target="_blank" rel="noreferrer">
              <button>Update</button>
              </a></td>
              { <td><button onClick= {() => handleRemove(item.id)} type="submit" value={item.id}> Delete</button></td> }
              </tr>)
        }
        </tbody>
      </table>
      </div>
      );
  }