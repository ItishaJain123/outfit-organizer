import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const outfits = useSelector((state) => state.wardrobe.outfits);
  const favorites = outfits.filter((o) => o.isFavorite);
  const recentOutfits = outfits.slice(-3).reverse();

  const categoryCount = outfits.reduce((acc, o) => {
    acc[o.category] = (acc[o.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div className="min-h-screen bg-[#0F0F1A] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 page-fade-in">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-4">
            Your Personal Style Hub
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Perfect Look</span> Awaits
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Organize your wardrobe, discover outfit combinations, and track your style — all in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/upload"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Upload Outfit
            </Link>
            <Link
              to="/wardrobe"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold border border-white/20 transition-all duration-300 hover:scale-105"
            >
              View Wardrobe ({outfits.length})
            </Link>
            <Link
              to="/recommendations"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold border border-white/20 transition-all duration-300 hover:scale-105"
            >
              Get Recommendations ✨
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Total Outfits", value: outfits.length },
            { label: "Favorites", value: favorites.length },
            { label: "Top Category", value: topCategory },
            { label: "Combinations", value: outfits.filter(o => o.type === "Top").length * outfits.filter(o => o.type === "Jeans").length },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-5 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Uploads */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {outfits.length === 0 ? "Your Wardrobe" : "Recently Added"}
          </h2>

          {outfits.length === 0 ? (
            <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-12 text-center">
              <p className="text-gray-400 text-lg mb-4">Your wardrobe is empty.</p>
              <Link
                to="/upload"
                className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-medium hover:scale-105 transition"
              >
                Add your first outfit
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {recentOutfits.map((outfit) => (
                <div
                  key={outfit.id}
                  className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={outfit.image}
                      alt={outfit.type}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-white font-semibold">{outfit.type}</p>
                    <p className="text-gray-400 text-sm">{outfit.category}</p>
                    {outfit.isFavorite && <p className="text-pink-400 text-xs mt-1">❤️ Favorite</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
