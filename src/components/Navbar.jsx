import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/outfit-organizer" },
    { name: "Upload", path: "/outfit-organizer/upload" },
    { name: "Wardrobe", path: "/outfit-organizer/wardrobe" },
    { name: "Dashboard", path: "/outfit-organizer/dashboard" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">Wardrobe Manager</h1>

        {/* Hamburger Icon */}
        <button
          className="md:hidden block focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="hover:text-gray-300 transition duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col space-y-4 text-lg">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="hover:text-gray-300 transition duration-200"
                  onClick={() => setMenuOpen(false)} // auto-close after clicking
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
