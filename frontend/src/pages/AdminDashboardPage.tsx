import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AdminStats } from '../types';
import { getAdminStats } from '../services/api';
import { BarChart3, Settings, Database, Activity, FileText, AlertTriangle } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (e: any) {
        console.error(e);
        setError(e.message || "Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center animate-pulse shadow-inner">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy tracking-tight">Loading system overview...</h2>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl shadow-soft border border-slate-200">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy mb-2 tracking-tight">Error Loading Dashboard</h2>
        <p className="text-slate-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gov-navy tracking-tight mb-1">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">System overview and compliance rules management.</p>
        </div>
        <Link to="/admin/compliances">
          <Button variant="primary" className="gap-2 shadow-premium bg-amber-600 hover:bg-amber-700 text-white"><Settings className="w-4 h-4" /> Manage Rules</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-purple-500 hover:shadow-premium transition-shadow">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 bg-purple-50 rounded-2xl text-purple-600 shadow-sm border border-purple-100"><Database className="w-8 h-8" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Businesses</p>
              <p className="text-4xl font-black text-gov-navy">{stats.totalBusinesses}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-gov-blue hover:shadow-premium transition-shadow">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 bg-blue-50 rounded-2xl text-gov-blue shadow-sm border border-blue-100"><Activity className="w-8 h-8" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Applications</p>
              <p className="text-4xl font-black text-gov-navy">{stats.totalApplications}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-gov-teal hover:shadow-premium transition-shadow">
          <CardContent className="p-6 flex items-center gap-5">
            <div className="p-4 bg-teal-50 rounded-2xl text-gov-teal shadow-sm border border-teal-100"><FileText className="w-8 h-8" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Compliance Rules</p>
              <p className="text-4xl font-black text-gov-navy">{stats.totalCompliances}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-100 bg-slate-50 p-6 rounded-t-2xl">
          <CardTitle className="flex items-center gap-2 text-lg font-extrabold text-gov-navy"><BarChart3 className="w-5 h-5 text-slate-400" /> Application Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-4xl font-black text-slate-700">{stats.statusDistribution?.NOT_STARTED || 0}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-2">Not Started</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
              <p className="text-4xl font-black text-blue-700">{stats.statusDistribution?.SUBMITTED || 0}</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-2">Submitted</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-xl border border-amber-200 shadow-sm">
              <p className="text-4xl font-black text-amber-700">{stats.statusDistribution?.UNDER_REVIEW || 0}</p>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-2">Under Review</p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-200 shadow-sm">
              <p className="text-4xl font-black text-green-700">{stats.statusDistribution?.APPROVED || 0}</p>
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mt-2">Approved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};