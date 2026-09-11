import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileCheck, Search, Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Full Bleed Hero Section */}
      <section className="w-full relative overflow-hidden bg-slate-900 text-white pt-24 pb-48 px-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gov-teal/20 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gov-blue/20 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Compliance, <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Simplified.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Understand licenses, approvals, and regulatory requirements instantly—powered by advanced AI for modern businesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2 text-lg px-8 bg-gov-teal text-white hover:bg-gov-tealHover shadow-premium hover:-translate-y-1">
                Start for Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Stats Strip */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-20 -mt-24">
        <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-8 flex flex-col md:flex-row justify-around items-center gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-extrabold text-gov-navy tracking-tight mb-1">10x</span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Faster Approvals</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-200"></div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-extrabold text-gov-navy tracking-tight mb-1">99%</span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Compliance Rate</span>
          </div>
          <div className="hidden md:block w-px h-16 bg-slate-200"></div>
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-extrabold text-gov-navy tracking-tight mb-1">24/7</span>
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">AI Guidance</span>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gov-navy mb-4 tracking-tight">How BizClear Works</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">Get your business up and running in three simple steps.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-blue-50 text-gov-blue rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gov-navy mb-3 tracking-tight">1. AI Analysis</h3>
            <p className="text-text-muted leading-relaxed">Describe your business in plain English. Our AI analyzes your sector and immediately maps regulatory requirements.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-teal-50 text-gov-teal rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-teal-100">
              <FileCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gov-navy mb-3 tracking-tight">2. Get Requirements</h3>
            <p className="text-text-muted leading-relaxed">Instantly receive a clear, personalized checklist of all the licenses and approvals your business needs.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-slate-200 hover:shadow-premium hover:-translate-y-1 transition-all">
            <div className="w-16 h-16 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-200">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gov-navy mb-3 tracking-tight">3. Track Progress</h3>
            <p className="text-text-muted leading-relaxed">Submit applications, understand required documents, and track compliance status seamlessly from one dashboard.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
