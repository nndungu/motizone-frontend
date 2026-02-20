// import React, { useState, useEffect } from 'react';
// import Filters from '../components/Filters';
// import VehicleCard from '../components/VehicleCard';
// import Pagination from '../components/Pagination';
// import { vehicleApi } from '../services/vehicleApi';
// import LoadingSpinner from '../components/LoadingSpinner';

// export default function Vehicles() {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     fetchVehicles();
//   }, [currentPage, filters]);

//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       const response = await vehicleApi.getVehicles({ page: currentPage, ...filters });
//       setVehicles(response.data.vehicles);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Failed to fetch vehicles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
//         Browse Vehicles
//       </h1>
      
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="lg:w-1/4">
//           <Filters onFilterChange={setFilters} />
//         </div>
        
//         <div className="lg:w-3/4">
//           {loading ? (
//             <LoadingSpinner />
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {vehicles.map(vehicle => (
//                   <VehicleCard key={vehicle.id} vehicle={vehicle} />
//                 ))}
//               </div>
              
//               {vehicles.length === 0 && (
//                 <div className="text-center py-12">
//                   <p className="text-gray-600 dark:text-gray-400">No vehicles found</p>
//                 </div>
//               )}
              
//               <Pagination 
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// src/pages/Vehicle.jsx
import React, { useState, useEffect } from "react";

// Components
import Filters from "../components/Filters";
import VehicleCard from "../components/VehicleCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Vehicles() {
  // State
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  // Dummy data for testing
  const dummyVehicles = [
    { id: 1, name: "Tesla Model 3", price: "$50,000", image: "/tesla.jpg" },
    { id: 2, name: "Ford Mustang", price: "$60,000", image: "/mustang.jpg" },
    { id: 3, name: "Chevrolet Camaro", price: "$55,000", image: "/camaro.jpg" },
    { id: 4, name: "BMW i4", price: "$58,000", image: "/bmw-i4.jpg" },
  ];

  useEffect(() => {
    // Simulate API fetch with a delay
    setLoading(true);
    const timer = setTimeout(() => {
      setVehicles(dummyVehicles);
      setTotalPages(1);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Browse Vehicles
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <Filters onFilterChange={setFilters} />
        </div>

        {/* Vehicle List */}
        <div className="lg:w-3/4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {vehicles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">
                    No vehicles found
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
