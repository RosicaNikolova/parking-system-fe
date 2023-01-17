import Config from "./Config";
import axios from "axios";
import jwt from 'jwt-decode'
//Post
const login = data => {
    return axios
    .post(Config.baseBackendUrl, JSON.stringify({
            "email": data.email,
            "password": data.password
    }),{
    headers: { 'Content-Type': 'application/json' }
    })
}

const getRoles = () =>
{
    const user = jwt(localStorage.getItem("user"));
    console.log(user.roles)
    return user.roles;
}

const getToken = () =>
{
    var item = localStorage.getItem("user");
    return item;
}

const AccountService = 
{
    login,
    getRoles,
    getToken
}

export default AccountService;