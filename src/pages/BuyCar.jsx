import React from 'react';
import { vehicleApi } from '../services/vehicleApi';
import { useEffect, useState } from 'react';
import VehicleCard from '../components/VehicleCard';

const financiers = [
  {
    name: "Stanbic Bank Kenya",
    website: "https://www.stanbicbank.co.ke",
    phone: "+254 700 000 001"
  },
  {
    name: "Co-operative Bank",
    website: "https://www.co-opbank.co.ke",
    phone: "+254 700 000 002"
  },
  {
    name: "Equity Bank",
    website: "https://www.equitybankgroup.com",
    phone: "+254 700 000 003"
  }
];

export default function BuyCar() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleApi.getVehicles({ type: 'BUY' });
      setVehicles(response.data.vehicles);
    } catch (err) {
      console.error('Failed to fetch vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Buy a Car
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-12 mb-6">
          Financing Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financiers.map((f, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{f.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">Phone: {f.phone}</p>
              <a href={f.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
