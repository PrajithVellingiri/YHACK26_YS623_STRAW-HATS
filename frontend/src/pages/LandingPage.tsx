import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Building2, Map, ShieldCheck, CheckCircle2, Clock, AlertTriangle, Lightbulb, TrendingUp, Layers, Compass, XCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center w-full" id="home">
      
      {/* 🚀 SECTION 2 — HERO SECTION */}
      <section className="w-full relative overflow-hidden bg-slate-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-left space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Compliance shouldn't feel complicated.<br/>
              <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Let AI show you the way.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-xl">
              Starting a business should be exciting — not confusing. BizClear helps you understand the licenses, registrations, approvals, and compliance requirements that may apply to your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Link 
                to="/signup" 
                className="group relative inline-flex items-center justify-center gap-2 bg-gov-teal text-white px-8 py-4 rounded-xl hover:bg-teal-500 transition-all shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_30px_rgba(13,148,136,0.5)] hover:-translate-y-1 font-bold text-lg overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold text-lg w-full sm:w-auto hover:-translate-y-1"
              >
                <Play className="w-5 h-5 text-teal-400 group-hover:text-teal-300 transition-colors" />
                See How It Works
              </button>
            </div>
          </div>
          
          {/* HERO VISUAL */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 rounded-3xl transform rotate-3 scale-105 border border-white/5 backdrop-blur-sm animate-pulse"></div>
            
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
              <div className="absolute top-0 right-0 bg-teal-500/10 w-40 h-40 rounded-full blur-2xl"></div>
              
              <div className="flex items-center justify-between mb-8 border-b border-slate-700/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-500/20 p-2.5 rounded-xl border border-teal-500/30">
                    <Sparkles className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-white">AI Compliance Assistant</h3>
                    <p className="text-xs text-teal-400 font-bold tracking-wider uppercase">Business Profile Analyzed ✓</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">Possible Compliance Areas</p>
                
                {[
                  { icon: Building2, label: 'Business Registration' },
                  { icon: ShieldCheck, label: 'Industry Requirements' },
                  { icon: Map, label: 'Local Approvals' },
                  { icon: CheckCircle2, label: 'Safety & Operational Checks' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-900 transition-colors">
                    <div className="bg-teal-500/10 p-2 rounded-lg text-teal-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-slate-200 font-medium">{item.label}</span>
                    <CheckCircle2 className="w-5 h-5 text-teal-500 ml-auto" />
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl p-4 flex items-center justify-between shadow-lg">
                  <span className="font-bold text-white">Compliance Roadmap Generated</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 😵 SECTION 3 — THE PROBLEM */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" id="features">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gov-navy mb-6 tracking-tight">
            Building a business is hard. <br/>
            <span className="text-slate-500">Understanding compliance shouldn't be.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-gov-navy mb-4 tracking-tight">Confusing Requirements</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Businesses often don't know which registrations, approvals, and permissions may apply to their specific industry.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-amber-100">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-gov-navy mb-4 tracking-tight">Hours of Searching</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Finding accurate information across multiple government departments and outdated websites takes valuable time.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-soft border border-slate-200 hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-200">
              <Compass className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-gov-navy mb-4 tracking-tight">Uncertainty</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              Missing important regulatory requirements can delay your business journey or result in unexpected penalties.
            </p>
          </div>
        </div>
      </section>

      {/* ⚡ SECTION 4 — HOW IT WORKS */}
      <section className="w-full bg-white py-24 border-y border-slate-100" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-xl text-gov-teal font-extrabold tracking-widest uppercase mb-3">How It Works</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gov-navy tracking-tight">A clearer path forward.</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-gov-teal/20 via-gov-blue/20 to-gov-teal/20 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-2xl font-black text-slate-400 mb-6 group-hover:border-gov-teal group-hover:text-gov-teal transition-colors shadow-soft">
                01
              </div>
              <h4 className="text-2xl font-extrabold text-gov-navy mb-4 tracking-tight">Tell Us About Your Business</h4>
              <p className="text-slate-600 font-medium">Share your business type, industry, location, and daily operations through a simple guided intake.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-20 h-20 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-2xl font-black text-slate-400 mb-6 group-hover:border-gov-blue group-hover:text-gov-blue transition-colors shadow-soft">
                02
              </div>
              <h4 className="text-2xl font-extrabold text-gov-navy mb-4 tracking-tight">AI Analyzes Your Profile</h4>
              <p className="text-slate-600 font-medium">BizClear analyzes your business context and matches it against our database of regulatory requirements.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center group mt-8 md:mt-0">
              <div className="w-20 h-20 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center text-2xl font-black text-slate-400 mb-6 group-hover:border-teal-500 group-hover:text-teal-500 transition-colors shadow-soft">
                03
              </div>
              <h4 className="text-2xl font-extrabold text-gov-navy mb-4 tracking-tight">Get Your Clear Roadmap</h4>
              <p className="text-slate-600 font-medium">Receive structured guidance, a personalized compliance tracker, and understand what to explore next.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🤖 SECTION 5 — FEATURES */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gov-navy tracking-tight">Everything you need to start right.</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Sparkles, title: "AI-Powered Recommendations", desc: "Get context-aware guidance based on your exact business profile and operations.", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
            { icon: Map, title: "Personalized Roadmap", desc: "Understand your potential compliance journey step by step without the overwhelm.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { icon: Layers, title: "Organized Tracking", desc: "Keep track of your applications and requirements all in one centralized dashboard.", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
            { icon: Compass, title: "Simplified Navigation", desc: "Reduce confusion across multiple government departments and opaque terminology.", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { icon: TrendingUp, title: "Faster Decisions", desc: "Spend less time figuring out where to begin and more time building your business.", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
            { icon: Lightbulb, title: "Built for Businesses", desc: "Designed specifically to help entrepreneurs start their journey with greater clarity.", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all group">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.bg} ${feature.border} border`}>
                <feature.icon className={`w-6 h-6 ${feature.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h4 className="text-lg font-extrabold text-gov-navy mb-2">{feature.title}</h4>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 SECTION 6 — POWERFUL BRAND QUOTE */}
      <section className="w-full bg-gov-navy text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-600/20 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            "Build the business. <br/>
            <span className="text-teal-400">We'll help you understand the path."</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 font-medium">
            BizClear brings clarity to the complex world of business compliance.
          </p>
        </div>
      </section>

      {/* 🏆 SECTION 7 — WHY BIZCLEAR */}
      <section className="w-full max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 bg-slate-50" id="why-bizclear">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gov-navy tracking-tight">The BizClear Difference</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Without */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-soft">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-8 pb-4 border-b border-slate-100">Without Clear Guidance</h3>
            <ul className="space-y-6">
              {[
                "Searching multiple government websites",
                "Uncertainty about local vs state requirements",
                "Confusing legal terminology",
                "No clear starting point for applications"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-600 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* With */}
          <div className="bg-gradient-to-br from-gov-navy to-slate-900 rounded-3xl p-8 md:p-12 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-extrabold text-white mb-8 pb-4 border-b border-slate-700/50 relative z-10">With BizClear</h3>
            <ul className="space-y-6 relative z-10">
              {[
                "Structured, easy-to-read guidance",
                "AI-powered analysis for your specific sector",
                "Clear next steps and requirements",
                "Organized, centralized compliance journey"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-slate-200 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 🔥 SECTION 8 — FINAL CTA */}
      <section className="w-full bg-white py-32 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-gov-navy tracking-tight">
            Your business journey deserves a clearer start.
          </h2>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Tell us about your business and let BizClear help you understand the path ahead.
          </p>
          <div className="pt-8">
            <Link 
              to="/signup" 
              className="group relative inline-flex items-center justify-center gap-2 bg-gov-navy text-white px-10 py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-[0_10px_30px_rgba(15,23,42,0.15)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.25)] hover:-translate-y-1 font-extrabold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-700 transition-all"></div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

