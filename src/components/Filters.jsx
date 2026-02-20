import React, { useState } from 'react';

export default function Filters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    fuelType: '',
    transmission: ''
  });

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Nissan', 'Volkswagen'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      type: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      fuelType: '',
      transmission: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-gray-700 dark:text-gray-200"
        >
          <span className="font-semibold">Filters</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="space-y-6">
          {/* Vehicle Type */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Vehicle Type</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value=""
                  checked={filters.type === ''}
                  onChange={handleChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 dark:text-gray-300">All</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="SALE"
                  checked={filters.type === 'SALE'}
                  onChange={handleChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 dark:text-gray-300">For Sale</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="type"
                  value="RENTAL"
                  checked={filters.type === 'RENTAL'}
                  onChange={handleChange}
                  className="text-primary-600 focus:ring-primary-500"
                />
                <span className="text-gray-700 dark:text-gray-300">For Rent</span>
              </label>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Brand</h3>
            <select
              name="brand"
              value={filters.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range (KES)</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Min"
                className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Max"
                className="w-1/2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Year */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Year</h3>
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Any Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Fuel Type</h3>
            <select
              name="fuelType"
              value={filters.fuelType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Any Fuel</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Transmission */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Transmission</h3>
            <select
              name="transmission"
              value={filters.transmission}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Any</option>
              {transmissions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full btn-secondary"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}