import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdvisorDashboard from './AdvisorDashboard';
import StudentDashboard from './StudentDashboard';
import StaffDashboard from './StaffDashboard';
import LoginPage from './LoginPage';
import PendingRequests from './PendingRequests'; // Import the new PendingRequests component
import ApprovedRequests from './ApprovedRequests';
import PausedRequests from './PausedRequests';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/pending-requests" element={<PendingRequests />} /> {/* Add a route for the PendingRequests component */}
          <Route path="/approved-requests" element={<ApprovedRequests />} />
          <Route path="/paused-requests" element={<PausedRequests />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
