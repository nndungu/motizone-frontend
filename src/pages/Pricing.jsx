import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for occasional renters',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        'Browse vehicles',
        'Save favorites',
        'Basic support',
        'Email notifications',
        '30-day booking history'
      ],
      limitations: [
        'No priority booking',
        'Standard verification',
        'Basic customer support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      description: 'For frequent renters and sellers',
      monthlyPrice: 2999,
      annualPrice: 29990,
      features: [
        'All Basic features',
        'Priority booking',
        'Unlimited wishlist',
        'Premium support 24/7',
        '1-year booking history',
        'List vehicles for sale',
        'Analytics dashboard',
        'Verified badge'
      ],
      limitations: [],
      cta: 'Start Pro',
      popular: true
    },
    {
      name: 'Business',
      description: 'For dealerships and fleets',
      monthlyPrice: 9999,
      annualPrice: 99990,
      features: [
        'All Pro features',
        'Bulk listing',
        'API access',
        'Dedicated account manager',
        'Advanced analytics',
        'Custom branding',
        'Multiple users',
        'Priority verification',
        'Marketing tools'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const features = [
    {
      name: 'Vehicle Listings',
      basic: '10/month',
      pro: 'Unlimited',
      business: 'Unlimited'
    },
    {
      name: 'Booking Fee',
      basic: '15%',
      pro: '10%',
      business: '5%'
    },
    {
      name: 'Featured Listings',
      basic: '✗',
      pro: '✓',
      business: '✓'
    },
    {
      name: 'Priority Support',
      basic: '✗',
      pro: '✓',
      business: '✓'
    },
    {
      name: 'API Access',
      basic: '✗',
      pro: '✗',
      business: '✓'
    },
    {
      name: 'Team Members',
      basic: '1',
      pro: '3',
      business: '10+'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-900 dark:to-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                billingCycle === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                billingCycle === 'annual'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105 md:scale-110 z-10' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    KES {billingCycle === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.annualPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                  {billingCycle === 'annual' && plan.annualPrice > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Save KES {(plan.monthlyPrice * 12 - plan.annualPrice).toLocaleString()} yearly
                    </p>
                  )}
                </div>

                <Link
                  to={plan.name === 'Business' ? '/contact' : '/register'}
                  className={`block text-center py-3 px-6 rounded-lg font-semibold transition mb-8 ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Features:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-400">
                        <svg className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Compare Features
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">Basic</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-primary-600">Pro</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {features.map((feature, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{feature.name}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">{feature.basic}</td>
                    <td className="px-6 py-4 text-sm text-center text-primary-600 font-medium">{feature.pro}</td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">{feature.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Can't find the answer you're looking for? Check our <Link to="/faq" className="text-primary-600 hover:text-primary-500">full FAQ</Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Can I change plans anytime?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Is there a contract?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No long-term contracts. All plans are month-to-month and you can cancel anytime.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We accept M-Pesa, credit/debit cards, and bank transfers for all plans.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes, we offer a 14-day money-back guarantee for all paid plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}