import React from 'react';
import { Link } from 'react-router-dom';
import './StaffDashboardDpt.css';
import Navbar from './Navbar';



const StaffDashboardDpt = () => {
  return (
    <div className="staff-dashboard-dpt">
       <Navbar />

      <div className="header-container">
        <div className="wrapper">
          <header>
            <div className="hero-content">
              <h1>Welcome</h1>
                    <Link to="/st-req-pending">Pending Request</Link>
                    <Link to="/st-req-approved">Approved Request</Link>
                    <Link to="/st-req-paused">Paused Request</Link>
            </div>
            <div className="photo-bg"></div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardDpt;
