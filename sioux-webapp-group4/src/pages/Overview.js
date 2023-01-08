import React, {useState, useEffect} from 'react'
import ListOfMeetings from "../components/ListOfMeetings";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';

function Overview() {
    let navigate = useNavigate();
    const [employeesName, setEmployeesName] = useState("");
    useEffect(()=>{
        console.log(employeesName);
    },[employeesName])
    return (
        <div>
            <div className="page-layout">
                <Navbar />
                <div className="page-container">
                    {/* later take it from jwt decoded token */}
                    <h2>Secretary</h2>
                    <input 
                        className='search' 
                        placeholder='Search name'
                        type='text'
                        onChange={e => setEmployeesName(e.target.value)}
                        value={employeesName || ""}
                     />
                    <div className='overview'>
                        <div className='overview-nav'>
                            <h3>Appointment overview</h3>
                            <button onClick={() => navigate("/createmeeting")} id='create'>Create meeting</button>
                        </div>
                        <ListOfMeetings typedName={employeesName}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Overview;