import React from 'react';
import './StudentDashboard.css';
import { generateRequest } from './api';

const StudentDashboard = () => {
  const handleGenerateRequest = async () => {
    const studentId = localStorage.getItem('userId'); // Get the user ID from localStorage
    const requestDetails = 'Example request details'; // Replace this with the actual request details.
  
    const response = await generateRequest(studentId, requestDetails);
  
    if (response.success) {
      console.log('Request generated successfully');
    } else {
      console.error('Failed to generate request');
    }
  };
  

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
              <button onClick={handleGenerateRequest}>Generate Request</button>
            </div>
            
          </header>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
