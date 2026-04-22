import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CATEGORIES, TOP_TYPES, BOTTOM_TYPES, FULL_TYPES, LAYER_TYPES } from "../utils/constants";

const categoryEmoji = {
  Casual: "👟", Formal: "👔", Traditional: "🥻", Party: "🎉",
  Wedding: "💍", Festive: "🪔", Office: "💼", Sportswear: "🏃", Beach: "🏖️", "Date Night": "🌙",
};

const buildRecommendations = (outfits) => {
  const results = [];

  CATEGORIES.forEach((cat) => {
    const inCat = outfits.filter((o) => o.category === cat);
    const tops    = inCat.filter((o) => TOP_TYPES.includes(o.type));
    const bottoms = inCat.filter((o) => BOTTOM_TYPES.includes(o.type));
    const fulls   = inCat.filter((o) => FULL_TYPES.includes(o.type));
    const layers  = inCat.filter((o) => LAYER_TYPES.includes(o.type));

    // Top + Bottom combos
    tops.forEach((top) => {
      bottoms.forEach((bottom) => {
        results.push({ category: cat, pieces: [top, bottom], label: "2-piece look" });

        // Add jacket if available
        layers.forEach((layer) => {
          results.push({ category: cat, pieces: [top, bottom, layer], label: "Layered look" });
        });
      });

      // Top alone with jacket if no bottoms
      if (bottoms.length === 0) {
        layers.forEach((layer) => {
          results.push({ category: cat, pieces: [top, layer], label: "With layer" });
        });
      }
    });

    // Complete outfits (Dress, Saree, Lehenga, Suit) — standalone
    fulls.forEach((full) => {
      results.push({ category: cat, pieces: [full], label: "Complete look" });

      // With jacket
      layers.forEach((layer) => {
        results.push({ category: cat, pieces: [full, layer], label: "Layered look" });
      });
    });
  });

  return results;
};

const Recommendations = () => {
  const outfits = useSelector((state) => state.wardrobe?.outfits || []);
  const [activeCategory, setActiveCategory] = useState("All");

  const allRecs = buildRecommendations(outfits);
  const filtered = activeCategory === "All" ? allRecs : allRecs.filter((r) => r.category === activeCategory);

  // Only show categories that have recommendations
  const activeCats = ["All", ...CATEGORIES.filter((cat) =>
    allRecs.some((r) => r.category === cat)
  )];

  return (
    <div className="min-h-screen bg-[#0F0F1A] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 page-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-3">Smart Styling</p>
          <h1 className="text-4xl font-bold text-white mb-2">Outfit Recommendations</h1>
          <p className="text-gray-400 italic text-base">"Smart combos built from your wardrobe."</p>
        </div>

        {outfits.length < 2 ? (
          <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-16 text-center">
            <p className="text-gray-400 text-lg mb-2">Not enough outfits yet</p>
            <p className="text-gray-600 text-sm">
              Upload at least 2 items in the same category to get recommendations.
            </p>
          </div>
        ) : (
          <>
            {/* Category tabs — only show cats with recs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {activeCats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-[#1A1A2E] text-gray-400 hover:text-white border border-purple-900/30 hover:border-purple-500/50"
                  }`}
                >
                  {cat === "All" ? "All" : `${categoryEmoji[cat] || ""} ${cat}`}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-12 text-center">
                <p className="text-gray-400">No recommendations for {activeCategory} yet.</p>
                <p className="text-gray-600 text-sm mt-1">
                  Try uploading matching tops and bottoms in this category.
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-400 text-sm mb-5">
                  <span className="text-white font-medium">{filtered.length}</span> combination{filtered.length !== 1 ? "s" : ""} found
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filtered.map((rec, i) => (
                    <div
                      key={i}
                      className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-5 hover:border-purple-500/50 hover:scale-[1.01] transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">{categoryEmoji[rec.category] || "👗"}</span>
                        <span className="text-white font-semibold text-sm">{rec.category}</span>
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/30">
                          {rec.label}
                        </span>
                      </div>

                      <div className="flex gap-3 justify-center mb-4 flex-wrap">
                        {rec.pieces.map((piece) => (
                          <div key={piece.id} className="flex flex-col items-center gap-1.5">
                            <div className="w-20 h-20 rounded-xl overflow-hidden border border-purple-900/40">
                              <img src={piece.image} alt={piece.type} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-gray-400 text-xs">{piece.type}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-purple-900/30" />
                        <span className="text-purple-400 text-xs">Pair together ✓</span>
                        <div className="h-px flex-1 bg-purple-900/30" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
