import { NavLink, useNavigate } from "react-router-dom";
import { FiGrid, FiCreditCard, FiMail, FiUsers, FiImage, FiLogOut, FiX } from "react-icons/fi";
import logo from "../../assets/images/logo.png";

const links = [
  { to: "/admin", label: "Dashboard", Icon: FiGrid },
  { to: "/admin/donations", label: "Donations", Icon: FiCreditCard },
  { to: "/admin/contacts", label: "Contacts", Icon: FiMail },
  { to: "/admin/join-us", label: "Join Requests", Icon: FiUsers },
  { to: "/admin/gallery", label: "Gallery", Icon: FiImage },
];

export default function Sidebar({ mobile = false, onNavigate, onClose }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    onNavigate?.();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <img src={logo} width="38" height="38" alt="" />
        <div><h2 id={mobile ? "admin-menu-title" : undefined}>Mannat Admin</h2><p>Management portal</p></div>
        {mobile && <button type="button" className="admin-icon-button" onClick={onClose} aria-label="Close admin menu"><FiX aria-hidden="true" /></button>}
      </div>
      <nav className="admin-sidebar__links" aria-label={mobile ? "Mobile admin navigation" : "Admin navigation"}>
        {links.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} end={to === "/admin"} onClick={onNavigate}
            className={({ isActive }) => `admin-sidebar__link${isActive ? " admin-sidebar__link--active" : ""}`}>
            <Icon aria-hidden="true" /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="admin-sidebar__footer">
        <NavLink to="/" onClick={onNavigate}>View website</NavLink>
        <button type="button" onClick={logout}><FiLogOut aria-hidden="true" />Sign out</button>
      </div>
    </aside>
  );
}
