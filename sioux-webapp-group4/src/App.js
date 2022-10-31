import CreateMeeting from './pages/CreateMeeting';
import './App.css';
import Overview from "./pages/Overview";
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes> 
          <Route path="/" element={<CreateMeeting />} />
          <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
  );
}

export default App;
