import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import validation from '../Validation';
import { useNavigate } from "react-router-dom";

const url = 'http://localhost:8080/employee';


export default function CreateEmployee() {
    const [employee, setEmployee] = useState({});
    const [component, setComponent] = useState({});

    let navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [lastname, s] = useState('');

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post(url, {
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
            });
            console.log(resp.data);
            navigate("/overview");
        } catch (error) {
            console.log(error.response);
        }
    }

    const options = [
        {
            label: "Secretary",
            value: "secretary",
        },
        {
            label: "Employee",
            value: "employee",
        },
    ];

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEmployee(values => ({ ...values, [name]: value }));
        console.log(employee);
    }

    // const handleChangeComponent = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setComponent(values => ({ ...values, [name]: value }));
    // }

    // const SecretaryCreate = () => {
    //     return (
    //         <form>
    //             <span>Email<input
    //                 placeholder="Email"
    //                 type="email"
    //                 name="email"
    //                 value={employee.email || ""}
    //                 onChange={handleChange}
    //                 required={true}
    //             /></span>{errors.email && <span id="err">{errors.email}</span>}
    //                 <span>Password<input
    //                     placeholder="Password"
    //                     type="password"
    //                     name="password"
    //                     value={employee.password || ""}
    //                     onChange={handleChange}
    //                     required={true}
    //                 />
    //                 </span>
    //                 <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
    //         </form>
    //     )
    // }
    // const EmployeeCreate = () => {
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

    return (
        <div>
            <div className="page-layout">
                <Navbar />
                <div className="page-container">
                    <h2>Admin</h2>
                    <div className="overview">
                        <h3>Create employee</h3>
                        <div className="create-meeting">
                            {/* <select
                                name="role"
                                onChange={handleChangeComponent}
                            >
                                {options.map((option, i) => (
                                    <option key={i} value={option.value}>{option.label}</option>
                                ))}
                            </select> */}
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
