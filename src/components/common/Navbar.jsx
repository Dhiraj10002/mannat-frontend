import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/images/logo.png";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-green-600 font-semibold"
        : scrolled
        ? "text-gray-800 hover:text-green-600"
        : "text-white hover:text-green-300"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-zinc-800 shadow" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
       <Link
  to="/"
  className="flex items-center gap-2 transition"
>
  <img
    src={logo}
    alt="Mannat Foundation Logo"
    className="w-10 h-10 object-contain "
  />
  <span
    className={`text-xl font-bold ${
      scrolled ? "text-green-600" : "text-green-600"
    }`}
  >
    Mannat Foundation
  </span>
</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          
          <NavLink
  to="/about"
  className={({ isActive }) =>
    `px-4 py-2 font-medium transition ${
      isActive ? "text-orange-500" : "text-green-600 hover:text-orange-400"
    }`
  }
>
  About
</NavLink>

          <NavLink
  to="/our-work"
  className={({ isActive }) =>
    `px-4 py-2 font-medium transition ${
 isActive ? "text-orange-500" : "text-green-600 hover:text-orange-400"
    }`
  }
>
  Our Work
</NavLink>

         <NavLink
  to="/gallery"
  className={({ isActive }) =>
    `px-4 py-2 font-medium transition ${
   isActive ? "text-orange-500" : "text-green-600 hover:text-orange-400"
      }`
  }
>
  Gallery
</NavLink>

<NavLink
  to="/join-us"
  className={({ isActive }) =>
    `px-4 py-2 font-medium transition ${
 isActive ? "text-orange-500" : "text-green-600 hover:text-orange-400"
    }`
  }
>
  Join Us
</NavLink>


         <NavLink
  to="/contact"
  className={({ isActive }) =>
    `px-4 py-2 font-medium transition ${
 isActive ? "text-orange-500" : "text-green-600 hover:text-orange-400" 
    }`
  }
>
  Contact Us
</NavLink>

        </ul>

        {/* Donate Button */}
       <NavLink
  to="/donate"
  className="ml-6 bg-green-700 text-white px-5 py-2 rounded-md font-semibold hover:bg-orange-400 transition"
>
  Donate
</NavLink>


        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden text-xl ${
            scrolled ? "text-green-600" : "text-white"
          }`}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-gray-800">
            <NavLink onClick={() => setMenuOpen(false)} to="/about">About</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/our-work">Our Work</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/gallery">Gallery</NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/contact">Contact</NavLink>
            <Link
              onClick={() => setMenuOpen(false)}
              to="/donate"
              className="bg-green-700 text-white text-center py-2 rounded-md"
            >
              Donate
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
