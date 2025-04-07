import React from 'react';
import { Shield, Lock, Eye, Database, Bell, Globe, UserCheck, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, including:
        • Name and contact information
        • Account credentials
        • Profile information
        • Course progress and test results
        • Payment information
        • Communications with us
        We also automatically collect certain information about your device and usage of our platform.`
    },
    {
      icon: <Lock className="h-6 w-6 text-indigo-600" />,
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
        • Provide and improve our services
        • Personalize your experience
        • Process your payments
        • Send you updates and marketing communications
        • Ensure platform security
        • Comply with legal obligations
        • Analyze and improve our platform`
    },
    {
      icon: <Eye className="h-6 w-6 text-indigo-600" />,
      title: 'Information Sharing',
      content: `We may share your information with:
        • Service providers and business partners
        • Other users (for collaborative features)
        • Legal authorities when required
        • During business transfers
        We never sell your personal information to third parties.`
    },
    {
      icon: <Database className="h-6 w-6 text-indigo-600" />,
      title: 'Data Storage and Security',
      content: `We implement appropriate technical and organizational measures to protect your data, including:
        • Encryption in transit and at rest
        • Regular security assessments
        • Access controls and monitoring
        • Secure data centers
        • Regular backups`
    },
    {
      icon: <Bell className="h-6 w-6 text-indigo-600" />,
      title: 'Your Rights and Choices',
      content: `You have the right to:
        • Access your personal information
        • Correct inaccurate data
        • Request deletion of your data
        • Object to processing
        • Export your data
        • Opt-out of marketing communications`
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      title: 'International Data Transfers',
      content: `We may transfer your information internationally. We ensure appropriate safeguards are in place through:
        • Standard contractual clauses
        • Privacy Shield certification
        • Data processing agreements
        • Compliance with local laws`
    },
    {
      icon: <UserCheck className="h-6 w-6 text-indigo-600" />,
      title: 'Children\'s Privacy',
      content: `Our platform is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us.`
    },
    {
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      title: 'Changes to This Policy',
      content: `We may update this privacy policy from time to time. We will notify you of any material changes through:
        • Email notifications
        • Platform announcements
        • Website updates
        Your continued use of our services after changes indicates acceptance of the updated policy.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8">
              At Agile Learning Platform, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
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
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="mt-4 text-gray-600">
                <li>Email: privacy@agilelearning.com</li>
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

export default PrivacyPolicy;