import React from "react";

export const Popup = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 px-4">
      <div className="bg-[#1A1A2E] border border-purple-900/40 rounded-2xl shadow-2xl p-6 text-center w-80 page-fade-in">
        <div className={`text-3xl mb-3`}>{type === "success" ? "✅" : "❌"}</div>
        <h3 className={`text-lg font-semibold mb-1 ${type === "success" ? "text-green-400" : "text-red-400"}`}>
          {type === "success" ? "Success" : "Error"}
        </h3>
        <p className="text-gray-300 text-sm mt-1 mb-5">{message}</p>
        <button
          className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg transition-all duration-300 text-sm font-medium"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};
