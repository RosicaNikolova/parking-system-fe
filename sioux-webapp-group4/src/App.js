import React from 'react';
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
import EditEmployee from "./pages/EditEmployee";
import CreateSecretary from './pages/SecretaryCreate';

function App() {

  function Edit() {
    const {id} = useParams();
    return <EditMeeting id={id}/>;
  }

  return (
    <Router>
      <Routes> 
          <Route path="/" element={<LoginPage/>} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/overviewtest" element={<TempOverviewMeeting />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/createmeeting" element={<CreateMeeting />}/>
          <Route path="/uploademployees" element={<UploadEmployees />}/>
          <Route path="/createemployee" element={<CreateEmployee />}/>
          <Route path="/employees" element={<ListOfEmployees />} />
          <Route path="/editEmployee/:employeeId" element={<EditEmployee />} />
          <Route path="/createsecretary" element={<CreateSecretary />} />



      </Routes>
    </Router>
  );
}

export default App;
