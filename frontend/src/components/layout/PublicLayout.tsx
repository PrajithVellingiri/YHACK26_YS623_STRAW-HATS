import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-accent-green hover:text-[#9BE600] transition-colors">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-bold text-text-main tracking-tight">BizClear</span>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/signin" className="text-text-muted hover:text-text-main font-medium transition-colors">
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-accent-green text-black px-4 py-2 rounded-xl hover:bg-[#9BE600] transition-colors shadow-[0_0_15px_rgba(174,255,0,0.2)]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-muted">
          <p>BizClear &copy; {new Date().getFullYear()} - Intelligent Business Approval, Licensing & Compliance Management Platform</p>
        </div>
      </footer>
    </div>
  );
};
