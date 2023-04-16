import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import StaffDashboard from './StaffDashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
