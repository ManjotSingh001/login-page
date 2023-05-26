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
import StaffDashboardDpt from './StaffDashboardDpt';

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
          <Route path="/dpt-ce" element={<StaffDashboardDpt />} />
          <Route path="/dpt-ee" element={<StaffDashboardDpt />} />
          <Route path="/dpt-me-pro" element={<StaffDashboardDpt />} />
          <Route path="/dpt-ece" element={<StaffDashboardDpt />} />
          <Route path="/dpt-it" element={<StaffDashboardDpt />} />
          <Route path="/dpt-mba" element={<StaffDashboardDpt />} />
          <Route path="/dpt-bca" element={<StaffDashboardDpt />} />
          <Route path="/st-req-pending" element={<PendingRequests />} /> {/* Add a route for the PendingRequests component */}
          <Route path="/st-req-approved" element={<ApprovedRequests />} />
          <Route path="/st-req-paused" element={<PausedRequests />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
