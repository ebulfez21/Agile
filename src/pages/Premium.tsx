import React from 'react';
import { Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Premium = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();

  const plans = [
    {
      name: 'Monthly',
      price: 29,
      period: 'month',
      features: [
        'Access to all premium courses',
        'Premium practice tests',
        'Course certificates',
        'Priority support',
        'Ad-free experience',
        'Download course materials'
      ]
    },
    {
      name: 'Annual',
      price: 299,
      period: 'year',
      popular: true,
      savings: 'Save 15%',
      features: [
        'All Monthly plan features',
        'Exclusive webinars',
        'One-on-one mentoring sessions',
        'Career guidance',
        'Industry networking events',
        'Custom learning paths'
      ]
    }
  ];

  const handleUpgrade = (planName: string) => {
    // Handle subscription upgrade
    console.log(`Upgrading to ${planName} plan`);
  };

  if (userProfile?.role === 'premium') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Star className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              You're already a Premium member!
            </h2>
            <p className="text-gray-600 mb-6">
              Enjoy all the premium features and content available to you.
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Browse Premium Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-gray-600">
            Get unlimited access to all premium courses and features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                plan.popular ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h2>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                {plan.savings && (
                  <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-block mb-6">
                    {plan.savings}
                  </div>
                )}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleUpgrade(plan.name)}
                  className={`w-full py-3 px-6 rounded-md text-center font-medium transition-colors ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get {plan.name} Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Questions about our premium plans?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Contact our support team
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;