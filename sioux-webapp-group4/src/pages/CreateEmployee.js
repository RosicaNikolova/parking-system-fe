import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import validation from '../Validation';
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
    const [employee, setEmployee] = useState({});
    let navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const [passing, setPassing] = useState(true);

    useEffect(() => {
        setErrors(validation(employee));
    }, [employee.email]);

    useEffect(() => {
        for (const value in errors) {
            if (errors[value] !== "") {
                setPassing(false);
                break;
            }
            else {
                setPassing(true);
            }
        };
    }, [errors])

    //Axios post
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(errors));
        if (passing) {
            add();
            alert(JSON.stringify(employee));
            alert("Submitted successfully");
            navigate("/overview"); //added
        }
        else {
            alert("Data are not in the right format!");
        }
    }

    const options = [
        {
            label: "Secretary",
            value: "secretary",
        },
        {
            label: "Admin",
            value: "admin",
        },
        {
            label: "Employee",
            value: "employee",
        },
    ];

    function add() {
        alert("HAHAA");
        // axios
        //     .post("http://localhost:8080/employee", JSON.stringify({    
        //             "firstName": meeting.employeesFirstName,
        //             "lastName": meeting.employeesLastName,
        //             "email": meeting.employeesEmail //probably we use useEffect for searching for employees email by his last name
        //         }, {
        //         headers: { 'Content-Type': 'application/json' }
        //     })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEmployee(values => ({ ...values, [name]: value }));
    }

    return (
        <div>
            <div className="page-layout">
                <Navbar />
                <div className="page-container">
                    <h2>Admin</h2>
                    <div className="overview">
                        <h3>Create employee</h3>
                        <div className="create-meeting">
                            <select
                                name="role"
                                onChange={handleChange}
                            >
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            {/* {employee.role === "employee" ? <EmployeeCreate /> : <AdminSecretaryCreate />} */}
                            <form>
                                <span>First name<input
                                    placeholder="First name"
                                    type="text"
                                    name="firstName"
                                    value={employee.firstName || ""}
                                    onChange={handleChange}
                                    required={true}
                                /></span>
                                <span>Last name<input
                                    placeholder="Last name"
                                    type="text"
                                    name="lastName"
                                    value={employee.lastName || ""}
                                    onChange={handleChange}
                                    required={true}
                                /></span>
                                <span>Email<input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={employee.email || ""}
                                    onChange={handleChange}
                                    required={true}
                                />
                                </span>{errors.email && <span id="err">{errors.email}</span>}
                                <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

// export function AdminSecretaryCreate() {
//     return (
//         <form>
//             <span>Email<input
//                 placeholder="Email"
//                 type="email"
//                 name="email"
//                 value={employee.email || ""}
//                 onChange={handleChange}
//                 required={true}
//             /></span>
//                 <span>Passwprd<input
//                     placeholder="Password"
//                     type="password"
//                     name="password"
//                     value={employee.password || ""}
//                     onChange={handleChange}
//                     required={true}
//                 />
//                 </span>{errors.email && <span id="err">{errors.email}</span>}
//                 <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
//         </form>
//     )
// }
// export function EmployeeCreate() {
//     return (
//         <form>
//             <span>First name<input
//                 placeholder="First name"
//                 type="text"
//                 name="firstName"
//                 value={employee.firstName || ""}
//                 onChange={handleChange}
//                 required={true}
//             /></span>
//             <span>Last name<input
//                 placeholder="Last name"
//                 type="text"
//                 name="lastName"
//                 value={employee.lastName || ""}
//                 onChange={handleChange}
//                 required={true}
//             /></span>
//             <span>Email<input
//                 placeholder="Email"
//                 type="email"
//                 name="email"
//                 value={employee.email || ""}
//                 onChange={handleChange}
//                 required={true}
//             />
//             </span>{errors.email && <span id="err">{errors.email}</span>}
//             <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
//         </form>
//     )
// }


