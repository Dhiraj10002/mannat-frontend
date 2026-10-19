import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaBars, FaHeart, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";

const navigation = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/our-work", label: "Our Work" },
  { to: "/gallery", label: "Gallery" },
  { to: "/join-us", label: "Join Us" },
  { to: "/contact", label: "Contact Us" },
];

const navLinkClass = ({ isActive }) =>
  `site-header__link${isActive ? " site-header__link--active" : ""}`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    // This is a navigation disclosure: tabbing out dismisses it naturally.
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("focusin", closeOutside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("focusin", closeOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header" ref={headerRef}>
        <nav className="site-header__inner" aria-label="Main navigation">
          <Link
            to="/"
            className="site-header__brand"
            aria-label="Mannat Foundation home"
            onClick={() => setMenuOpen(false)}
          >
            <img src={logo} alt="" width="44" height="44" />
            <span className="site-header__wordmark">
              <span className="site-header__name">Mannat</span>
              <span className="site-header__foundation">Foundation</span>
            </span>
          </Link>

          <ul className="site-header__desktop-links">
            {navigation.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === "/"} className={navLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="site-header__actions">
            <NavLink
              to="/donate"
              className="site-header__donate"
              onClick={() => setMenuOpen(false)}
            >
              <FaHeart aria-hidden="true" />
              <span>Donate</span>
            </NavLink>
            <button
              ref={toggleRef}
              type="button"
              className="site-header__toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <nav
          id="mobile-navigation"
          className="site-header__mobile-menu"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          <ul>
            {navigation.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {menuOpen && <div className="site-header__backdrop" aria-hidden="true" />}
    </>
  );
};

export default Navbar;
