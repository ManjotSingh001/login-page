import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./PendingRequests.css";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);
  const department = localStorage.getItem("department");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/pending-requests?department=${department}`)
      .then((response) => {
        console.log("Fetched data:", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [department]);

  const handleCheckboxChange = (e, requestId) => {
    if (e.target.checked) {
      setSelectedRequestIds((prev) => [...prev, requestId]);
    } else {
      setSelectedRequestIds((prev) => prev.filter((id) => id !== requestId));
    }
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/approve-requests", {
        requestIds: selectedRequestIds,
      });

      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => !selectedRequestIds.includes(request._id))
        );
        setSelectedRequestIds([]);
      }
    } catch (error) {
      console.error("Error approving requests:", error);
    }
  };

  const handlePause = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/pause-requests", {
        requestIds: selectedRequestIds,
      });

      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => !selectedRequestIds.includes(request._id))
        );
        setSelectedRequestIds([]);
      }
    } catch (error) {
      console.error("Error pausing requests:", error);
    }
  };

  return (
    <div className="pending-requests">
      <Navbar />
      <h1>
        <b>Pending Requests</b>
      </h1>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Father Name</th>
            <th>URN</th>
            <th>CRN</th>
            <th>Date</th>
            <th>Actions</th>
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
                  checked={selectedRequestIds.includes(request._id)}
                  onChange={(e) => handleCheckboxChange(e, request._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions">
        <button onClick={handleApprove} disabled={selectedRequestIds.length === 0}>
          Approve
        </button>
        <button onClick={handlePause} disabled={selectedRequestIds.length === 0}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default PendingRequests;
