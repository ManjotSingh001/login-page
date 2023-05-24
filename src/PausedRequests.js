import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './PausedRequests.css';

const PausedRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestIds, setSelectedRequestIds] = useState(new Set());

  const department = localStorage.getItem('department');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/paused-requests?department=${department}`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [department]);

  const handleCheckboxChange = (e, requestId) => {
    if (e.target.checked) {
      setSelectedRequestIds((prev) => new Set([...prev, requestId]));
    } else {
      setSelectedRequestIds((prev) => {
        const newSet = new Set([...prev]);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleAction = async (action) => {
    const endpoint = action === 'approve' ? '/api/approved-requests-from-paused' : '/api/revert-requests';
  
    try {
      const response = await axios.post(`http://localhost:3001${endpoint}`, {
        requestIds: Array.from(selectedRequestIds),
      });
  
      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => !selectedRequestIds.has(request._id))
        );
        setSelectedRequestIds(new Set());
      }
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };
  
  return (
    <div className="paused-requests">
      <Navbar />
      <h1>
        <b>Paused Requests</b>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
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
              <td>{request.fatherName}</td>
              <td>{request.URN}</td>
              <td>{request.CRN}</td>
              <td>{new Date(request.createdAt).toLocaleDateString()}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRequestIds.has(request._id)}
                  onChange={(e) => handleCheckboxChange(e, request._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="action-buttons">
        <button onClick={() => handleAction('revert')}>Revert</button>
        <button onClick={() => handleAction('approve')}>Approve</button>
      </div>

    </div>
  );
};

export default PausedRequests;
