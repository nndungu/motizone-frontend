import React from 'react';
import VehicleCard from './VehicleCard';

export default function FeaturedVehicles({ vehicles = [], title = "Featured Vehicles" }) {
  if (!vehicles.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600 dark:text-gray-400">No vehicles found</h3>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}