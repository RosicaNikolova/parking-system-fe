import api from './http-common';
import jwt from 'jwt-decode';

 const login = (user) => {
        return api.post(`/login`, user)
           .then((response) => {
             if(response.data.accessToken){
                 localStorage.setItem("user", JSON.stringify(response.data.accessToken));
             }
             return response.data;
           });
   };

const logout = () => {
    localStorage.clear();
}

const register = (data) =>{
   return api.post(`/register`, data);
}

const getCurrentUser = () => {
    return localStorage.getItem('user');
}

const getRoles = () =>
{
    const user = jwt(localStorage.getItem("user"));
    console.log(user.roles)
    return user.roles;
}


const AuthenticationService = {
    login,
    logout,
    register,
    getCurrentUser,
    getRoles
  };

  export default AuthenticationService;
