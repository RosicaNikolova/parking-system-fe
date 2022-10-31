import React from 'react'
import ListOfMeetings from "../components/ListOfMeetings";
import Navbar from "../components/Navbar";

function Overview() {
    return (
        <div>
            <div className="top-panel">
                <h3>WebApp</h3>
            </div>
            <Navbar />
            <ListOfMeetings />
        </div>
    )
}

export default Overview;