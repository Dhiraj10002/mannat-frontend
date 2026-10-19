import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!menuOpen) {
      if (dialog.open) dialog.close();
      return;
    }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [menuOpen]);

  return (
    <div className="admin-shell">
      <div className="admin-desktop-sidebar"><Sidebar /></div>
      <div className="admin-workspace">
        <header className="admin-mobile-header">
          <Link to="/admin" className="admin-mobile-brand">Mannat <span>Admin portal</span></Link>
          <button type="button" className="admin-icon-button" onClick={() => setMenuOpen(true)}
            aria-label="Open admin menu" aria-expanded={menuOpen} aria-controls="admin-navigation-drawer">
            <FiMenu aria-hidden="true" />
          </button>
        </header>
        <main className="admin-content" id="admin-content"><Outlet /></main>
      </div>
      <dialog ref={dialogRef} id="admin-navigation-drawer" className="admin-navigation-drawer"
        aria-labelledby="admin-menu-title" onCancel={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setMenuOpen(false);
        }}>
        <Sidebar mobile onNavigate={() => setMenuOpen(false)} onClose={() => setMenuOpen(false)} />
      </dialog>
    </div>
  );
}
