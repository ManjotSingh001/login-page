import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        setPendingRequests(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pending Requests</h1>
      <ul>
        {pendingRequests.map((request, index) => (
          <li key={index}>
            <p>Student ID: {request.studentId}</p>
            <p>Request Details: {request.requestDetails}</p>
            <p>Father Name: {request.fatherName}</p>
            <p>URN: {request.URN}</p>
            <p>CRN: {request.CRN}</p>
            <p>Created At: {new Date(request.createdAt).toLocaleString()}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequests;
