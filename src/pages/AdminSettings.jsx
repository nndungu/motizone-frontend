import React, { useState } from 'react';
import { useToast } from '../components/Toast';

export default function AdminSettings() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    general: {
      siteName: 'CarHub Kenya',
      siteEmail: 'info@carhub.co.ke',
      sitePhone: '+254 700 000 000',
      address: 'Nairobi, Kenya',
      currency: 'KES',
      timezone: 'Africa/Nairobi',
      dateFormat: 'DD/MM/YYYY'
    },
    commission: {
      rentalCommission: 15,
      saleCommission: 5,
      minimumCommission: 1000,
      featuredFee: 5000,
      priorityFee: 2500
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: 'noreply@carhub.co.ke',
      smtpEncryption: 'tls',
      senderName: 'CarHub Kenya',
      senderEmail: 'noreply@carhub.co.ke'
    },
    payment: {
      mpesaEnabled: true,
      mpesaBusinessShortCode: '174379',
      mpesaPasskey: '********',
      cardEnabled: true,
      cardPublicKey: 'pk_test_********',
      bankTransferEnabled: true,
      bankAccountName: 'CarHub Kenya Ltd',
      bankAccountNumber: '1234567890',
      bankName: 'Equity Bank'
    },
    seo: {
      metaTitle: 'CarHub Kenya - Buy and Rent Vehicles',
      metaDescription: 'Find the perfect vehicle for your needs in Kenya. Buy or rent cars, SUVs, and more.',
      metaKeywords: 'cars, vehicles, kenya, nairobi, buy car, rent car',
      googleAnalyticsId: 'UA-XXXXXXXX-X',
      facebookPixelId: 'XXXXXXXXXX'
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      ipWhitelisting: false
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'commission', name: 'Commission', icon: '💰' },
    { id: 'email', name: 'Email', icon: '📧' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'seo', name: 'SEO', icon: '🔍' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      addToast('Settings saved successfully!', 'success');
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all settings to default?')) {
      addToast('Settings reset to default', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your CarHub platform settings
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab.id
                      ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  General Settings
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.general.siteName}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: {...settings.general, siteName: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Site Email
                      </label>
                      <input
                        type="email"
                        value={settings.general.siteEmail}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: {...settings.general, siteEmail: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Site Phone
                      </label>
                      <input
                        type="text"
                        value={settings.general.sitePhone}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: {...settings.general, sitePhone: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        value={settings.general.address}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: {...settings.general, address: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Currency
                      </label>
                      <select
                        value={settings.general.currency}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: {...settings.general, currency: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="KES">KES - Kenyan Shilling</option>
                        <option value="USD">USD - US Dollar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Timezone
                      </label>
                      <select
                        value={settings.general.timezone}
                        onChange={(e) => setSettings({
                          ...settings,
                          general: {...settings.general, timezone: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="Africa/Nairobi">Africa/Nairobi (UTC+3)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Commission Settings */}
            {activeTab === 'commission' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Commission Settings
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Rental Commission (%)
                      </label>
                      <input
                        type="number"
                        value={settings.commission.rentalCommission}
                        onChange={(e) => setSettings({
                          ...settings,
                          commission: {...settings.commission, rentalCommission: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sale Commission (%)
                      </label>
                      <input
                        type="number"
                        value={settings.commission.saleCommission}
                        onChange={(e) => setSettings({
                          ...settings,
                          commission: {...settings.commission, saleCommission: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Minimum Commission
                      </label>
                      <input
                        type="number"
                        value={settings.commission.minimumCommission}
                        onChange={(e) => setSettings({
                          ...settings,
                          commission: {...settings.commission, minimumCommission: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Featured Listing Fee
                      </label>
                      <input
                        type="number"
                        value={settings.commission.featuredFee}
                        onChange={(e) => setSettings({
                          ...settings,
                          commission: {...settings.commission, featuredFee: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Email Settings
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP Host
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpHost}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: {...settings.email, smtpHost: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        value={settings.email.smtpPort}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: {...settings.email, smtpPort: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP User
                      </label>
                      <input
                        type="text"
                        value={settings.email.smtpUser}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: {...settings.email, smtpUser: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        value="********"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        value={settings.email.senderName}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: {...settings.email, senderName: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Sender Email
                      </label>
                      <input
                        type="email"
                        value={settings.email.senderEmail}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: {...settings.email, senderEmail: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Payment Settings
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      M-Pesa Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Business Short Code
                        </label>
                        <input
                          type="text"
                          value={settings.payment.mpesaBusinessShortCode}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: {...settings.payment, mpesaBusinessShortCode: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Passkey
                        </label>
                        <input
                          type="password"
                          value={settings.payment.mpesaPasskey}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: {...settings.payment, mpesaPasskey: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Card Payment Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Public Key
                        </label>
                        <input
                          type="text"
                          value={settings.payment.cardPublicKey}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: {...settings.payment, cardPublicKey: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Bank Transfer Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          value={settings.payment.bankName}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: {...settings.payment, bankName: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Account Name
                        </label>
                        <input
                          type="text"
                          value={settings.payment.bankAccountName}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: {...settings.payment, bankAccountName: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Account Number
                        </label>
                        <input
                          type="text"
                          value={settings.payment.bankAccountNumber}
                          onChange={(e) => setSettings({
                            ...settings,
                            payment: {...settings.payment, bankAccountNumber: e.target.value}
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  SEO Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={settings.seo.metaTitle}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: {...settings.seo, metaTitle: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows="3"
                      value={settings.seo.metaDescription}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: {...settings.seo, metaDescription: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={settings.seo.metaKeywords}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: {...settings.seo, metaKeywords: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo.googleAnalyticsId}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: {...settings.seo, googleAnalyticsId: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Facebook Pixel ID
                    </label>
                    <input
                      type="text"
                      value={settings.seo.facebookPixelId}
                      onChange={(e) => setSettings({
                        ...settings,
                        seo: {...settings.seo, facebookPixelId: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Security Settings
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Require 2FA for admin accounts
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        security: {...settings.security, twoFactorAuth: !settings.security.twoFactorAuth}
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        settings.security.twoFactorAuth ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: {...settings.security, sessionTimeout: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={settings.security.maxLoginAttempts}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: {...settings.security, maxLoginAttempts: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        value={settings.security.passwordExpiry}
                        onChange={(e) => setSettings({
                          ...settings,
                          security: {...settings.security, passwordExpiry: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">IP Whitelisting</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Restrict admin access to specific IPs
                      </p>
                    </div>
                    <button
                      onClick={() => setSettings({
                        ...settings,
                        security: {...settings.security, ipWhitelisting: !settings.security.ipWhitelisting}
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        settings.security.ipWhitelisting ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.security.ipWhitelisting ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}