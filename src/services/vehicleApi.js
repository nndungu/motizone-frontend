// import axios from "axios";

// // Use Vite environment variable
// const API_BASE_URL =
//   import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
//   "http://localhost:5000/api";

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach JWT token automatically
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Auto logout on 401 errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// // Utility to clean empty filters
// const cleanFilters = (filters) => {
//   return Object.fromEntries(
//     Object.entries(filters).filter(
//       ([_, value]) => value !== "" && value !== null && value !== undefined
//     )
//   );
// };

// export const vehicleApi = {
//   // Get all vehicles with optional filters
//   getVehicles: (filters = {}) => {
//     const cleaned = cleanFilters(filters);
//     return api.get("/vehicles", { params: cleaned });
//   },

//   // Get single vehicle by ID
//   getVehicleById: (id) => api.get(`/vehicles/${id}`),

//   // Filter vehicles by type
//   filterByType: (type, filters = {}) => {
//     const cleaned = cleanFilters(filters);
//     return api.get("/vehicles", {
//       params: { type, ...cleaned },
//     });
//   },

//   // Search vehicles
//   searchVehicles: (query) =>
//     api.get("/vehicles/search", { params: { q: query } }),

//   // Create vehicle (admin only)
//   createVehicle: (vehicleData) =>
//     api.post("/vehicles", vehicleData),

//   // Update vehicle (admin only)
//   updateVehicle: (id, vehicleData) =>
//     api.put(`/vehicles/${id}`, vehicleData),

//   // Delete vehicle (admin only)
//   deleteVehicle: (id) =>
//     api.delete(`/vehicles/${id}`),

//   // Book a vehicle (rental)
//   bookVehicle: (vehicleId, bookingData) =>
//     api.post(`/vehicles/${vehicleId}/book`, bookingData),

//   // Get user bookings
//   getUserBookings: () =>
//     api.get("/bookings"),
// };

// export default api;


// src/services/vehicleApi.js
import axios from "axios";

// Use Vite environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: auto logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Clean empty filters
const cleanFilters = (filters) =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => value !== "" && value != null
    )
  );

// Vehicle API
export const vehicleApi = {
  getVehicles: async (filters = {}) => {
    try {
      const cleaned = cleanFilters(filters);
      const response = await api.get("/vehicles", { params: cleaned });
      return response.data; // API should return { vehicles: [], totalPages: number } or array
    } catch (error) {
      console.error("Vehicle API failed:", error);
      return null; // fallback to null if API fails
    }
  },
};

export default api;
