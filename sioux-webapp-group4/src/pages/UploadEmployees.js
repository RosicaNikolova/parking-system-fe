import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UploadEmployees(props) {
    let navigate = useNavigate();
    return (
        <div>
            <div id="1" className="page-layout">
            <Navbar showSecretaryBoard={props.showSecretaryBoard} showAdminBoard={props.showAdminBoard} isAuth={props.isAuth}/>
                <div className="page-container">
                    <h2>Admin</h2>
                    <div className="overview">
                        <div className='overview-nav'>
                            <h3>Upload employees</h3>
                        </div>
                        <form id="upload">
                            <input id="csv_uploads" type="file" accept=".csv"/>
                            <button id="upload-btn">Import</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}