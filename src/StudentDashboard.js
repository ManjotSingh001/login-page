import React from 'react';
import './StudentDashboard.css';
import { generateRequest } from './api';
import Navbar from './Navbar';

const StudentDashboard = () => {
  const handleGenerateRequest = async () => {
    const studentId = localStorage.getItem('userId'); // Get the user ID from localStorage
    const fatherName = localStorage.getItem('father_name');
    const URN = localStorage.getItem('URN');
    const CRN = localStorage.getItem('CRN');
    const requestDetails = 'Example request details'; // Replace this with the actual request details.
  
    const response = await generateRequest(studentId, requestDetails, fatherName, URN, CRN);
  
    if (response.success) {
      console.log('Request generated successfully');
    } else {
      console.error('Failed to generate request');
    }
  };
  

  return (
    <div className="student-dashboard">
      <Navbar />
      
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
