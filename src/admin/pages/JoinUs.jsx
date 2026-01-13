import { useEffect, useState } from "react";
import API from "../services/api";
import "./JoinUs.css";

export default function JoinUs() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchJoinUs = async () => {
    try {
      const res = await API.get("/join-us");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJoinUs();
  }, []);

  return (
    <div className="joinus">
      <h2 className="page-title">🙋 Join Us Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => setSelected(item)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔹 VIEW MODAL */}
      {selected && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Join Us Details</h3>

            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>Message:</strong></p>
            <div className="message-box">{selected.message}</div>

            <button className="close-btn" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
