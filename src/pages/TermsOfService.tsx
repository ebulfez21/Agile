import React from 'react';
import { FileText, Shield, UserCheck, AlertCircle, DollarSign, Scale, Lock, HelpCircle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      title: 'Agreement to Terms',
      content: `By accessing or using the Agile Learning Platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.`
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: 'Intellectual Property Rights',
      content: `The Service and its original content, features, and functionality are owned by Agile Learning Platform and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`
    },
    {
      icon: <UserCheck className="h-6 w-6 text-indigo-600" />,
      title: 'User Account Responsibilities',
      content: `You are responsible for:
        • Maintaining the confidentiality of your account
        • All activities that occur under your account
        • Providing accurate and complete information
        • Updating your information as needed
        • Complying with all applicable laws`
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-indigo-600" />,
      title: 'Acceptable Use Policy',
      content: `You agree not to:
        • Use the service for any illegal purpose
        • Violate any laws in your jurisdiction
        • Infringe upon the rights of others
        • Share inappropriate or offensive content
        • Attempt to breach our security measures
        • Interfere with the proper working of the service`
    },
    {
      icon: <DollarSign className="h-6 w-6 text-indigo-600" />,
      title: 'Payment Terms',
      content: `For premium services:
        • Payments are processed securely
        • Subscriptions auto-renew unless cancelled
        • Refunds are provided according to our refund policy
        • Prices may change with notice
        • Taxes may apply based on your location`
    },
    {
      icon: <Scale className="h-6 w-6 text-indigo-600" />,
      title: 'Limitation of Liability',
      content: `We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.`
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-600" />,
      title: 'Termination',
      content: `We may terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including breach of these Terms.`
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-indigo-600" />,
      title: 'Changes to Terms',
      content: `We reserve the right to modify or replace these Terms at any time. Changes will be effective immediately upon posting to the platform. Your continued use of the service constitutes acceptance of the modified terms.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8">
              Welcome to Agile Learning Platform. These Terms of Service govern your use of our platform and services. Please read these terms carefully before using our services.
            </p>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-4">
                    {section.icon}
                    <h2 className="text-2xl font-bold text-gray-900 ml-3">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <ul className="mt-4 text-gray-600">
                <li>Email: legal@agilelearning.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Agile Street, San Francisco, CA 94105, United States</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;