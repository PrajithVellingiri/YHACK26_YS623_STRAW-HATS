import React, { useState } from 'react';
import { FileText, Eye, Search, Filter } from 'lucide-react';
import { MOCK_APPLICATIONS } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ApplicationStatus } from '../types';

export const OfficerApplicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredApps = MOCK_APPLICATIONS.filter(app => {
    const matchesSearch = app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: MOCK_APPLICATIONS.length,
    submitted: MOCK_APPLICATIONS.filter(a => a.status === 'SUBMITTED').length,
    underReview: MOCK_APPLICATIONS.filter(a => a.status === 'UNDER_REVIEW').length,
    approved: MOCK_APPLICATIONS.filter(a => a.status === 'APPROVED').length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-gov-navy mb-2">Applications</h1>
        <p className="text-slate-500">Review and manage business compliance applications assigned to your department.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gov-navy">{stats.total}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Total Applications</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-blue-600">{stats.submitted}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Pending Review</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-yellow-600">{stats.underReview}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Under Review</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-green-600">{stats.approved}</span>
          <span className="text-sm font-medium text-slate-500 mt-1">Approved</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-teal focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-teal"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Pending Review</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">App ID</th>
                <th className="px-6 py-4 font-bold">Business</th>
                <th className="px-6 py-4 font-bold">Type</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length > 0 ? (
                filteredApps.map((app, idx) => (
                  <tr key={app.id} className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${idx === filteredApps.length - 1 ? 'border-none' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gov-navy">{app.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gov-navy">{app.businessName}</div>
                      <div className="text-xs text-slate-500">{app.industry}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{app.complianceType}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{app.submittedDate}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status as ApplicationStatus} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-gov-teal hover:bg-teal-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                    <p className="font-medium text-slate-600">No applications found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
