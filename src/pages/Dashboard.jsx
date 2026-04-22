import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = ["#7C3AED", "#EC4899", "#06B6D4", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6", "#F97316"];

const Dashboard = () => {
  const outfits = useSelector((state) => state.wardrobe.outfits);
  const favorites = outfits.filter((o) => o.isFavorite);

  // ── Last 7 days line chart ──────────────────────────────────────────────
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const uploadsByDay = last7Days.map((day) => ({
    name: day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    uploads: outfits.filter((o) => new Date(o.date).toDateString() === day.toDateString()).length,
  }));

  // ── Category & type counts ──────────────────────────────────────────────
  const categoryCount = {};
  outfits.forEach((o) => { categoryCount[o.category] = (categoryCount[o.category] || 0) + 1; });
  const categoryData = Object.entries(categoryCount).map(([category, count]) => ({ category, count }));

  const typeCount = {};
  outfits.forEach((o) => { typeCount[o.type] = (typeCount[o.type] || 0) + 1; });
  const typeData = Object.entries(typeCount).map(([name, value]) => ({ name, value }));

  const favCatCount = {};
  favorites.forEach((o) => { favCatCount[o.category] = (favCatCount[o.category] || 0) + 1; });
  const favData = Object.entries(favCatCount).map(([category, count]) => ({ category, count }));

  const sortedCategoryData = [...categoryData].sort((a, b) => b.count - a.count);
  const topCategory = sortedCategoryData[0]?.category || "—";
  const sortedTypeData = [...typeData].sort((a, b) => b.value - a.value);
  const topType = sortedTypeData[0]?.name || "—";


  const tooltipStyle = {
    backgroundColor: "#1A1A2E",
    border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: 12,
  };
  const chartCard = "bg-[#1A1A2E] border border-purple-900/30 rounded-2xl p-6";
  const axisStyle = { fill: "#9CA3AF", fontSize: 11 };

  return (
    <div className="min-h-screen bg-[#0F0F1A] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-pink-950/20 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 page-fade-in">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-purple-400 text-sm font-medium uppercase tracking-widest mb-3">Analytics</p>
          <h1 className="text-4xl font-bold text-white mb-2">Outfit Dashboard</h1>
          <p className="text-gray-400 text-base">Insights from your wardrobe collection.</p>
        </div>

        {outfits.length === 0 ? (
          <div className={`${chartCard} text-center py-20`}>
            <p className="text-gray-400 text-lg">No data yet.</p>
            <p className="text-gray-600 text-sm mt-2">Start uploading outfits to see analytics.</p>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Outfits", value: outfits.length },
                { label: "Favorites", value: favorites.length },
                { label: "Top Category", value: topCategory },
                { label: "Top Type", value: topType },
              ].map((s) => (
                <div key={s.label} className={`${chartCard} text-center`}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Line chart — last 7 days */}
            <div className={`${chartCard} mb-6`}>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">Uploads — Last 7 Days</h2>
                <p className="text-gray-500 text-xs mt-0.5">How many outfits you uploaded each day</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={uploadsByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={axisStyle} />
                  <YAxis tick={axisStyle} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="uploads" stroke="#EC4899" strokeWidth={2.5} dot={{ fill: "#7C3AED", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart — by type */}
            <div className={`${chartCard} mb-6`}>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">By Type</h2>
                <p className="text-gray-500 text-xs mt-0.5">Breakdown of clothing types</p>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={35}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {typeData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ color: "#9CA3AF", fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar chart — by category */}
            <div className={`${chartCard} mb-6`}>
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">By Category</h2>
                <p className="text-gray-500 text-xs mt-0.5">Number of outfits per occasion</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="category" tick={axisStyle} />
                  <YAxis tick={axisStyle} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Favorites by category */}
            {favData.length > 0 && (
              <div className={chartCard}>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-white">Favorites by Category</h2>
                  <p className="text-gray-500 text-xs mt-0.5">Which categories you love most</p>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={favData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="category" tick={axisStyle} />
                    <YAxis tick={axisStyle} allowDecimals={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" fill="#EC4899" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
