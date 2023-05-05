import React from 'react';
import { Link } from 'react-router-dom';
import './AdvisorDashboard.css';
import Navbar from './Navbar';

const AdvisorDashboard = () => {
  return (
    <div className="advisor-dashboard">
       <Navbar />

      <div className="header-container">
        <div className="wrapper">
          <header>
            <div className="hero-content">
              <h1>Welcome</h1>
              <Link to="/pending-requests">Pending Request</Link>
              <a href="requests-ce.html">Approved requests</a>
              <a href="requests-ce.html">Paused Request</a>
             
            </div>
            <div className="photo-bg"></div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;
