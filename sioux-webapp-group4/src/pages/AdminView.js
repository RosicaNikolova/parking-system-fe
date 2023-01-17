import React from "react";
import ListOfEmployees from "../components/ListOfEmployees";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

export default function AdminView(props) {
    let navigate = useNavigate();
    return (
        <div>
            <div id="1" className="page-layout">
                <Navbar showSecretaryBoard={props.showSecretaryBoard} showAdminBoard={props.showAdminBoard} isAuth={props.isAuth}/>
                <div className="page-container">
                    <h2>Admin</h2>
                    <div className="overview">
                        <div className='overview-nav'>
                            <h3>Employee overview</h3>
                            <div className='overview-nav-buttons'>
                            <button onClick={() => navigate("/uploademployees")} id='create'>Upload employees</button>
                            <button onClick={() => navigate("/createemployee")} id='create'>Create employee</button>
                            <button onClick={() => navigate("/createsecretary")} id='create'>Create secretary</button>
                            </div>
                            
                        </div>
                        <ListOfEmployees />
                    </div>
                </div>
            </div>
        </div>
    )
}