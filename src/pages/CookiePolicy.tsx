import React from 'react';
import { Cookie, Shield, Settings, Clock, Globe, AlertCircle, ToggleLeft as Toggle, HelpCircle } from 'lucide-react';

const CookiePolicy = () => {
  const sections = [
    {
      icon: <Cookie className="h-6 w-6 text-indigo-600" />,
      title: 'What Are Cookies',
      content: `Cookies are small text files that are placed on your device when you visit our website. They help make websites work more efficiently and provide information to website owners.`
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: 'How We Use Cookies',
      content: `We use cookies to:
        • Remember your preferences and settings
        • Understand how you use our platform
        • Keep you signed in
        • Improve our services
        • Provide personalized content
        • Analyze platform performance`
    },
    {
      icon: <Settings className="h-6 w-6 text-indigo-600" />,
      title: 'Types of Cookies We Use',
      content: `1. Essential Cookies:
        • Required for platform functionality
        • Cannot be disabled
        
        2. Performance Cookies:
        • Collect anonymous usage data
        • Help us improve our platform
        
        3. Functionality Cookies:
        • Remember your preferences
        • Enhance your experience
        
        4. Targeting Cookies:
        • Deliver relevant content
        • Track marketing effectiveness`
    },
    {
      icon: <Clock className="h-6 w-6 text-indigo-600" />,
      title: 'Cookie Duration',
      content: `We use two types of cookies based on duration:
        
        1. Session Cookies:
        • Temporary
        • Deleted when you close your browser
        
        2. Persistent Cookies:
        • Remain on your device
        • Valid until expiration date
        • Help remember your preferences`
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-600" />,
      title: 'Third-Party Cookies',
      content: `Some cookies are placed by third-party services that appear on our pages. We use third-party cookies for:
        • Analytics
        • Advertising
        • Social media integration
        • Payment processing
        • Security verification`
    },
    {
      icon: <Toggle className="h-6 w-6 text-indigo-600" />,
      title: 'Managing Cookies',
      content: `You can control cookies through:
        • Browser settings
        • Our cookie consent tool
        • Third-party opt-out tools
        
        Note: Disabling certain cookies may limit platform functionality.`
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-indigo-600" />,
      title: 'Privacy and Data Protection',
      content: `Our use of cookies complies with:
        • GDPR requirements
        • ePrivacy regulations
        • Local data protection laws
        
        For more information, see our Privacy Policy.`
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-indigo-600" />,
      title: 'Updates to This Policy',
      content: `We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date. Continued use of our platform after changes indicates acceptance of the updated policy.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <p className="text-gray-600 mb-8">
              This Cookie Policy explains how Agile Learning Platform uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
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
                If you have any questions about our Cookie Policy, please contact us at:
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

export default CookiePolicy;