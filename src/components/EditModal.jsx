import React, { useState } from "react";
import { TYPES, CATEGORIES } from "../utils/constants";

const selectClass =
  "w-full px-3 py-2 rounded-xl bg-[#0F0F1A] text-white border border-purple-900/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm transition";

const EditModal = ({ outfit, onSave, onCancel }) => {
  const [type, setType] = useState(outfit.type);
  const [category, setCategory] = useState(outfit.category);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#1A1A2E] border border-purple-900/40 rounded-2xl p-6 w-full max-w-sm shadow-2xl page-fade-in">
        <h3 className="text-white text-xl font-bold mb-1">Edit Outfit</h3>
        <p className="text-gray-500 text-sm mb-5">Update the type and category for this item.</p>

        <div className="flex gap-3 mb-2">
          <img
            src={outfit.image}
            alt={outfit.type}
            className="w-20 h-20 object-cover rounded-xl border border-purple-900/40 flex-shrink-0"
          />
          <div className="flex flex-col gap-3 flex-1">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className={selectClass}>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-5">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ type, category })}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition text-sm font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
