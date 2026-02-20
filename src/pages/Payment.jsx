import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleApi } from '../services/vehicleApi.js';  
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual
      const mockBooking = {
        id: id,
        bookingNumber: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        vehicle: {
          title: 'Toyota Land Cruiser V8',
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
          price: 15000,
          type: 'RENTAL'
        },
        pickupDate: '2024-03-15T10:00',
        returnDate: '2024-03-18T10:00',
        duration: 3,
        rentalAmount: 45000,
        insurance: 5000,
        tax: 4500,
        totalAmount: 54500,
        status: 'pending'
      };
      
      setTimeout(() => {
        setBooking(mockBooking);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch booking:', error);
      setLoading(false);
    }
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate STK push
    setTimeout(() => {
      setProcessing(false);
      navigate(`/booking-confirmation/${id}`);
    }, 3000);
  };

  const handleCardPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate card payment
    setTimeout(() => {
      setProcessing(false);
      navigate(`/booking-confirmation/${id}`);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Complete Payment
            </h1>

            {/* Payment Methods */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-4 border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="ml-3 flex items-center">
                    <img src="/mpesa-logo.png" alt="M-Pesa" className="h-8 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">M-Pesa</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pay quickly with M-Pesa
                      </p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="ml-3 flex items-center">
                    <div className="flex space-x-1 mr-3">
                      <span className="text-2xl">💳</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Credit / Debit Card</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* M-Pesa Form */}
            {paymentMethod === 'mpesa' && (
              <form onSubmit={handleMpesaPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    M-Pesa Phone Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      +254
                    </span>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="712 345 678"
                      required
                      pattern="[0-9]{9}"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    You will receive an STK push on this number
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        An M-Pesa prompt will be sent to your phone. Enter your PIN to complete the payment.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing || !mpesaPhone}
                  className="w-full btn-primary py-3 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Pay KES ${booking.totalAmount.toLocaleString()}`}
                </button>
              </form>
            )}

            {/* Card Form */}
            {paymentMethod === 'card' && (
              <form onSubmit={handleCardPayment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVC *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                      placeholder="123"
                      maxLength="3"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    placeholder="John Doe"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full btn-primary py-3 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : `Pay KES ${booking.totalAmount.toLocaleString()}`}
                </button>
              </form>
            )}

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure payment powered by SSL encryption</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              {/* Vehicle Info */}
              <div className="flex items-center space-x-3 pb-4 border-b dark:border-gray-700">
                <img
                  src={booking.vehicle.image}
                  alt={booking.vehicle.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {booking.vehicle.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {booking.vehicle.type === 'RENTAL' ? 'Rental' : 'Purchase'}
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-2 pb-4 border-b dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Booking #</span>
                  <span className="font-medium text-gray-900 dark:text-white">{booking.bookingNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Pickup</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(booking.pickupDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Return</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="text-gray-900 dark:text-white">{booking.duration} days</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {booking.vehicle.type === 'RENTAL' ? 'Rental' : 'Price'}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    KES {booking.rentalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Insurance</span>
                  <span className="text-gray-900 dark:text-white">
                    KES {booking.insurance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-gray-900 dark:text-white">
                    KES {booking.tax.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    KES {booking.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Method Icons */}
              <div className="flex justify-center space-x-2 pt-4">
                <img src="/visa.svg" alt="Visa" className="h-8" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/mpesa.svg" alt="M-Pesa" className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}