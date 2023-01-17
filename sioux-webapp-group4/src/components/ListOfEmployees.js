import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './App.css';

function ListOfEmployees(props) {
    
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get("http://localhost:8080/employee", {
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            setEmployees(response.data)
            console.log(response.data)
        });
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
    let navigate = useNavigate();

    const openUpdate = (id) => {
        navigate(`/editEmployee/${id}`);
    }

    const handleRemove = (id) => {
        {
            if (window.confirm('Do you want to remove?')) {
                fetch(`http://localhost:8080/employee/${id}`, {
                    method: "DELETE"
                }).then((res) => {
                    alert('Removed successfully.')
                    window.location.reload();
                }).catch((err) => {
                    console.log(err.message)
                })
            }
        }

        }



        // (id) => {
        //     axios.delete("http://localhost:8080/employee/" + id, {
        //         headers: { 'Content-Type': 'application/json' }
        //     }).then(
        //         setEmployees(employees.filter(item => item.id !== id)))
        //     alert("Deleted")
        // }

    return (
        <div id="employees" className="list">
            <table>
                <thead>
                    <tr>
                        <th>Nr.</th>
                        <th>Employee name</th>
                        <th>Email</th>
                        <th>Position/Role</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((item, i) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstName + " " + item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button id="edit" onClick={() => openUpdate(item.id)}>Edit</button>
                                </td>
                                {<td><button id="remove" onClick={() => handleRemove(item.id)} type="submit" value={item.id}>Remove</button></td>}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ListOfEmployees;