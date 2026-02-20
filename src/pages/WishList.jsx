// src/pages/WishList.jsx
import React, { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setLoading(true);
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
    setLoading(false);
  }, []);

  // Remove a vehicle from the wishlist
  const toggleWishlist = (vehicle) => {
    const updated = wishlist.filter((v) => v.id !== vehicle.id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          Your wishlist is empty. Browse vehicles and add your favorites!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onToggleWishlist={toggleWishlist}
              isInWishlist={true} // all items here are in wishlist
            />
          ))}
        </div>
      )}
    </div>
  );
}
