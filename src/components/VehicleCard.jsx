import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingModal from './BookingModal';

export default function VehicleCard({ vehicle, onToggleWishlist, isInWishlist }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultImage = 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80';

  return (
    <>
      <div className="card group relative">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageError ? defaultImage : vehicle.imageUrl || defaultImage}
            alt={vehicle.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            onError={() => setImageError(true)}
          />
          {vehicle.type && (
            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
              vehicle.type === 'RENTAL' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}>
              {vehicle.type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {vehicle.title || `${vehicle.brand} ${vehicle.model}`}
          </h3>

          <div className="flex items-center space-x-2 mb-3">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(vehicle.rating || 4))}
              {'☆'.repeat(5 - Math.floor(vehicle.rating || 4))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({vehicle.reviews || 0} reviews)
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {vehicle.description || 'Experience luxury and performance with this amazing vehicle.'}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                KES {vehicle.price?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {vehicle.type === 'RENTAL' ? '/day' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{vehicle.year || '2024'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link 
              to={`/vehicle/${vehicle.id}`}
              className="flex-1 btn-secondary text-center"
            >
              Details
            </Link>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="flex-1 btn-primary"
            >
              {vehicle.type === 'RENTAL' ? 'Rent Now' : 'Buy Now'}
            </button>
            <button
              onClick={() => onToggleWishlist(vehicle)}
              className={`flex-1 border rounded px-2 py-1 text-sm font-medium transition ${
                isInWishlist ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {isInWishlist ? 'Remove Wishlist' : 'Add Wishlist'}
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
    </>
  );
}
