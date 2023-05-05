import React from 'react';
import './StaffDashboard.css';
import Navbar from './Navbar';

const StaffDashboard = () => {
  return (
    <div className="staff-dashboard">
      <Navbar />

      <div className="header-container">
        <div className="wrapper">
          <header>
            <div className="hero-content">
              <h1>Welcome,</h1>
              {/* <h2>Manjot Singh</h2> */}
              <a href="requests-ce.html">CE</a>
              <a href="requests-ee.html">EE</a>
              <a href="requests-mech&pro.html">ME & PRO</a>
              <a href="requests-ece.html">ECE</a>
              <a href="requests-cse.html">CSE</a>
              <a href="requests-mba.html">MBA</a>
              <a href="requests-it.html">IT</a>
              <a href="requests-bca.html">BCA</a>
            </div>
            <div className="photo-bg"></div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
