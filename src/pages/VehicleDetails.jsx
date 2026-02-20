import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { vehicleApi } from '../services/vehicleApi.js';  
import BookingModal from '../components/BookingModal.jsx';  

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchVehicleDetails();
  }, [id]);

  const fetchVehicleDetails = async () => {
    try {
      setLoading(true);
      const response = await vehicleApi.getVehicleById(id);
      setVehicle(response.data);
    } catch (err) {
      setError('Failed to fetch vehicle details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">{error || 'Vehicle not found'}</p>
        </div>
      </div>
    );
  }

  // Mock images array (replace with actual vehicle images from API)
  const images = [
    vehicle.imageUrl,
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf'
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Home</a>
        <span className="mx-2 text-gray-400">/</span>
        <a href="/vehicles" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Vehicles</a>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 dark:text-white font-medium">{vehicle.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4 h-96">
            <img
              src={images[selectedImage]}
              alt={vehicle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden h-24 ${
                  selectedImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${vehicle.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {vehicle.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {vehicle.brand} {vehicle.model} {vehicle.year}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              {'★'.repeat(Math.floor(vehicle.rating || 4))}
              {'☆'.repeat(5 - Math.floor(vehicle.rating || 4))}
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              ({vehicle.reviews || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
              KES {vehicle.price?.toLocaleString()}
            </span>
            <span className="text-gray-600 dark:text-gray-400 ml-2">
              {vehicle.type === 'RENTAL' ? '/day' : ''}
            </span>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Mileage</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {vehicle.mileage?.toLocaleString() || 'N/A'} km
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Fuel Type</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {vehicle.fuelType || 'Petrol'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Transmission</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {vehicle.transmission || 'Automatic'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Seats</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {vehicle.seats || 5}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {vehicle.description || 'Experience luxury and performance with this amazing vehicle. Perfect for both business and leisure, this car offers exceptional comfort and reliability.'}
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Key Features
            </h2>
            <ul className="grid grid-cols-2 gap-2">
              {[
                'Air Conditioning',
                'Bluetooth',
                'GPS Navigation',
                'Backup Camera',
                'Cruise Control',
                'Leather Seats'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="flex-1 btn-primary py-4 text-lg"
            >
              {vehicle.type === 'RENTAL' ? 'Rent This Car' : 'Buy This Car'}
            </button>
            <button className="btn-secondary py-4 px-6">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        vehicle={vehicle}
      />
    </div>
  );
}