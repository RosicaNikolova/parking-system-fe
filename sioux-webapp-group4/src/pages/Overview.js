import React from 'react'
import ListOfMeetings from "../components/ListOfMeetings";
import Navbar from "../components/Navbar";

function Overview() {
    return (
        <div>
            <div className="top-panel">
                <h3>Meetings overview</h3>
            </div>
            <div className="page-layout">
                <div className="page-container">
                    <Navbar />
                    <ListOfMeetings />
                </div>
            </div>
        </div>
    )
}

export default Overview;