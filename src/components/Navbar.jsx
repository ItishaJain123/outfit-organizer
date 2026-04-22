import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/", end: true },
  { name: "About", path: "/about" },
  { name: "Upload", path: "/upload" },
  { name: "Wardrobe", path: "/wardrobe" },
  { name: "Favorites", path: "/favorites" },
  { name: "Recommendations", path: "/recommendations" },
  { name: "Dashboard", path: "/dashboard" },
];

const linkClass = ({ isActive }) =>
  isActive
    ? "text-white font-semibold border-b-2 border-pink-400 pb-0.5 transition-all duration-200"
    : "text-gray-300 hover:text-white transition-colors duration-200";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#12122A] border-b border-purple-900/30 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide font-playfair text-white">
          Wardrobe Manager
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.end} className={linkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-purple-900/30 bg-[#12122A]">
          <ul className="flex flex-col gap-3 pt-4 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
