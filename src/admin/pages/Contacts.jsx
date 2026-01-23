import { useEffect, useState } from "react";
import adminApi from "../services/api";
import ViewModal from "../components/ViewModal";
import "./Contacts.css";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchContacts = async () => {
    const res = await adminApi.get("/contact");

    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contacts-page">
      <h2 className="page-title">📩 Contact Messages</h2>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty">
                  No contact messages found
                </td>
              </tr>
            ) : (
              contacts.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelected(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <ViewModal
          title="Contact Message"
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
