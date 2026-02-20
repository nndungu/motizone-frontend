import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './components/Toast.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

// Layout Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Public Pages
import Home from './pages/Home.jsx';
import VehicleDetails from './pages/VehicleDetails.jsx';
import Vehicles from './pages/Vehicle.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Pricing from './pages/Pricing.jsx';
import FAQ from './pages/FAQ.jsx';
import BuyCar from './pages/BuyCar.jsx';
import RentCar from './pages/RentCar.jsx';
import Financing from './pages/Financing.jsx';

// Protected Pages
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Bookings from './pages/Bookings.jsx';
import Wishlist from './pages/WishList.jsx';
import Payment from './pages/Payment.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import RegisterCar from './pages/RegisterCar.jsx';

// Admin Pages
import Admin from './pages/AdminDashboard.jsx';
import AdminVehicles from './pages/AdminVehicles.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminBookings from './pages/AdminBookings.jsx';
import AdminAnalytics from './pages/AdminAnalytics.jsx';
import AdminSettings from './pages/AdminSettings.jsx';

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (adminOnly && user?.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return children;
};

// Main App Content with Routes
function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Services Pages */}
          <Route path="/buy" element={<BuyCar />} />
          <Route path="/rent" element={<RentCar />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/register-car" element={
            <ProtectedRoute>
              <RegisterCar />
            </ProtectedRoute>
          } />

          {/* Protected User Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute><Bookings /></ProtectedRoute>
          } />
          <Route path="/wishlist" element={
            <ProtectedRoute><Wishlist /></ProtectedRoute>
          } />
          <Route path="/payment/:id" element={
            <ProtectedRoute><Payment /></ProtectedRoute>
          } />
          <Route path="/booking-confirmation/:id" element={
            <ProtectedRoute><BookingConfirmation /></ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>
          } />
          <Route path="/admin/vehicles" element={
            <ProtectedRoute adminOnly={true}><AdminVehicles /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <ProtectedRoute adminOnly={true}><AdminBookings /></ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute adminOnly={true}><AdminAnalytics /></ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute adminOnly={true}><AdminSettings /></ProtectedRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

// 404 Page
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

// Main App with Providers
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <AppContent />
            </Router>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
