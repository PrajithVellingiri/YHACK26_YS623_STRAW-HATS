import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { AdminStats } from '../types';
import { getAdminStats } from '../services/api';
import { BarChart3, Settings, Database, Activity, FileText } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading || !stats) {
    return <div className="text-center py-12">Loading system overview...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and compliance rules management.</p>
        </div>
        <Link to="/admin/compliances">
          <Button className="gap-2"><Settings className="w-4 h-4" /> Manage Rules</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-purple-100 rounded-xl text-purple-600"><Database className="w-8 h-8" /></div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Businesses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBusinesses}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-xl text-blue-600"><Activity className="w-8 h-8" /></div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalApplications}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 bg-green-100 rounded-xl text-green-600"><FileText className="w-8 h-8" /></div>
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Compliance Rules</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalCompliances}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-gray-500" /> Application Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-2xl font-bold text-gray-700">{stats.statusDistribution.NOT_STARTED}</p>
              <p className="text-xs font-medium text-gray-500 uppercase mt-1">Not Started</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-2xl font-bold text-blue-700">{stats.statusDistribution.SUBMITTED}</p>
              <p className="text-xs font-medium text-blue-600 uppercase mt-1">Submitted</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <p className="text-2xl font-bold text-yellow-700">{stats.statusDistribution.UNDER_REVIEW}</p>
              <p className="text-xs font-medium text-yellow-600 uppercase mt-1">Under Review</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-2xl font-bold text-green-700">{stats.statusDistribution.APPROVED}</p>
              <p className="text-xs font-medium text-green-600 uppercase mt-1">Approved</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
