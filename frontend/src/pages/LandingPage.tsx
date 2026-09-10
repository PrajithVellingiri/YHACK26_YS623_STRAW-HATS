import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, FileCheck, Shield, Activity, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full bg-background text-text-main">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-28 text-center max-w-5xl mx-auto px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-green/10 blur-[120px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight relative z-10">
          Start Your Business <span className="text-accent-green drop-shadow-[0_0_15px_rgba(174,255,0,0.5)]">With Confidence.</span>
        </h1>
        <p className="text-xl text-text-muted mb-10 max-w-3xl mx-auto leading-relaxed relative z-10">
          Understand the licences, approvals and compliances your business needs — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link to="/signup">
            <Button size="lg" className="px-8 text-lg w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="outline" size="lg" className="px-8 text-lg w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Compliance Journey Visualization */}
      <section className="w-full max-w-6xl mx-auto px-4 mb-24 relative z-10">
        <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 to-accent-yellow/5"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-accent-yellow border border-[#333] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,184,0,0.2)]"><Lightbulb className="w-8 h-8" /></div>
              <span className="font-semibold text-gray-300">Business Idea</span>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-gray-600" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-accent-green border border-[#333] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(174,255,0,0.2)]"><Search className="w-8 h-8" /></div>
              <span className="font-semibold text-gray-300">Understand Requirements</span>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-gray-600" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-[#00E5FF] border border-[#333] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]"><FileText className="w-8 h-8" /></div>
              <span className="font-semibold text-gray-300">Apply</span>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-gray-600" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-[#FF5500] border border-[#333] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,85,0,0.2)]"><Activity className="w-8 h-8" /></div>
              <span className="font-semibold text-gray-300">Track</span>
            </div>
            <ArrowRight className="hidden md:block w-6 h-6 text-gray-600" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#1A1A1A] text-accent-green border border-[#333] rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(174,255,0,0.4)]"><CheckCircle2 className="w-8 h-8" /></div>
              <span className="font-semibold text-white">Get Approved</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-[#0E0E0E] py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-card text-accent-green border border-[#333] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_10px_rgba(174,255,0,0.1)]">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Tell Us About Your Business</h3>
              <p className="text-text-muted text-sm">Provide basic details or simply describe what you want to do.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-card text-accent-green border border-[#333] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_10px_rgba(174,255,0,0.1)]">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">AI Understands Your Business</h3>
              <p className="text-text-muted text-sm">Our AI extracts exactly what sector and scale your business belongs to.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-card text-accent-green border border-[#333] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_10px_rgba(174,255,0,0.1)]">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Discover Required Compliances</h3>
              <p className="text-text-muted text-sm">Our rule engine accurately determines every licence you need.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-card text-accent-green border border-[#333] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_10px_rgba(174,255,0,0.1)]">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Track Your Applications</h3>
              <p className="text-text-muted text-sm">Monitor your progress from submission to final approval.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#1A1A1A] text-[#00E5FF] border border-[#333] rounded-xl flex items-center justify-center"><Search className="w-6 h-6" /></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Smart Compliance Discovery</h3>
              <p className="text-text-muted">Stop guessing. Get an exact, personalized checklist of every NOC, licence, and registration you need.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#1A1A1A] text-accent-yellow border border-[#333] rounded-xl flex items-center justify-center"><Lightbulb className="w-6 h-6" /></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Simple AI Guidance</h3>
              <p className="text-text-muted">No more confusing government jargon. Our AI explains exactly why you need a specific licence in plain English.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#1A1A1A] text-accent-green border border-[#333] rounded-xl flex items-center justify-center"><FileCheck className="w-6 h-6" /></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Clear Document Requirements</h3>
              <p className="text-text-muted">Know exactly what paperwork is required before you even visit a government department.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#1A1A1A] text-[#FF5500] border border-[#333] rounded-xl flex items-center justify-center"><Shield className="w-6 h-6" /></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-200 mb-2">Application Tracking</h3>
              <p className="text-text-muted">Keep all your compliance statuses organized in one easy-to-read dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full bg-[#111] py-20 text-center px-4 border-t border-border relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-green/5 via-transparent to-transparent pointer-events-none"></div>
        <h2 className="text-3xl font-bold text-white mb-8 relative z-10">Ready to understand your business requirements?</h2>
        <Link to="/signup" className="relative z-10">
          <Button size="lg" className="px-8">
            Get Started Now
          </Button>
        </Link>
      </section>
    </div>
  );
};
