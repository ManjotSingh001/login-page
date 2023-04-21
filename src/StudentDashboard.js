import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <div className="nav-container">
        <div className="wrapper">
          <nav>
            <ul className="nav-items">
              <li>
                <a href="/"> HOME</a>
              </li>
              <li>
                <a href="https://www.gndec.ac.in/">COLLEGE WEBSITE</a>
              </li>
              <li>
                <a href="contact.html"> CONTACT US</a>
              </li>
              <li>
                <a href="about.html"> ABOUT US</a>
              </li>
              <li>
                <a href="/"> LOGOUT</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="header-container">
        <div className="wrapper">
          <header>
            <div className="hero-content">
              <h1>Welcome</h1>
              {/* <h2>Manjot Singh</h2> */}
              <a href="requests-ce.html">Generate Request</a>
             
            </div>
            <div className="photo-bg"></div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
