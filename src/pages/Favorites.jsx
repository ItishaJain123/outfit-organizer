import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../features/wardrobeSlice";

const Favorites = () => {
  const outfits = useSelector((state) => state.wardrobe?.outfits || []);
  const dispatch = useDispatch();
  const favorites = outfits.filter((o) => o.isFavorite);

  return (
    <div className="min-h-screen bg-[#0F0F1A] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-950/30 via-transparent to-purple-950/30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 page-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-pink-400 text-sm font-medium uppercase tracking-widest mb-3">Saved</p>
          <h1 className="text-4xl font-bold text-white mb-2">Favorites</h1>
          <p className="text-gray-400 italic text-base">"Your most loved pieces, all in one place."</p>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-16 text-center">
            <p className="text-4xl mb-4">🤍</p>
            <p className="text-gray-400 text-lg mb-2">No favorites yet</p>
            <p className="text-gray-600 text-sm">
              Go to your Wardrobe and tap the heart icon on any outfit to save it here.
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm mb-6">
              <span className="text-white font-medium">{favorites.length}</span> of {outfits.length} outfits favorited
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {favorites.map((outfit) => (
                <div
                  key={outfit.id}
                  className="relative aspect-square group rounded-xl overflow-hidden border border-pink-900/40 hover:border-pink-500/50 transition-all duration-300"
                >
                  <img
                    src={outfit.image}
                    alt={outfit.type}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-between p-3">
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => dispatch(toggleFavorite(outfit.id))}
                        className="text-xl drop-shadow-lg"
                        title="Remove from favorites"
                      >
                        ❤️
                      </button>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-xs font-semibold">{outfit.type}</p>
                      <p className="text-gray-300 text-xs">{outfit.category}</p>
                      <button
                        onClick={() => dispatch(toggleFavorite(outfit.id))}
                        className="mt-2 w-full py-1 bg-pink-500/80 hover:bg-pink-500 text-white text-xs rounded-lg transition"
                      >
                        Unfavorite
                      </button>
                    </div>
                  </div>

                  {/* Pink heart badge */}
                  <span className="absolute top-2 left-2 text-sm group-hover:opacity-0 transition-opacity">❤️</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
