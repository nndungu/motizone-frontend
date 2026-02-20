import React, { useState } from 'react';

export default function RegisterCar() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    type: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call your API to save the car
    alert('Car registered successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">List Your Car</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Fill out the details below to list your car for sale or rent.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="make"
            placeholder="Car Make"
            value={formData.make}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Car Model"
            value={formData.model}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (KES)"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-field w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input-field w-full"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
