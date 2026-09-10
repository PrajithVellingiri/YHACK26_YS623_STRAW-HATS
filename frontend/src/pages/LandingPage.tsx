import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Search, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
          Know What Your Business Needs <span className="text-blue-600">Before You Start.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Understand licences, approvals, and compliance requirements for your business — explained simply, without the legal jargon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/intake">
            <Button size="lg" className="gap-2 text-lg px-8">
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full py-16 bg-white rounded-3xl shadow-sm border border-gray-100 my-8 px-8 md:px-16">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Tell us about your business</h3>
            <p className="text-gray-600">Describe what you do in plain English. Our AI will understand your sector and activities.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-green-100">
              <FileCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Discover requirements</h3>
            <p className="text-gray-600">Get a clear, personalized checklist of all the licences and approvals your business needs.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-100">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Track applications</h3>
            <p className="text-gray-600">Manage your progress, understand documents needed, and stay compliant with ease.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
