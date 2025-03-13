import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import the Navbar component
import Navbar from "../components/Navbar";

const ClientManagement = () => {
  const [clients, setClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || [
      {
        clientName: "Client A",
        email: "clientA@example.com",
        project: "Project A",
        startDate: "2025-01-01",
        endDate: "2025-06-01",
        paymentStatus: "Unpaid",
        progress: 50, // Static progress value
      },
      {
        clientName: "Client B",
        email: "clientB@example.com",
        project: "Project B",
        startDate: "2025-02-01",
        endDate: "2025-07-01",
        paymentStatus: "Paid",
        progress: 75, // Static progress value
      },
    ]
  );

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    project: "",
    startDate: "",
    endDate: "",
    paymentStatus: "Unpaid",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClient = () => {
    const { clientName, email, project, startDate, endDate } = formData;
    if (clientName && email && project && startDate && endDate) {
      const newClients = [...clients, formData];
      setClients(newClients);
      localStorage.setItem("clients", JSON.stringify(newClients));
      setFormData({
        clientName: "",
        email: "",
        project: "",
        startDate: "",
        endDate: "",
        paymentStatus: "Unpaid",
      });
    } else {
      alert("Please fill out all fields.");
    }
  };

  const togglePaymentStatus = (index) => {
    const updatedClients = [...clients];
    updatedClients[index].paymentStatus =
      updatedClients[index].paymentStatus === "Paid" ? "Unpaid" : "Paid";
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
  };

  const calculateProgress = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const today = new Date();

    // Check if startDate and endDate are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate >= endDate) {
      return 10; // Return 0 if dates are invalid
    }

    const totalDuration = endDate - startDate;
    const elapsed = today - startDate;
    const progress = (elapsed / totalDuration) * 100;
    return Math.min(Math.max(progress, 0), 100); // Clamp progress between 0 and 100
  };

  return (
    <div>
      {/* Include the Navbar component */}
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary fw-bold">
          🎯 Client Management
        </h2>

        <div className="p-4 border rounded shadow-lg bg-light">
          <h4 className="text-secondary mb-3">➕ Add New Client</h4>
          <div className="row g-3">
            {[
              { label: "Client Name", name: "clientName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Project Name", name: "project", type: "text" },
              { label: "Start Date", name: "startDate", type: "date" },
              { label: "End Date", name: "endDate", type: "date" },
            ].map((field) => (
              <div className="col-md-6" key={field.name}>
                <label className="form-label">{field.label}</label>
                <input
                  type={field.type}
                  className="form-control"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-3">
            <label className="form-label">Payment Status</label>
            <select
              className="form-select"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <button className="btn btn-primary w-100 mt-3" onClick={handleAddClient}>
            Add Client 🚀
          </button>
        </div>

        <div className="mt-5">
          <h4 className="text-secondary">📋 Client List</h4>
          {clients.length > 0 ? (
            <table className="table table-hover table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Project</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.clientName}</td>
                    <td>{client.email}</td>
                    <td>{client.project}</td>
                    <td>{client.startDate}</td>
                    <td>{client.endDate}</td>
               
                    <td>
                      <span
                        className={`badge ${
                          client.paymentStatus === "Paid"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {client.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => togglePaymentStatus(index)}
                      >
                        Toggle Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No clients added yet.</p>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-dark"
            onClick={() => (window.location.href = "/home")}
          >
            🔙 Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;
