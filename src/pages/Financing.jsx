import React from 'react';

const financiers = [
  {
    name: "Stanbic Bank Kenya",
    website: "https://www.stanbicbank.co.ke",
    phone: "+254 700 000 001",
    description: "Provides flexible car loans with competitive interest rates."
  },
  {
    name: "Co-operative Bank",
    website: "https://www.co-opbank.co.ke",
    phone: "+254 700 000 002",
    description: "Offering car financing solutions tailored for individuals and SMEs."
  },
  {
    name: "Equity Bank",
    website: "https://www.equitybankgroup.com",
    phone: "+254 700 000 003",
    description: "Vehicle financing with quick approval and easy repayment options."
  },
  {
    name: "KCB Bank",
    website: "https://www.kcbgroup.com",
    phone: "+254 700 000 004",
    description: "Car loans with flexible terms to suit your budget."
  },
  {
    name: "NCBA Bank",
    website: "https://ke.ncbagroup.com",
    phone: "+254 700 000 005",
    description: "Personal and business car financing packages."
  }
];

export default function Financing() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Car Financing Options in Kenya
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Explore trusted financiers and banks offering vehicle loans to make buying your dream car easier.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {financiers.map((financier, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{financier.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{financier.description}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Phone: {financier.phone}</p>
              <a
                href={financier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
              >
                Visit Website
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
