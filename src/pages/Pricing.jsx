import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { user } = useAuth();
  
  const plans = [
    {
      name: 'Starter',
      price: '$19',
      features: ['Up to 500 links', '4x daily checks', 'Email alerts', 'Basic analytics'],
      current: true,
    },
    {
      name: 'Professional',
      price: '$49',
      features: ['Up to 5,000 links', 'Hourly checks', 'Email + Slack alerts', 'Advanced analytics', 'AI suggestions', 'API access'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$149',
      features: ['Unlimited links', 'Real-time monitoring', 'All integrations', 'Custom analytics', 'Priority support', 'White label'],
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-500 mt-2">Scale as you grow. Change plans anytime.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-white rounded-lg shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-primary-600' : ''}`}>
            {plan.popular && (
              <div className="bg-primary-600 text-white text-center py-1 text-sm font-semibold">
                MOST POPULAR
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full mt-6 ${plan.current ? 'bg-gray-100 text-gray-700' : 'btn-primary'}`}>
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
