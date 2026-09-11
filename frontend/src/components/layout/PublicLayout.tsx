import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Globe, Mail, Phone } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-teal-500/30">
      {/* Sticky Premium Navbar */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-gov-teal to-gov-blue p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gov-navy">BizClear</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-bold text-slate-600 hover:text-gov-teal transition-colors">Home</button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-bold text-slate-600 hover:text-gov-teal transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-bold text-slate-600 hover:text-gov-teal transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('why-bizclear')} className="text-sm font-bold text-slate-600 hover:text-gov-teal transition-colors">Why BizClear</button>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/signin" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-gov-navy transition-colors">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="group relative inline-flex items-center justify-center gap-2 bg-gov-navy text-white px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 font-bold overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gov-teal/0 via-gov-teal/20 to-gov-teal/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full duration-700 transition-all"></div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Outlet />
      </main>

      {/* Clean Professional Footer */}
      <footer className="bg-gov-navy text-slate-300 py-16 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <ShieldCheck className="h-8 w-8 text-gov-teal group-hover:text-teal-400 transition-colors" />
                <span className="text-2xl font-extrabold tracking-tight text-white">BizClear</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                Intelligent business approval, licensing & compliance management platform. We bring clarity to the complex world of business compliance.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Phone className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('features')} className="text-sm hover:text-gov-teal transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-sm hover:text-gov-teal transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollToSection('why-bizclear')} className="text-sm hover:text-gov-teal transition-colors">Why Choose Us</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Resources</h4>
              <ul className="space-y-3">
                <li><Link to="/signin" className="text-sm hover:text-gov-teal transition-colors">Sign In</Link></li>
                <li><Link to="/signup" className="text-sm hover:text-gov-teal transition-colors">Create Account</Link></li>
                <li><a href="#" className="text-sm hover:text-gov-teal transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm hover:text-gov-teal transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-gov-teal transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm hover:text-gov-teal transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} BizClear. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">Built for modern businesses <span className="text-red-500">❤</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
};
