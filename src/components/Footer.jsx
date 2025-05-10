import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-0">
      <div className="container mx-auto text-center">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} Wardrobe Manager. All Rights
          Reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-3">
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gray-400 transition duration-300">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
