import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "👗",
    title: "Virtual Wardrobe",
    desc: "Upload and organise your outfits in a visual grid. Filter by type, category, or search — and sort by newest, oldest, or favorites.",
  },
  {
    icon: "✨",
    title: "Outfit Recommendations",
    desc: "Smart pairing engine that combines tops, bottoms, and layers from your wardrobe into ready-to-wear looks, grouped by occasion.",
  },
  {
    icon: "❤️",
    title: "Favorites",
    desc: "Heart any outfit to save it to your Favorites collection. Unfavoriting removes it only from Favorites — never from your wardrobe.",
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Visual charts showing uploads over the last 7 days, outfit type breakdown, category distribution, and your most-favorited styles.",
  },
  {
    icon: "🔍",
    title: "Search & Filter",
    desc: "Real-time search with type, category, and sort filters. Duplicate detection prevents the same image from being uploaded twice.",
  },
  {
    icon: "💾",
    title: "Persistent Storage",
    desc: "Your wardrobe is saved to localStorage so your data survives page refreshes — no account or backend required.",
  },
];


const About = () => {
  return (
    <div className="min-h-screen bg-[#0F0F1A] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 page-fade-in">

        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-4">About This Project</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Wardrobe Manager
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A personal fashion organiser built to help you manage, style, and understand your wardrobe — entirely in the browser, with no backend required.
          </p>
        </div>

        {/* What & Why */}
        <div className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">What is this?</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Wardrobe Manager is a React-based web application that lets you upload photos of your clothing, categorise them by type and occasion, and get smart outfit combination suggestions — all without signing up or connecting to any server.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The project was built to demonstrate proficiency in modern frontend development — state management with Redux Toolkit, client-side persistence with localStorage, data visualisation with Recharts, and a consistent design system built entirely with Tailwind CSS.
          </p>
        </div>

        {/* Features grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-5 hover:border-purple-500/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="text-white font-semibold text-base">{f.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-5">Ready to try it out?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/upload"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Upload an Outfit
            </Link>
            <Link
              to="/wardrobe"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold border border-white/20 transition-all duration-300 hover:scale-105"
            >
              View Wardrobe
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
