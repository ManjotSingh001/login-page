import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./PendingRequests.css";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestIds, setSelectedRequestIds] = useState(new Set());

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/data")
      .then((response) => {
        console.log("Fetched data:", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  const handleApprove = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/approve-requests", {
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

  const handlePause = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/pause-requests", {
        requestIds: Array.from(selectedRequestIds),
      });
  
      if (response.status === 200) {
        setRequests((prev) =>
          prev.filter((request) => !selectedRequestIds.has(request._id))
        );
        setSelectedRequestIds(new Set());
      } else {
        throw new Error("Failed to pause requests");
      }
    } catch (error) {
      console.error("Error pausing requests:", error);
    }
  };
  
  

  return (
    <div className="pending-requests">
      <Navbar />
      <h1><b>Pending Requests</b></h1>
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
      <button className="button-action" onClick={handleApprove}>
        Approve
      </button>
      <button className="button-action" onClick={handlePause}>
         Pause
      </button>

    </div>
  );
};

export default PendingRequests;