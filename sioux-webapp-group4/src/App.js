import {React} from 'react';
import { Route, Routes,useParams,BrowserRouter as Router } from "react-router-dom";
import CreateMeeting from './pages/CreateMeeting';
import './App.css';
import EditMeeting from './pages/EditMeeting';
import TempOverviewMeeting from './pages/TempOverviewMeeting';
import Overview from "./pages/Overview";

function App() {

  function Edit() {
    const {id} = useParams();
    return <EditMeeting id={id}/>;
  }

  return (
    <Router>
      <Routes> 
          <Route path="/" element={<CreateMeeting/>} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/overviewtest" element={<TempOverviewMeeting />} />
          <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
  );
}

export default App;
