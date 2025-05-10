import React from "react";

export const Popup = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 text-center w-80 border-l-4 ${
          type === "success" ? "border-green-500" : "border-red-500"
        }`}
      >
        <h3
          className={`text-lg font-semibold ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {type === "success" ? "✅ Success" : "❌ Error"}
        </h3>
        <p className="text-gray-700 mt-2">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};
