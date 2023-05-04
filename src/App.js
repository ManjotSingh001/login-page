import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdvisorDashboard from './AdvisorDashboard';
import StudentDashboard from './StudentDashboard';
import LoginPage from './LoginPage';
import PendingRequests from './PendingRequests'; // Import the new PendingRequests component

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/advisor-dashboard" element={<AdvisorDashboard />} />
          <Route path="/pending-requests" element={<PendingRequests />} /> {/* Add a route for the PendingRequests component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
