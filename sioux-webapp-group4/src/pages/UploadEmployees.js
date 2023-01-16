import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Papa from "papaparse";
import axios from "axios";

const url = "http://localhost:8080/employee";

export default function UploadEmployees(props) {
  let navigate = useNavigate();

  const [file, setFile] = useState();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    Papa.parse(file, {
      complete: function (results) {
        results.data.forEach((employee) => {
          try {
            const resp = axios.post(url, {
              email: employee[0],
              firstName: employee[1],
              lastName: employee[2],
            });
            console.log(resp.data);
            navigate("/admin");
          } catch (error) {
            console.log(error.response);
          }
        });
      },
    });
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div id="1" className="page-layout">
        <Navbar showSecretaryBoard={props.showSecretaryBoard} showAdminBoard={props.showAdminBoard} isAuth={props.isAuth}/>
        <div className="page-container">
          <h2>Admin</h2>
          <div className="overview">
            <div className="overview-nav">
              <h3>Upload employees</h3>
            </div>
            <form id="upload">
              <input
                id="csv_uploads"
                onChange={handleOnChange}
                type="file"
                accept=".csv"
              />
              <button
                id="upload-btn"
                onClick={(e) => {
                  handleOnSubmit(e);
                }}
              >
                Import
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
