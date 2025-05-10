import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const outfits = useSelector((state) => state.wardrobe.outfits);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const uploadsByDay = days.map((day, idx) => ({
    name: day,
    uploads: outfits.filter((o) => new Date(o.date).getDay() === idx).length,
  }));

  const categoryCount = {};
  outfits.forEach((o) => {
    categoryCount[o.category] = (categoryCount[o.category] || 0) + 1;
  });
  const categoryData = Object.entries(categoryCount).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  const typeCount = {};
  outfits.forEach((o) => {
    typeCount[o.type] = (typeCount[o.type] || 0) + 1;
  });
  const typeData = Object.entries(typeCount).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#6A67CE",
    "#4BC0C0",
    "#9966FF",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-700 text-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        📊 Outfit Dashboard
      </h1>

      {outfits.length === 0 ? (
        <div className="text-center text-lg text-gray-200 mt-20 italic">
          🚫 No data available. Start uploading outfits to see analytics!
        </div>
      ) : (
        <>
          {/* Full Width Line Chart */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg mb-10 w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Uploads This Week
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={uploadsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="uploads"
                  stroke="#FFD700"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Half Width Pie & Bar Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart: Category */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Outfits by Category
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart: Type */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Outfit Types
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {typeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
