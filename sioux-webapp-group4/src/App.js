import {React, useEffect, useState } from 'react';
import { Route, Routes,useParams,BrowserRouter as Router } from "react-router-dom";
import './components/App.css';
import EditMeeting from './pages/EditMeeting';
import TempOverviewMeeting from './pages/TempOverviewMeeting';
import Overview from "./pages/Overview";
import AdminView from './pages/AdminView';
import LoginPage from "./pages/LoginPage";
import CreateMeeting from "./pages/CreateMeeting";
import UploadEmployees from './pages/UploadEmployees';
import CreateEmployee from './pages/CreateEmployee';
import ListOfEmployees from "./components/ListOfEmployees";
import AuthenticationService from './services/AuthenticationService';
import Roles from './enums/Roles';
import EditEmployee from "./pages/EditEmployee";
import CreateSecretary from './pages/SecretaryCreate';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [showSecretaryBoard, setShowSecretaryBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  function Edit() {
    const {id} = useParams();
          return <EditMeeting id={id} showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>;
  }

  useEffect(()=>
  {
    //console.log(showEmployeeBoard);

    //console.log(AccountService.getRoles());
    console.log(AuthenticationService.getCurrentUser());
    if(AuthenticationService.getCurrentUser() != null)
    {
      setIsAuth(true);
      // console.log(isAuth);
      var roles = AuthenticationService.getRoles();
      roles.map((role)=>{
        if(role === Roles.admin)
        {
          setShowAdminBoard(true);
        }
        else if(role === Roles.secretary)
        {
          setShowSecretaryBoard(true);
        }
      })
    }
  },[]);

  return (
    <Router>
      <Routes> 
          {/* Login & logout */}
          {!isAuth && 
          (
            <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage/>} />
            </>
          )}
          {/* {isAuth && 
          (
          <Route path={}  element= { <Logout changeStateIsAuth={setIsAuth} /> }  />
          )}  */}

        {/* Secretary */}
        {showSecretaryBoard && 
        (
        <>
            <Route path="/createmeeting" element={<CreateMeeting showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>}/>
            <Route path="/edit/:id" element={<Edit showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>} />
            <Route path="/overviewtest" element={<TempOverviewMeeting />} />
            <Route path="/overview" element={<Overview showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>} />
        </>
        )}

        {/* Admin */}
        {showAdminBoard && 
        (
        <>
          <Route path="/editEmployee/:employeeId" element={<EditEmployee showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>} />
          <Route path="/createsecretary" element={<CreateSecretary showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>} />
          <Route path="/admin" element={<AdminView showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>} />
          <Route path="/uploademployees" element={<UploadEmployees showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>}/>
          <Route path="/createemployee" element={<CreateEmployee showSecretaryBoard={showSecretaryBoard} showAdminBoard={showAdminBoard} isAuth={isAuth}/>}/>
          <Route path="/employees" element={<ListOfEmployees />} />
        </>
        )}

      </Routes>
    </Router>
  );
}

export default App;
