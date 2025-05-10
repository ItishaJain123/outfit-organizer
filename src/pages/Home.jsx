import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const outfits = useSelector((state) => state.wardrobe.outfits);
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateText(true);
    }, 500);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background with Animated Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000"
        style={{ backgroundImage: "url('/background.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg animate-fadeIn"></div>

      {/* Floating Elements for Depth */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-pink-500 rounded-full opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-float delay-200"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* 🏆 Animated Heading */}
        <h1
          className={`text-7xl font-extrabold tracking-widest transition-all duration-1000 ${
            animateText ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          Your <span className="text-pink-400">Perfect Look</span> Awaits
        </h1>
        <p className="mt-4 text-2xl opacity-80 italic">
          Unleash your fashion sense effortlessly
        </p>

        {/* Stylish Buttons */}
        <div className="mt-6 flex space-x-6 justify-center">
          <Link
            to="/outfit-organizer/upload"
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full font-bold shadow-lg transform transition duration-500 hover:scale-110 hover:shadow-2xl"
          >
            Upload Your Style
          </Link>
          <Link
            to="/outfit-organizer/wardrobe"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-bold shadow-lg transform transition duration-500 hover:scale-110 hover:shadow-2xl"
          >
            View Wardrobe ({outfits.length})
          </Link>
        </div>
      </div>

      {/* 3D Outfit Showcase */}
      <div className="relative z-10 mt-12 w-full max-w-6xl px-6">
        <h2 className="text-4xl font-semibold text-center mb-8 uppercase tracking-wider">
          Trending Outfits
        </h2>

        {outfits.length === 0 ? (
          <p className="text-center text-gray-300 text-lg italic">
            Your wardrobe is empty. Start adding outfits now!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {outfits.slice(0, 3).map((outfit) => (
              <div
                key={outfit.id}
                className="group relative bg-white bg-opacity-20 backdrop-blur-lg p-5 rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 hover:shadow-2xl"
              >
                <img
                  src={outfit.image}
                  alt="Outfit"
                  className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                />
                <p className="mt-4 text-center text-xl font-semibold">
                  {outfit.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
