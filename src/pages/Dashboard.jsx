// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import VehicleCard from "../components/VehicleCard.jsx";

// Dummy data
const dummyVehicles = [
  {
    id: 1,
    title: "Tesla Model S",
    brand: "Tesla",
    model: "Model S",
    price: 120000,
    type: "RENTAL",
    year: 2024,
    rating: 5,
    reviews: 12,
    imageUrl: "https://tesla-cdn.thron.com/delivery/public/image/tesla/ModelS",
    description: "Luxury electric car with autopilot."
  },
  {
    id: 2,
    title: "BMW 3 Series",
    brand: "BMW",
    model: "3 Series",
    price: 60000,
    type: "SALE",
    year: 2023,
    rating: 4,
    reviews: 8,
    imageUrl: "https://cdn.bmw.com/3series.jpg",
    description: "Performance sedan with modern features."
  },
];

const recentBookings = [
  { id: 1, vehicle: "Toyota Land Cruiser", date: "2024-02-15", status: "Active" },
  { id: 2, vehicle: "Honda Civic", date: "2024-02-10", status: "Completed" },
  { id: 3, vehicle: "BMW X5", date: "2024-02-05", status: "Completed" },
];

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: "Total Bookings", value: "12", icon: "📅" },
    { name: "Active Rentals", value: "3", icon: "🚗" },
    { name: "Wishlist", value: "8", icon: "❤️" },
    { name: "Total Spent", value: "KES 125,000", icon: "💰" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.username || "User"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your bookings and account settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          to="/vehicles"
          className="bg-primary-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Browse Vehicles</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Find your next ride</p>
        </Link>

        <Link
          to="/bookings"
          className="bg-primary-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">My Bookings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">View your booking history</p>
        </Link>

        <Link
          to="/profile"
          className="bg-primary-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Profile Settings</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Update your information</p>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{booking.vehicle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary-600 hover:text-primary-900">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Vehicles */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recommended Vehicles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
}
