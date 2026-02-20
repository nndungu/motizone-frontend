// src/pages/AdminAnalytics.jsx
import React from "react";

// Optional chart library placeholder
// You can replace these with Chart.js, Recharts, ApexCharts, etc.
const ChartPlaceholder = ({ title }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center justify-center h-48">
    <h2 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">{title}</h2>
    <p className="text-gray-400 dark:text-gray-400">Chart goes here</p>
  </div>
);

export default function AdminAnalytics() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Admin Analytics Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Total Vehicles</h2>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">120</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Total Bookings</h2>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">85</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Revenue</h2>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">$45,000</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartPlaceholder title="Bookings per Month" />
        <ChartPlaceholder title="Vehicle Popularity" />
      </div>

      {/* Future charts or tables */}
      <div className="mt-8">
        <ChartPlaceholder title="Revenue Trends" />
      </div>
    </div>
  );
}
