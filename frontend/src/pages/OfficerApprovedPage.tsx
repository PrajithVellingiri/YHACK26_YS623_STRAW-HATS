import React, { useState } from 'react';
import { CheckCircle, Search, FileText } from 'lucide-react';
import { MOCK_APPLICATIONS } from '../data/mockData';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ApplicationStatus } from '../types';

export const OfficerApprovedPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter only approved applications
  const approvedApps = MOCK_APPLICATIONS.filter(app => app.status === 'APPROVED' && 
    (app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     app.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gov-navy mb-2">Approved Applications</h1>
          <p className="text-slate-500">Applications successfully reviewed and approved.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold">{approvedApps.length} Approved</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search approved applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gov-teal focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-bold">App ID</th>
                <th className="px-6 py-4 font-bold">Business</th>
                <th className="px-6 py-4 font-bold">Compliance Type</th>
                <th className="px-6 py-4 font-bold">Submitted Date</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {approvedApps.length > 0 ? (
                approvedApps.map((app, idx) => (
                  <tr key={app.id} className={`border-b border-slate-100 hover:bg-slate-50/80 transition-colors ${idx === approvedApps.length - 1 ? 'border-none' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gov-navy">{app.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gov-navy">{app.businessName}</div>
                      <div className="text-xs text-slate-500">{app.industry}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{app.complianceType}</div>
                      <div className="text-xs text-slate-400">{app.department}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {app.submittedDate}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={app.status as ApplicationStatus} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                    <p className="font-medium text-slate-600">No approved applications found.</p>
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
