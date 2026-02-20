import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Motizone</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for buying and renting quality vehicles in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/vehicles" className="text-gray-400 hover:text-white">Vehicles</Link></li>
              <li>
              <Link to="/pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/buy" className="text-gray-400 hover:text-white">Buy a Car</Link></li>
              <li><Link to="/rent" className="text-gray-400 hover:text-white">Rent a Car</Link></li>
              <li><Link to={user ? "/register-car" : "/login"} className="text-gray-400 hover:text-white">Sell Your Car</Link></li>
              <li><Link to="/financing" className="text-gray-400 hover:text-white">Financing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Nairobi, Kenya</li>
              <li>+254 700 000 000</li>
              <li>info@carhub.co.ke</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarHub Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
