import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOutfit } from "../features/wardrobeSlice";
import { Popup } from "../components/Popup";
import { TYPES, CATEGORIES } from "../utils/constants";

const selectClass =
  "w-full px-2 py-1.5 rounded-lg bg-[#0A0A18] text-white border border-purple-900/40 focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs transition";

const Upload = () => {
  const dispatch = useDispatch();
  const outfits = useSelector((state) => state.wardrobe?.outfits || []);
  const outfitsRef = useRef(outfits);
  outfitsRef.current = outfits; // always up-to-date in async callbacks

  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState([]);
  const stagedImages = useRef(new Set()); // tracks staged base64s synchronously

  const processFiles = (files) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;

        // Check against already uploaded outfits
        if (outfitsRef.current.some((o) => o.image === base64)) {
          setPopup({ show: true, message: `"${file.name}" is already in your wardrobe.`, type: "error" });
          return;
        }

        // Check against current staging batch using a ref — no React batching issues
        if (stagedImages.current.has(base64)) {
          setPopup({ show: true, message: `"${file.name}" is already selected.`, type: "error" });
          return;
        }

        stagedImages.current.add(base64);
        setPreviews((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), image: base64, type: "Top", category: "Casual" },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) processFiles(files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) processFiles(files);
  };

  const updatePreview = (id, field, value) => {
    setPreviews((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const removePreview = (id) => {
    setPreviews((prev) => {
      const removed = prev.find((item) => item.id === id);
      if (removed) stagedImages.current.delete(removed.image);
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleUpload = () => {
    if (previews.length === 0) {
      setPopup({ show: true, message: "No images selected!", type: "error" });
      return;
    }
    previews.forEach((item) =>
      dispatch(
        addOutfit({
          id: Date.now() + Math.random(),
          image: item.image,
          type: item.type,
          category: item.category,
          date: new Date().toISOString(),
        })
      )
    );
    setPopup({
      show: true,
      message: `${previews.length} outfit${previews.length > 1 ? "s" : ""} uploaded successfully!`,
      type: "success",
    });
    stagedImages.current.clear();
    setPreviews([]);
  };

  return (
    <div className="min-h-screen bg-[#0F0F1A] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 page-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-3">
            Add to Wardrobe
          </p>
          <h1 className="text-4xl font-bold text-white mb-2">Upload Your Outfit</h1>
          <p className="text-gray-400 text-base italic">"Style begins with what you wear."</p>
        </div>

        <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-8">
          {/* Drop Zone */}
          <div
            onClick={() => fileInputRef.current.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-purple-400 bg-purple-900/20"
                : "border-purple-900/40 hover:border-purple-500/60 hover:bg-purple-900/10"
            }`}
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="text-white font-medium text-sm">Drag & drop images here</p>
            <p className="text-gray-500 text-xs mt-1">
              or click to browse — multiple files supported
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </div>

          {/* Per-image previews */}
          {previews.length > 0 && (
            <div className="mt-6 flex flex-col gap-3">
              <p className="text-gray-400 text-sm">
                {previews.length} image{previews.length > 1 ? "s" : ""} selected — set type &
                category for each:
              </p>

              {previews.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-[#0F0F1A] border border-purple-900/30 rounded-xl p-3"
                >
                  <img
                    src={item.image}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-purple-900/30"
                  />

                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Type</label>
                      <select
                        value={item.type}
                        onChange={(e) => updatePreview(item.id, "type", e.target.value)}
                        className={selectClass}
                      >
                        {TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Category</label>
                      <select
                        value={item.category}
                        onChange={(e) => updatePreview(item.id, "category", e.target.value)}
                        className={selectClass}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => removePreview(item.id)}
                    className="text-gray-600 hover:text-red-400 transition text-xl flex-shrink-0 leading-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={previews.length === 0}
            className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
          >
            Upload{" "}
            {previews.length > 0
              ? `${previews.length} Outfit${previews.length > 1 ? "s" : ""}`
              : "Outfit"}
          </button>
        </div>
      </div>

      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Upload;
