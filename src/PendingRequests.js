import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './PendingRequests.css';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/data')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="pending-requests">
      <Navbar />
      <h1>Pending Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Request Details</th>
            <th>Father Name</th>
            <th>URN</th>
            <th>CRN</th>
            <th>Date</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.studentId}</td>
              <td>{request.requestDetails}</td>
              <td>{request.fatherName}</td>
              <td>{request.URN}</td>
              <td>{request.CRN}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <button className="button-action">Approve</button>
        <button className="button-action">Reject</button>
      </div>
    </div>
  );
};

export default PendingRequests;
