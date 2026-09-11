import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gov-bg">
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gov-teal hover:text-gov-tealHover transition-colors">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-extrabold tracking-tight text-gov-navy">BizClear</span>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/signin" className="text-slate-600 font-bold hover:text-gov-teal transition-colors">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-gov-teal text-white px-5 py-2.5 rounded-lg hover:bg-gov-tealHover transition-all shadow-md hover:-translate-y-0.5 font-bold"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative">
        <Outlet />
      </main>

      <footer className="bg-slate-900 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
          <ShieldCheck className="h-8 w-8 mx-auto mb-4 text-gov-teal opacity-50" />
          <p>BizClear &copy; {new Date().getFullYear()} - Intelligent Business Approval, Licensing & Compliance Management Platform</p>
        </div>
      </footer>
    </div>
  );
};
