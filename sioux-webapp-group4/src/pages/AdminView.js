import React from "react";
import Navbar from "../components/Navbar";

export default function AdminView(){
    return (
        <div>
            <div className="top-panel" style={{backgroundColor: "#6cbac7"}}>
            <h3>Admin - maybe IT department?</h3>
            </div>
            <div id="1" className="page-layout">
                <div className="page-container">
                    <Navbar/>
                    <div className="create-meeting">
                        <form>
                            <span>Import CSV employees data<input type="file" accept=".csv"/></span>
                            <button className="submit-btn" style={{backgroundColor: "#6cbac7", boxShadow: "2px 2px 20px #B8DED0"}}>Import</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}