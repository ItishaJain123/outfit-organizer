import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOutfit } from "../features/wardrobeSlice";
import { Popup } from "../components/Popup";

const Upload = () => {
  const dispatch = useDispatch();
  const outfits = useSelector((state) => state.wardrobe?.outfits || []);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedType, setSelectedType] = useState("Top");
  const [selectedCategory, setSelectedCategory] = useState("Casual");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    let newImages = [];
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (outfits.some((outfit) => outfit.image === reader.result)) {
          setPopup({
            show: true,
            message: "This image is already uploaded!",
            type: "error",
          });
        } else {
          newImages.push(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }

    setTimeout(() => {
      if (newImages.length > 0) {
        setPreviewImages([...previewImages, ...newImages]);
      }
    }, 500);
  };

  const handleUpload = () => {
    if (previewImages.length === 0) {
      setPopup({ show: true, message: "No image selected!", type: "error" });
      return;
    }

    previewImages.forEach((image) =>
      dispatch(
        addOutfit({
          id: Date.now(),
          image,
          type: selectedType,
          category: selectedCategory,
          date: new Date().toISOString(),
        })
      )
    );

    setPopup({
      show: true,
      message: "Images uploaded successfully!",
      type: "success",
    });

    setPreviewImages([]);
    fileInputRef.current.value = "";
  };

  const handlePopupClose = () => {
    setPopup({ show: false, message: "", type: "" });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-[#1E1E2E] to-[#3D348B] p-6 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute w-72 h-72 bg-[#FF416C] opacity-30 rounded-full top-20 left-10 blur-3xl animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-[#FFD700] opacity-20 rounded-full bottom-10 right-10 blur-3xl animate-pulse"></div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg wave-animation">
        Upload Your Dress Here 🛍️
      </h1>
      <p className="text-gray-300 text-lg mt-2 fade-in italic">
        "Style begins with what you wear!"
      </p>

      <div className="bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-gray-300 text-center mt-10 transform hover:scale-105 transition-all duration-300">
        {/* Dropdowns */}
        <div className="flex flex-col gap-4 items-center mb-6">
          <div className="text-left w-full max-w-xs">
            <label className="block text-sm font-medium text-white mb-1">
              Select Type:
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white text-gray-800 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
            >
              <option value="Top">Top</option>
              <option value="Jeans">Jeans</option>
              <option value="Dress">Dress</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="text-left w-full max-w-xs">
            <label className="block text-sm font-medium text-white mb-1">
              Select Category:
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-white text-gray-800 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Traditional">Traditional</option>
              <option value="Party">Party</option>
            </select>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-300 bg-white bg-opacity-10 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#FFD700] hover:shadow-2xl transition-all duration-300"
          onClick={() => fileInputRef.current.click()}
        >
          <p className="text-black text-lg font-semibold">Drag & Drop Images</p>
          <p className="text-gray-700 text-sm">or click to browse</p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>

        {/* Image Preview */}
        {previewImages.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {previewImages.map((img, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={img}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white rounded-full shadow-lg font-semibold text-lg tracking-wide hover:shadow-2xl hover:scale-105 transition-all duration-300"
          onClick={handleUpload}
        >
          🚀 Upload Now
        </button>
      </div>

      {/* Popup */}
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handlePopupClose}
        />
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes wave-motion {
          0% {
            transform: translateY(0px);
          }
          25% {
            transform: translateY(-5px);
          }
          50% {
            transform: translateY(0px);
          }
          75% {
            transform: translateY(5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .wave-animation {
          display: inline-block;
          animation: wave-motion 2s infinite ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Upload;
