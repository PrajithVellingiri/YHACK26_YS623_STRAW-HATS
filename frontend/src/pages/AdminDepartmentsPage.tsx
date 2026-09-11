import React, { useState } from 'react';
import { Search, Building2, Users, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_DEPARTMENTS } from '../data/mockData';

export const AdminDepartmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepts = MOCK_DEPARTMENTS.filter(dept => 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gov-navy mb-2">Department Management</h1>
          <p className="text-slate-500">Manage government and regulatory departments associated with compliance.</p>
        </div>
        <button className="hidden md:flex bg-gov-teal text-white px-5 py-2.5 rounded-lg hover:bg-gov-tealHover transition-all shadow-sm font-bold text-sm">
          + Add Department
        </button>
      </div>

      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search departments..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-3 text-sm border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gov-teal focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepts.length > 0 ? (
          filteredDepts.map((dept) => (
            <div key={dept.code} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-gov-blue shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gov-navy leading-tight mb-1">{dept.name}</h3>
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded uppercase tracking-wider">
                      {dept.code}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-sm text-slate-600 mb-6 line-clamp-2 h-10">{dept.description}</p>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><FileText className="w-3 h-3"/> Active</span>
                    <span className="text-lg font-bold text-gov-navy">{dept.activeApplications}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-orange-400"/> Pending</span>
                    <span className="text-lg font-bold text-orange-600">{dept.pendingApplications}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><Users className="w-3 h-3 text-gov-teal"/> Officers</span>
                    <span className="text-lg font-bold text-gov-teal">{dept.assignedOfficers}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {dept.status}
                </span>
                <button className="text-sm font-bold text-gov-navy hover:text-gov-teal transition-colors">
                  Manage
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 border-dashed">
            <Building2 className="w-8 h-8 mx-auto text-slate-300 mb-3" />
            <p className="font-medium text-slate-600">No departments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
