// PausedRequests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './PausedRequests.css';


const PausedRequests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/paused-requests')
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [selectedRequestIds, setSelectedRequestIds] = useState(new Set());

 
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
  
  const handleRevert = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/revert-requests", {
        requestIds: Array.from(selectedRequestIds),
      });

      if (response.status === 200) {
        // Fetch the updated list of paused requests
        const response2 = await axios.get("http://localhost:3001/api/paused-requests");
        setRequests(response2.data);
        setSelectedRequestIds(new Set());
      } else {
        throw new Error("Failed to revert requests");
      }
    } catch (error) {
      console.error("Error reverting requests:", error);
    }
  };


  const handleApprove = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/approved-requests-from-paused", {
        requestIds: Array.from(selectedRequestIds),
      });

      if (response.status === 200) {
        setRequests((prev) =>
          prev.filter((request) => !selectedRequestIds.has(request._id))
        );
        setSelectedRequestIds(new Set());
      } else {
        throw new Error("Failed to approve requests");
      }
    } catch (error) {
      console.error("Error approving requests:", error);
    }
  };

  return (
    <div className="paused-requests">
      <Navbar />
      <h1><b>Paused Requests</b></h1>
      <table>
      <thead>
  <tr>
    <th>Select</th>
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
      <td>
        <input
          type="checkbox"
          onChange={(e) => handleCheckboxChange(e, request._id)}
        />
      </td>
      <td>{request.studentId}</td>
      <td>{request.fatherName}</td>
      <td>{request.URN}</td>
      <td>{request.CRN}</td>
      <td>{new Date(request.createdAt).toLocaleDateString()}</td>
    </tr>
         ))}
       </tbody>

      </table>

      <button className="button-action" onClick={handleRevert}>
         Revert
      </button>
      <button className="button-action" onClick={handleApprove}>
         Approve
      </button>

    </div>

    
  );

};

export default PausedRequests;