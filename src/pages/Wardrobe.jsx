import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeOutfit, clearWardrobe, toggleFavorite, updateOutfit } from "../features/wardrobeSlice";
import ConfirmModal from "../components/ConfirmModal";
import EditModal from "../components/EditModal";
import { Popup } from "../components/Popup";
import { TYPES, CATEGORIES } from "../utils/constants";

const Wardrobe = () => {
  const outfits = useSelector((state) => state.wardrobe?.outfits || []);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [editingOutfit, setEditingOutfit] = useState(null);

  const filtered = outfits
    .filter((o) => {
      const matchesType = filterType === "All" || o.type === filterType;
      const matchesCategory = filterCategory === "All" || o.category === filterCategory;
      const matchesSearch =
        !searchQuery ||
        o.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "favorites") return b.isFavorite - a.isFavorite;
      return 0;
    });

  const selectClass =
    "px-3 py-2 rounded-xl bg-[#0F0F1A] text-white border border-purple-900/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-sm";

  return (
    <div className="min-h-screen bg-[#0F0F1A] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 page-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-3">Your Collection</p>
          <h1 className="text-4xl font-bold text-white mb-2">Virtual Wardrobe</h1>
          <p className="text-gray-400 italic text-base">"Style is a way to say who you are without speaking."</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search by type or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-[160px] px-4 py-2 rounded-xl bg-[#0F0F1A] text-white placeholder-gray-500 border border-purple-900/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
            <option value="All">All Types</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectClass}>
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="favorites">Favorites First</option>
          </select>
        </div>

        {/* Count + Clear */}
        {outfits.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">
              Showing <span className="text-white font-medium">{filtered.length}</span> of {outfits.length} outfits
            </p>
            <button
              onClick={() => setShowConfirm(true)}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Grid */}
        {outfits.length === 0 ? (
          <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-16 text-center">
            <p className="text-gray-400 text-lg mb-2">Your wardrobe is empty</p>
            <p className="text-gray-600 text-sm">Upload some outfits to get started.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-12 text-center">
            <p className="text-gray-400">No outfits match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filtered.map((outfit) => (
              <div
                key={outfit.id}
                className="relative aspect-square group rounded-xl overflow-hidden border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300"
              >
                <img
                  src={outfit.image}
                  alt={outfit.type}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-between p-3">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch(toggleFavorite(outfit.id)); }}
                      className="text-xl drop-shadow-lg"
                    >
                      {outfit.isFavorite ? "❤️" : "🤍"}
                    </button>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-semibold">{outfit.type}</p>
                    <p className="text-gray-300 text-xs">{outfit.category}</p>
                    <div className="flex gap-1.5 mt-2">
                      <button
                        onClick={() => setEditingOutfit(outfit)}
                        className="flex-1 py-1 bg-purple-600/80 hover:bg-purple-600 text-white text-xs rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(outfit)}
                        className="flex-1 py-1 bg-red-500/80 hover:bg-red-500 text-white text-xs rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {outfit.isFavorite && (
                  <span className="absolute top-2 left-2 text-sm group-hover:opacity-0 transition-opacity">❤️</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {editingOutfit && (
        <EditModal
          outfit={editingOutfit}
          onSave={({ type, category }) => {
            dispatch(updateOutfit({ id: editingOutfit.id, type, category }));
            setEditingOutfit(null);
          }}
          onCancel={() => setEditingOutfit(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmModal
          message={`Remove this ${deleteTarget.type} (${deleteTarget.category}) from your wardrobe? This cannot be undone.`}
          confirmText="Yes, remove"
          onConfirm={() => {
            dispatch(removeOutfit(deleteTarget.id));
            setDeleteTarget(null);
            setPopup({ show: true, message: "Outfit removed successfully." });
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          message="This will permanently remove all outfits from your wardrobe."
          confirmText="Yes, clear all"
          onConfirm={() => {
            dispatch(clearWardrobe());
            setShowConfirm(false);
            setPopup({ show: true, message: "Wardrobe cleared successfully." });
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {popup.show && (
        <Popup
          message={popup.message}
          type="success"
          onClose={() => setPopup({ show: false, message: "" })}
        />
      )}
    </div>
  );
};

export default Wardrobe;
