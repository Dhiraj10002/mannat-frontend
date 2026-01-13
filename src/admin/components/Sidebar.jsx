import { NavLink, useNavigate } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded ${
    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
  }`;

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // 🔑 clear auth
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Mannat Admin</h2>

      <nav className="space-y-2 flex-1">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/contacts" className={linkClass}>
          Contacts
        </NavLink>
        <NavLink to="/admin/join-us" className={linkClass}>
          Join Us
        </NavLink>
        <NavLink to="/admin/gallery" className={linkClass}>
          Gallery
        </NavLink>
      </nav>

      {/* 🔴 Logout */}
      <button
        onClick={logout}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Logout
      </button>
    </aside>
  );
}
