import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A18] border-t border-purple-900/30 text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2">
            Wardrobe Manager
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Organize, explore, and style your wardrobe smarter. Your personal
            fashion companion.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Upload", path: "/upload" },
              { name: "Wardrobe", path: "/wardrobe" },
              { name: "Favorites", path: "/favorites" },
              { name: "Recommendations", path: "/recommendations" },
              { name: "Dashboard", path: "/dashboard" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Built By */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4">
            Built By
          </h4>
          <p className="text-white font-semibold mb-1">Itisha Jain</p>
          <p className="text-gray-400 text-sm mb-4">Full-Stack Developer</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["React", "Redux", "Tailwind CSS", "Recharts", "Vite"].map(
              (tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-purple-900/40 border border-purple-700/40 text-purple-300"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
          <div className="flex gap-4 text-sm">
            <a
              href="https://github.com/ItishaJain123"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-purple-900/20 py-4 text-center text-gray-600 text-xs">
        © {new Date().getFullYear()} Wardrobe Manager. Built with React &
        Tailwind CSS.
      </div>
    </footer>
  );
};

export default Footer;
