import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  BoltIcon,
  LinkIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/signup', { state: { email } });
    } else {
      navigate('/signup');
    }
  };

  const features = [
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: "24/7 Monitoring",
      description: "Automatically check all your affiliate links every 6 hours"
    },
    {
      icon: <ExclamationTriangleIcon className="w-6 h-6" />,
      title: "Instant Alerts",
      description: "Get notified the moment a link breaks via email or Slack"
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "AI Replacements",
      description: "Get smart suggestions for alternative products when links die"
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: "Revenue Tracking",
      description: "See exactly how much money broken links are costing you"
    },
    {
      icon: <BoltIcon className="w-6 h-6" />,
      title: "One-Click Fix",
      description: "Replace broken links across all your content instantly"
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "Link Health Score",
      description: "Get a real-time health score for all your affiliate links"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Tech Blogger",
      content: "LinkGuard found 47 broken links on my site that were costing me $3,200/month. Fixed them all in 10 minutes!",
      avatar: "SM",
      revenue: "+$3,200/mo"
    },
    {
      name: "Mike Chen",
      role: "YouTube Creator",
      content: "I had no idea 30% of my description links were dead. LinkGuard's AI suggestions helped me recover lost revenue instantly.",
      avatar: "MC",
      revenue: "+$5,400/mo"
    },
    {
      name: "Jessica Park",
      role: "Newsletter Owner",
      content: "Game changer! Set it up once and never worry about broken affiliate links again. Worth every penny.",
      avatar: "JP",
      revenue: "+$1,800/mo"
    }
  ];

  const stats = [
    { label: "Broken Links Found", value: "2.3M+" },
    { label: "Revenue Recovered", value: "$4.7M+" },
    { label: "Happy Creators", value: "12,000+" },
    { label: "Links Monitored", value: "45M+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-8 h-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">LinkGuard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/signup" className="btn-primary">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full mb-6">
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            <span className="font-medium">20% of affiliate links are broken right now</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Stop Losing Money to<br />
            <span className="text-primary-600">Broken Affiliate Links</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The average creator loses <span className="font-bold text-red-600">$2,400/month</span> from broken links. 
            LinkGuard monitors your links 24/7, alerts you instantly, and suggests AI-powered replacements.
          </p>

          {/* Email Capture */}
          <form onSubmit={handleGetStarted} className="max-w-md mx-auto flex gap-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button type="submit" className="btn-primary px-6 py-3">
              Start Free Trial
              <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
            </button>
          </form>
          
          <p className="text-sm text-gray-500">
            ✓ 14-day free trial &nbsp;&nbsp;✓ No credit card required &nbsp;&nbsp;✓ Monitor up to 500 links
          </p>
        </div>
      </section>

      {/* Problem Illustration */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">The Hidden Revenue Killer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircleIcon className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Products Go Out of Stock</h3>
              <p className="text-gray-600">Your top-performing links suddenly show "Currently Unavailable"</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircleIcon className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Links Get Discontinued</h3>
              <p className="text-gray-600">Products disappear but your content keeps sending traffic</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircleIcon className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Programs Change</h3>
              <p className="text-gray-600">Affiliate programs update and your old links stop working</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Protect Your Revenue</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Creators Are Recovering Thousands</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="inline-flex items-center text-green-600 font-semibold">
                  <CurrencyDollarIcon className="w-5 h-5 mr-1" />
                  {testimonial.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Recovering Lost Revenue Today
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join 12,000+ creators who never worry about broken links again
          </p>
          <Link to="/signup" className="inline-flex items-center bg-white text-primary-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors">
            Start Your Free 14-Day Trial
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
          <p className="text-primary-100 mt-4">
            No credit card required • Setup in 2 minutes • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-bold text-white">LinkGuard</span>
              <span className="text-sm">by GoStack Technologies</span>
            </div>
            <div className="text-sm">
              © 2025 GoStack Technologies. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
