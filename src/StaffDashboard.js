import React from 'react';
import { Link } from 'react-router-dom';
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
              <Link to="/dpt-ce">CE</Link>
              <Link to="/dpt-ee">EE</Link>
              <Link to="/dpt-me-pro">ME & PRO</Link>
              <Link to="/dpt-ece">ECE</Link>
              <Link to="/dpt-cse">CSE</Link>
              <Link to="/dpt-it">IT</Link>
              <Link to="/dpt-mba">MBA</Link>
              <Link to="/dpt-bca">BCA</Link>
            </div>
            <div className="photo-bg"></div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
