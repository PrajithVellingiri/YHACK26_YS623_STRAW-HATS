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
    <div className="min-h-screen flex bg-background text-text-main">
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2 text-accent-green hover:text-[#9BE600] transition-colors">
            <ShieldCheck className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight">BizClear</span>
          </Link>
        </div>
        
        <div className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider mt-4">
          System Administration
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
              
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#1F1F1F] text-accent-green border border-border' 
                    : 'text-text-muted hover:bg-[#1A1A1A] hover:text-text-main border border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="md:hidden flex items-center">
            <ShieldCheck className="h-8 w-8 text-accent-green" />
          </div>
          
          <div className="flex-1 flex justify-end items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted border-r border-border pr-4">
              <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-accent-green border border-border">
                <Settings className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline-block font-medium text-text-main">System Admin</span>
            </div>
            <button 
              onClick={handleSignOut}
              className="text-text-muted hover:text-accent-yellow transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline-block">Sign Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
