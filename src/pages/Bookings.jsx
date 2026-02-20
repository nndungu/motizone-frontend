import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { vehicleApi } from '../services/vehicleApi.js';  
import LoadingSpinner from '../components/LoadingSpinner.jsx';


export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await vehicleApi.getUserBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Bookings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your vehicle bookings and reservations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'active').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-blue-600">
            {bookings.filter(b => b.status === 'completed').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
          <p className="text-2xl font-bold text-primary-600">
            KES {bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {['all', 'active', 'pending', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookings found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {filter === 'all' 
              ? "You haven't made any bookings yet" 
              : `No ${filter} bookings found`}
          </p>
          <Link to="/vehicles" className="btn-primary">
            Browse Vehicles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  {/* Vehicle Info */}
                  <div className="flex items-start space-x-4">
                    <img
                      src={booking.vehicle?.imageUrl || 'https://images.unsplash.com/photo-1580273916550-e323be2ae537'}
                      alt={booking.vehicle?.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {booking.vehicle?.title || 'Vehicle'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {booking.vehicle?.brand} {booking.vehicle?.model} {booking.vehicle?.year}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Booking #{booking.bookingNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="mt-4 lg:mt-0 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pickup Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Return Date</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount</p>
                      <p className="text-sm font-bold text-primary-600">
                        KES {booking.totalAmount?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.duration || '3 days'}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 lg:mt-0 flex space-x-2">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="btn-secondary text-sm px-4 py-2"
                    >
                      View Details
                    </button>
                    {booking.status === 'active' && (
                      <>
                        <button className="btn-primary text-sm px-4 py-2">
                          Extend
                        </button>
                        <button className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-700">
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedBooking(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Booking Details
                  </h3>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Booking Number</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.bookingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.pickupLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Return Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.returnLocation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(selectedBooking.pickupDate).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Return Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(selectedBooking.returnDate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Payment Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Rental Amount</span>
                        <span className="text-gray-900 dark:text-white">KES {selectedBooking.rentalAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Insurance</span>
                        <span className="text-gray-900 dark:text-white">KES {selectedBooking.insurance?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tax</span>
                        <span className="text-gray-900 dark:text-white">KES {selectedBooking.tax?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-primary-600">KES {selectedBooking.totalAmount?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Driver Information</h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedBooking.driverName}</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedBooking.driverEmail}</p>
                    <p className="text-gray-600 dark:text-gray-400">{selectedBooking.driverPhone}</p>
                    <p className="text-gray-600 dark:text-gray-400">License: {selectedBooking.driverLicense}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}