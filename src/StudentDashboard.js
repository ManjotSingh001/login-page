import React from 'react';
import './StudentDashboard.css';
import axios from 'axios';
import Navbar from './Navbar';

const StudentDashboard = () => {
  const handleGenerateRequest = async () => {

    const studentId = localStorage.getItem('userId');
    const fatherName = localStorage.getItem('father_name');
    const URN = localStorage.getItem('URN');
    const CRN = localStorage.getItem('CRN');
    const requestDetails = 'Example request details';

    try {
      const response = await axios.post('http://localhost:3001/api/generate-request', {
        studentId,
        requestDetails,
        fatherName,
        URN,
        CRN,
      });
      
      console.log(response.data);
      alert('Request generated successfully');
    } catch (error) {
      console.error('Error generating request:', error);
      alert('Failed to generate request');
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
