import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { user } = useAuth();

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 h-[500px] overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-center lg:text-left lg:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
            Discover the best deals on new and used cars. Buy, rent, or sell with confidence.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            {/* Browse Vehicles */}
            <Link
              to="/vehicles"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center"
            >
              Browse Vehicles
            </Link>

            {/* Pricing */}
            <Link
              to="/pricing"
              className="bg-white/20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition duration-300 text-center"
            >
              Pricing
            </Link>

            {/* Financing */}
            <Link
              to="/financing"
              className="bg-white/20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition duration-300 text-center"
            >
              Financing
            </Link>

            {/* List Your Car or Sign In */}
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin/vehicles' : '/register-car'}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300 text-center"
              >
                List Your Car
              </Link>
            ) : (
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition duration-300 text-center"
              >
                Sign In to List
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* Decorative Car Image */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-1/2 h-full">
        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="150" cy="70" r="10" fill="white" fillOpacity="0.1"/>
          <circle cx="180" cy="70" r="10" fill="white" fillOpacity="0.1"/>
          <rect x="120" y="40" width="80" height="30" rx="5" fill="white" fillOpacity="0.1"/>
          <rect x="140" y="30" width="60" height="20" rx="3" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>
    </div>
  );
}
