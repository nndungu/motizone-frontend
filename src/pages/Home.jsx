// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar.jsx";
import Filters from "../components/Filters.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { vehicleApi } from "../services/vehicleApi.js";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: "",
    brand: "",
    model: "",
    minPrice: "",
    maxPrice: "",
  });
  const [wishlist, setWishlist] = useState([]);

  // Dummy fallback vehicles
  const fallbackVehicles = [
    { id: 1, title: "Tesla Model 3", brand: "Tesla", model: "Model 3", price: 50000, imageUrl: "/tesla.jpg", type: "RENTAL", rating: 4, reviews: 12, year: 2024, description: "Electric sedan with autopilot." },
    { id: 2, title: "Ford Mustang", brand: "Ford", model: "Mustang", price: 60000, imageUrl: "/mustang.jpg", type: "SALE", rating: 5, reviews: 20, year: 2023, description: "Classic muscle car." },
    { id: 3, title: "BMW i4", brand: "BMW", model: "i4", price: 58000, imageUrl: "/bmw-i4.jpg", type: "RENTAL", rating: 4, reviews: 8, year: 2024, description: "Luxury electric coupe." },
  ];

  // Load vehicles & wishlist from API / localStorage on mount
  useEffect(() => {
    fetchVehicles();
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, vehicles]);

  // Persist wishlist in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch vehicles from API with fallback
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await vehicleApi.getVehicles();
      setVehicles(data || fallbackVehicles);
      setFilteredVehicles(data || fallbackVehicles);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vehicles");
      setVehicles(fallbackVehicles);
      setFilteredVehicles(fallbackVehicles);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...vehicles];

    if (filters.type) filtered = filtered.filter((v) => v.type === filters.type);
    if (filters.brand) filtered = filtered.filter((v) => v.brand?.toLowerCase().includes(filters.brand.toLowerCase()));
    if (filters.model) filtered = filtered.filter((v) => v.model?.toLowerCase().includes(filters.model.toLowerCase()));
    if (filters.minPrice) filtered = filtered.filter((v) => v.price >= Number(filters.minPrice));
    if (filters.maxPrice) filtered = filtered.filter((v) => v.price <= Number(filters.maxPrice));

    setFilteredVehicles(filtered);
  };

  // Handle search input
  const handleSearch = (query) => {
    const searchResults = vehicles.filter(
      (v) =>
        v.title?.toLowerCase().includes(query.toLowerCase()) ||
        v.brand?.toLowerCase().includes(query.toLowerCase()) ||
        v.model?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVehicles(searchResults);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Wishlist toggle
  const toggleWishlist = (vehicle) => {
    setWishlist((prev) => {
      const exists = prev.find((v) => v.id === vehicle.id);
      if (exists) return prev.filter((v) => v.id !== vehicle.id);
      return [...prev, vehicle];
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button onClick={fetchVehicles} className="mt-4 btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters and Vehicle Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Filters onFilterChange={handleFilterChange} />
          </div>

          {/* Vehicle Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                No vehicles match your search or filters.
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Showing {filteredVehicles.length} vehicles
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onToggleWishlist={toggleWishlist}
                      isInWishlist={wishlist.some((v) => v.id === vehicle.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
