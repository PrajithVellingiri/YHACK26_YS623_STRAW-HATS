import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, FileText, Activity, LogOut, User } from 'lucide-react';

export const BusinessLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/signin');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'CITIZEN') {
        if (user.role === 'ADMIN') navigate('/admin');
        else navigate('/officer');
      }
    } catch {
      navigate('/signin');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Compliance', path: '/intake', icon: FileText },
    { label: 'Applications', path: '/tracker', icon: Activity },
  ];

  return (
    <div className="h-screen flex bg-gov-bg overflow-hidden text-text-main">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/dashboard" className="flex items-center gap-2 text-gov-teal hover:text-gov-tealHover transition-colors">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-extrabold text-gov-navy tracking-tight">BizClear</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-teal-50 text-gov-teal shadow-sm ring-1 ring-teal-500/20' 
                    : 'text-text-muted hover:bg-slate-50 hover:text-gov-navy border border-transparent hover:-translate-y-0.5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 shadow-sm">
          <div className="md:hidden flex items-center gap-2 text-gov-navy font-extrabold tracking-tight">
            <ShieldCheck className="h-6 w-6 text-gov-teal" />
            BizClear
          </div>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted border-r border-slate-200 pr-4">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline-block font-bold text-gov-navy">Business Owner</span>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-text-muted hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline-block">Sign Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative pb-20 md:pb-8">
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50/80 to-gov-bg pointer-events-none z-0" />
          <div className="max-w-6xl mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 min-w-[64px] rounded-lg ${
                isActive ? 'text-gov-teal' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
