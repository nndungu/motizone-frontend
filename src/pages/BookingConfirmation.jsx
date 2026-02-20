import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BookingConfirmation() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBookingConfirmation();
  }, [id]);

  const fetchBookingConfirmation = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual
      const mockBooking = {
        id: id,
        bookingNumber: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        vehicle: {
          title: 'Toyota Land Cruiser V8',
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
          type: 'RENTAL'
        },
        pickupDate: '2024-03-15T10:00',
        returnDate: '2024-03-18T10:00',
        totalAmount: 54500,
        paymentMethod: 'M-Pesa',
        paymentReference: 'PTR' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        status: 'confirmed',
        pickupLocation: 'Nairobi CBD',
        returnLocation: 'Nairobi CBD'
      };
      
      setTimeout(() => {
        setBooking(mockBooking);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch confirmation:', error);
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full mb-6">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thank you for choosing Motizone. Your booking has been successfully confirmed.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-primary-600 dark:bg-primary-800 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Booking Details
            </h2>
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
              Confirmed
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Booking Reference */}
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Booking Reference</p>
            <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
              {booking.bookingNumber}
            </p>
          </div>

          {/* Vehicle Info */}
          <div className="flex items-center space-x-4 pb-6 border-b dark:border-gray-700">
            <img
              src={booking.vehicle.image}
              alt={booking.vehicle.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {booking.vehicle.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {booking.vehicle.type === 'RENTAL' ? 'Rental Vehicle' : 'Purchase Vehicle'}
              </p>
            </div>
          </div>

          {/* Booking Info Grid */}
          <div className="grid grid-cols-2 gap-6 py-6 border-b dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pickup Date</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(booking.pickupDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(booking.pickupDate).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Return Date</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(booking.returnDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(booking.returnDate).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pickup Location</p>
              <p className="font-medium text-gray-900 dark:text-white">{booking.pickupLocation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Return Location</p>
              <p className="font-medium text-gray-900 dark:text-white">{booking.returnLocation}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="py-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                <span className="text-xl font-bold text-primary-600">
                  KES {booking.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                <span className="text-gray-900 dark:text-white">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transaction Reference</span>
                <span className="text-sm font-mono text-gray-900 dark:text-white">{booking.paymentReference}</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
              Important Information
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-500 space-y-1">
              <li>• Please bring your ID and driver's license for verification</li>
              <li>• Arrive 15 minutes before your scheduled pickup time</li>
              <li>• Fuel policy: Full to Full</li>
              <li>• Cancellation policy: Free cancellation up to 24 hours before pickup</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/dashboard"
          className="btn-primary px-8 py-3 text-center"
        >
          Go to Dashboard
        </Link>
        <Link
          to="/vehicles"
          className="btn-secondary px-8 py-3 text-center"
        >
          Browse More Vehicles
        </Link>
      </div>

      {/* Email Confirmation */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        A confirmation email has been sent to your registered email address.
      </p>
    </div>
  );
}