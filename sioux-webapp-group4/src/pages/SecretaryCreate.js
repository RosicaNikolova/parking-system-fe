import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import validation from '../Validation';


const url = 'http://localhost:8080/register';


export default function SecretaryCreate(props) {
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post(url, {
                email: employee.email,
                password: employee.password,
                role:"SECRETARY"
            });
            console.log(resp.data);
            navigate("/overview");
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEmployee(values => ({ ...values, [name]: value }));
        console.log(employee);
    }

    return (
        <div>
            <div className="page-layout">
                <Navbar showSecretaryBoard={props.showSecretaryBoard} showAdminBoard={props.showAdminBoard} isAuth={props.isAuth}/>
                <div className="page-container">
                    <h2>Admin</h2>
                    <div className="overview">
                        <h3>Create employee</h3>
                        <div className="create-meeting">
                            <form>
                                <span>Email<input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={employee.email || ""}
                                    onChange={handleChange}
                                    required={true}
                                /></span>{errors.email && <span id="err">{errors.email}</span>}
                                <span>Password<input
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={employee.password || ""}
                                    onChange={handleChange}
                                    required={true}
                                />
                                </span>
                                <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}