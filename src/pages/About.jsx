import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { value: '500+', label: 'Vehicles' },
    { value: '1000+', label: 'Happy Customers' },
    { value: '5+', label: 'Years Experience' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const team = [
    {
      name: 'Japheth Mboi',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Former automotive executive with 15 years of industry experience.',
    },
    {
      name: 'Nelson Ndungu',
      role: 'Founder and Tech Lead',
      image: 'https://images.unsplash.com/photo-1494790108777-7667a0e9f9b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Ensuring smooth operations and customer satisfaction daily.',
    },
    {
      name: 'Shyllah Jepkemoi',
      role: 'Lead Frontend Engineer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Helping customers find their perfect vehicle for over a decade.',
    },
    {
      name: 'Grace Wanjiku',
      role: 'Customer Relations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Dedicated to providing exceptional customer service.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-primary-600 dark:bg-primary-800 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute left-0 bottom-0 w-full h-48" preserveAspectRatio="none" viewBox="0 0 1440 120">
            <path fill="currentColor" className="text-white dark:text-gray-900" d="M0,120L1440,0L1440,120L0,120Z" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Motizone Kenya
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Your trusted partner for quality vehicles and exceptional service since 2019.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To revolutionize the automotive industry in Kenya by providing a seamless, transparent, 
              and reliable platform for buying and renting vehicles. We strive to make quality 
              transportation accessible to everyone.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To become East Africa's leading digital automotive marketplace, known for innovation, 
              integrity, and exceptional customer experience. We envision a future where finding 
              your perfect ride is just a click away.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary-100 dark:border-gray-700"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-primary-600 dark:text-primary-400 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-600 dark:bg-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Perfect Ride?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Browse our collection of quality vehicles today.
          </p>
          <Link
            to="/vehicles"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Browse Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
}