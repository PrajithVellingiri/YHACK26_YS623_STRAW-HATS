import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ApplicationRecord } from '../types';
import { getOfficerApplications } from '../services/api';
import { Users, FileCheck, Clock, CheckCircle2 } from 'lucide-react';

export const OfficerDashboardPage: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getOfficerApplications();
        setApplications(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApps();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-gov-blue rounded-full flex items-center justify-center animate-pulse shadow-inner">
          <FileCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy tracking-tight">Loading applications...</h2>
      </div>
    );
  }

  const pendingCount = applications.filter(a => a.status === 'SUBMITTED').length;
  const reviewCount = applications.filter(a => a.status === 'UNDER_REVIEW').length;
  const approvedCount = applications.filter(a => a.status === 'APPROVED').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
        <h1 className="text-3xl font-extrabold text-gov-navy mb-1 tracking-tight">Officer Dashboard</h1>
        <p className="text-slate-500 font-medium">Review and process business compliance applications.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-t-4 border-t-slate-500 shadow-soft">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-xl text-slate-500 shadow-sm border border-slate-100"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Apps</p>
              <p className="text-3xl font-black text-gov-navy">{applications.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-gov-blue shadow-soft">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl text-gov-blue shadow-sm border border-blue-100"><FileCheck className="w-6 h-6" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">New / Pending</p>
              <p className="text-3xl font-black text-gov-navy">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-amber-500 shadow-soft">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-500 shadow-sm border border-amber-100"><Clock className="w-6 h-6" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Under Review</p>
              <p className="text-3xl font-black text-gov-navy">{reviewCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-green-500 shadow-soft">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-xl text-green-500 shadow-sm border border-green-100"><CheckCircle2 className="w-6 h-6" /></div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Approved</p>
              <p className="text-3xl font-black text-gov-navy">{approvedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft border border-slate-200 overflow-hidden">
        <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
          <CardTitle className="font-extrabold text-gov-navy uppercase tracking-wider text-sm flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-gov-blue" /> Assigned Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5">Application ID</th>
                  <th className="px-6 py-5">Business</th>
                  <th className="px-6 py-5">Compliance</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400">#{app.id}</td>
                    <td className="px-6 py-4 font-extrabold text-gov-navy">{app.businessName}</td>
                    <td className="px-6 py-4 font-medium">{app.complianceName}</td>
                    <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/officer/application/${app.id}`}>
                        <Button variant="outline" size="sm" className="font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:border-gov-blue hover:text-gov-blue">Review</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
