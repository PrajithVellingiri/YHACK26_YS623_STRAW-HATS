import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, Database, Activity, FileText, LogOut, Settings } from 'lucide-react';

export const AdminLayout: React.FC = () => {
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
      if (user.role !== 'ADMIN') {
        if (user.role === 'OFFICER') navigate('/officer');
        else navigate('/dashboard');
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
    { label: 'Admin Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Applications', path: '/admin/applications', icon: Activity },
    { label: 'Departments', path: '/admin/departments', icon: Database },
    { label: 'Compliance Rules', path: '/admin/compliances', icon: FileText },
  ];

  return (
    <div className="h-screen flex bg-gov-bg overflow-hidden text-text-main">
      <aside className="w-64 flex-shrink-0 bg-slate-900 text-white hidden md:flex flex-col shadow-sm z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to="/admin" className="flex items-center gap-2 text-gov-teal hover:text-teal-400 transition-colors">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-extrabold tracking-tight text-white">BizClear</span>
          </Link>
        </div>
        
        <div className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider mt-4">
          System Administration
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
              
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-800 text-gov-teal shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:-translate-y-0.5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen relative">
        <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 shadow-sm">
          <div className="md:hidden flex items-center gap-2 text-gov-navy font-extrabold tracking-tight">
            <ShieldCheck className="h-6 w-6 text-gov-teal" />
            BizClear
          </div>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted border-r border-slate-200 pr-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gov-navy border border-slate-200">
                <Settings className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline-block font-bold text-gov-navy">System Admin</span>
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

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact 
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
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
