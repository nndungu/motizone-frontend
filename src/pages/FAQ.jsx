import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState('general');
  const [openItems, setOpenItems] = useState({});

  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'booking', name: 'Booking & Rentals' },
    { id: 'payment', name: 'Payment & Billing' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'technical', name: 'Technical Support' },
    { id: 'selling', name: 'Selling Vehicles' }
  ];

  const faqs = {
    general: [
      {
        question: 'What is Motizone?',
        answer: 'Motizone is Kenya\'s premier digital automotive marketplace where you can buy, rent, and sell vehicles. We connect car owners, dealers, and renters in a seamless, secure platform.'
      },
      {
        question: 'Is Motizone available throughout Kenya?',
        answer: 'Yes, we operate in major cities including Nairobi, Mombasa, Kisumu, and Nakuru. We\'re continuously expanding to serve more locations across Kenya.'
      },
      {
        question: 'How do I get started?',
        answer: 'Simply create a free account, browse our vehicles, and start booking or listing. You can sign up using your email or social media accounts.'
      }
    ],
    booking: [
      {
        question: 'How do I book a vehicle?',
        answer: 'Find a vehicle you like, click "Rent Now" or "Book", fill in your details, choose dates, and complete payment. You\'ll receive a confirmation email immediately.'
      },
      {
        question: 'What is the cancellation policy?',
        answer: 'Free cancellation up to 24 hours before pickup. Cancellations within 24 hours may incur a fee equal to one day\'s rental. Check individual vehicle listings for specific policies.'
      },
      {
        question: 'Can I extend my rental period?',
        answer: 'Yes, you can extend your rental through the app or by contacting customer support. Extensions are subject to vehicle availability.'
      },
      {
        question: 'What documents do I need to rent a car?',
        answer: 'You need a valid driver\'s license, national ID or passport, and a credit card for security deposit. International visitors must have an International Driving Permit.'
      }
    ],
    payment: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept M-Pesa, all major credit/debit cards (Visa, Mastercard, American Express), and bank transfers for larger transactions.'
      },
      {
        question: 'Is there a security deposit?',
        answer: 'Yes, a refundable security deposit is required for rentals. The amount varies by vehicle and is fully refunded after inspection upon return.'
      },
      {
        question: 'How do refunds work?',
        answer: 'Refunds are processed within 3-5 business days to your original payment method. M-Pesa refunds are instant, while card refunds may take longer.'
      },
      {
        question: 'Do you offer payment plans for purchases?',
        answer: 'Yes, we offer flexible financing options through our partner financial institutions. Contact our sales team for personalized quotes.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your inbox.'
      },
      {
        question: 'Can I have multiple users on one account?',
        answer: 'Business accounts support multiple users with different permission levels. Contact us to set up team access.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Log in to your dashboard, go to Profile Settings, and update your information. Changes are saved immediately.'
      }
    ],
    technical: [
      {
        question: 'The app isn\'t loading properly. What should I do?',
        answer: 'Try clearing your browser cache, updating your browser, or using incognito mode. If issues persist, contact our technical support.'
      },
      {
        question: 'Is there a mobile app?',
        answer: 'Yes, Motizone is available as a mobile app for both iOS and Android. Download from the App Store or Google Play Store.'
      },
      {
        question: 'How do I report a bug?',
        answer: 'Use the "Report Issue" button in your dashboard or email support@motizone.co.ke with details and screenshots.'
      }
    ],
    selling: [
      {
        question: 'How do I list my car for sale?',
        answer: 'Create a seller account, click "List Vehicle", fill in details, upload photos, and set your price. Your listing will be live after verification.'
      },
      {
        question: 'Are there fees for selling?',
        answer: 'Basic listings are free. Featured listings and premium packages have associated fees. Check our Pricing page for details.'
      },
      {
        question: 'How long does verification take?',
        answer: 'Vehicle verification typically takes 24-48 hours. We verify documents and photos to ensure quality listings.'
      },
      {
        question: 'Can I edit my listing after posting?',
        answer: 'Yes, you can edit your listing anytime from your seller dashboard. Major changes may require reverification.'
      }
    ]
  };

  const toggleItem = (categoryId, index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`]
    }));
  };

  const filteredFaqs = searchTerm
    ? Object.entries(faqs).reduce((acc, [category, items]) => {
        const filtered = items.filter(
          item => 
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length) acc[category] = filtered;
        return acc;
      }, {})
    : faqs;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Find answers to common questions about Motizone
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <svg
                className="absolute right-4 top-4 h-6 w-6 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setOpenCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  openCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {Object.entries(filteredFaqs).map(([categoryId, items]) => (
          <div
            key={categoryId}
            className={`mb-8 ${categoryId === openCategory || searchTerm ? 'block' : 'hidden'}`}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {categories.find(c => c.id === categoryId)?.name}
            </h2>

            <div className="space-y-4">
              {items.map((faq, index) => {
                const itemId = `${categoryId}-${index}`;
                const isOpen = openItems[itemId];

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(categoryId, index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(filteredFaqs).length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try different keywords or contact our support team
            </p>
          </div>
        )}
      </div>

      {/* Still have questions */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@motizone.co.ke"
              className="btn-secondary"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}