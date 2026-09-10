import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">NaviGuard</span>
          </Link>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            {!isLanding && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/tracker" 
                  className={`${location.pathname === '/tracker' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Tracker
                </Link>
              </>
            )}
            {isLanding && (
              <Link 
                to="/intake" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>NaviGuard &copy; {new Date().getFullYear()} - Your Business Compliance Navigator</p>
        </div>
      </footer>
    </div>
  );
};
