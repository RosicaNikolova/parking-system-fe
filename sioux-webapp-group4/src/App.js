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
import AuthenticationService from './services/AuthenticationService';
import Roles from './enums/Roles';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [showSecretaryBoard, setShowSecretaryBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  function Edit() {
    const {id} = useParams();
    return <EditMeeting id={id}/>;
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
            <Route path="/createmeeting" element={<CreateMeeting />}/>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/overviewtest" element={<TempOverviewMeeting />} />
            <Route path="/overview" element={<Overview />} />
        </>
        )}

        {/* Admin */}
        {showAdminBoard && 
        (
        <>
          <Route path="/admin" element={<AdminView />} />
          <Route path="/uploademployees" element={<UploadEmployees />}/>
          <Route path="/createemployee" element={<CreateEmployee />}/>
        </>
        )}

      </Routes>
    </Router>
  );
}

export default App;
