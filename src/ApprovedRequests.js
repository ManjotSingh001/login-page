import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ApprovedRequests.css';

const ApprovedRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/approved-requests')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="approved-requests">
      <Navbar />
      <h1><b>Approved Requests</b></h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Father Name</th>
            <th>URN</th>
            <th>CRN</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentId}</td>
              <td>{request.fatherName}</td>
              <td>{request.URN}</td>
              <td>{request.CRN}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedRequests;
