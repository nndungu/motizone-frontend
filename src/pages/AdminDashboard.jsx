// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/axios";

// Dummy stats if backend is not available
const dummyStats = [
  { name: "Total Users", value: 120, icon: "👤" },
  { name: "Total Vehicles", value: 45, icon: "🚗" },
  { name: "Total Bookings", value: 87, icon: "📅" },
  { name: "Total Revenue", value: "KES 1,250,000", icon: "💰" },
];

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    api.get("/admin/revenue")
      .then(res => setRevenue(res.data))
      .catch(() => setRevenue(dummyStats)); // fallback to dummy stats
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {revenue.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Admin Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/vehicles" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2">Manage Vehicles</h3>
          <p className="text-gray-600 dark:text-gray-400">Add, edit, or remove vehicles</p>
        </Link>

        <Link to="/admin/users" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <p className="text-gray-600 dark:text-gray-400">View and manage users</p>
        </Link>

        <Link to="/admin/bookings" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2">Manage Bookings</h3>
          <p className="text-gray-600 dark:text-gray-400">Track all bookings</p>
        </Link>

        <Link to="/admin/analytics" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600 dark:text-gray-400">View revenue & performance metrics</p>
        </Link>

        <Link to="/admin/settings" className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <p className="text-gray-600 dark:text-gray-400">Update platform configurations</p>
        </Link>
      </div>
    </div>
  );
}
