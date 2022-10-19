import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import CreateMeeting from './pages/CreateMeeting';
import './App.css';

function App() {

  return (
    <Router>
      <Routes> 
          <Route path="/" element={<CreateMeeting/>} />
      </Routes>
    </Router>
  );
}

export default App;
