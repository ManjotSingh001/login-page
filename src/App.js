import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import StaffDashboard from './StaffDashboard';
import StudentDashboard from './StudentDashboard';
import AdvisorDashboard from './AdvisorDashboard';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
