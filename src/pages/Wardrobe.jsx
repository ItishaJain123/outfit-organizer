import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOutfit, clearWardrobe } from "../features/wardrobeSlice";

const Wardrobe = () => {
  const outfits = useSelector((state) => state.wardrobe?.outfits || []);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your wardrobe?")) {
      dispatch(clearWardrobe());
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen bg-black overflow-hidden">
      {/* 🔵 Parallax Background */}
      <div className="absolute inset-0 bg-[url('/galaxy.jpg')] bg-cover bg-fixed opacity-40"></div>

      {/* 🌀 Sci-Fi Portal */}
      <div className="absolute w-[500px] h-[500px] border-[15px] border-purple-500 border-opacity-50 rounded-full shadow-[0_0_40px_rgba(255,0,255,0.5)] animate-pulseSlow"></div>

      {/* 🎭 Main Wardrobe Card */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-xl shadow-lg rounded-3xl p-10 w-full max-w-3xl border border-white border-opacity-20 text-center transform transition-all duration-500 animate-popIn">
        <h2 className="text-5xl font-extrabold text-black mb-4">
          👗 Your Virtual Wardrobe
        </h2>
        <p className="text-gray-300 text-lg italic mb-6">
          "Style is a way to say who you are without speaking."
        </p>

        {outfits.length === 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-white text-lg mb-4">Your wardrobe is empty!</p>
            <img
              src="/empty-wardrobe.png"
              alt="Empty Wardrobe"
              className="w-40 opacity-50 animate-pulse"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 animate-fadeIn">
            {outfits.map((outfit, index) => (
              <div
                key={outfit.id}
                className="relative w-40 h-40 perspective group"
              >
                <div className="w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotateY-180 relative">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-gray-900 group-hover:opacity-80">
                    <img
                      src={outfit.image}
                      alt={`Outfit ${index}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Delete Button */}
                    <button
                      onClick={() => dispatch(removeOutfit(outfit.id))}
                      className="absolute inset-0 flex items-center justify-center  bg-opacity-50 opacity-0 group-hover:opacity-100 transform transition-all duration-300 px-3 py-1 bg-red-500 rounded hover:scale-105"
                    >
                      Remove ❌
                    </button>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden transform rotateY-180 bg-purple-600 rounded-xl flex flex-col items-center justify-center text-white p-2">
                    <p className="text-sm font-semibold mb-2">
                      {outfit.name || "Unnamed"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🚀 Clear All */}
        {outfits.length > 0 && (
          <button
            onClick={handleClearAll}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-2xl transform transition-all duration-500 hover:scale-110"
          >
            Clear All ✨
          </button>
        )}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulseSlow {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
        .animate-pulseSlow {
          animation: pulseSlow 3s infinite ease-in-out;
        }

        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-popIn {
          animation: popIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Wardrobe;
