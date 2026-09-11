import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, FileText, ArrowRight, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { BusinessProfile, ComplianceRequirement } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [business, setBusiness] = useState<BusinessProfile | null>(null);
  const [compliances, setCompliances] = useState<ComplianceRequirement[]>([]);

  useEffect(() => {
    const storedBusiness = localStorage.getItem('businessProfile');
    const storedCompliances = localStorage.getItem('compliances');
    
    if (!storedBusiness || !storedCompliances) {
      navigate('/intake');
      return;
    }

    setBusiness(JSON.parse(storedBusiness));
    setCompliances(JSON.parse(storedCompliances));
  }, [navigate]);

  if (!business) return null;

  const totalCompliances = compliances.length;
  const completedCompliances = compliances.filter(c => c.status === 'APPROVED').length;
  const pendingCompliances = totalCompliances - completedCompliances;
  const progressPercentage = totalCompliances === 0 ? 0 : Math.round((completedCompliances / totalCompliances) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-gov-navy tracking-tight mb-1">Business Dashboard</h1>
          <p className="text-slate-500 font-medium">Overview of your compliance requirements and application status.</p>
        </div>
        <Link to="/tracker">
          <Button variant="primary" className="shadow-premium">Go to Tracker</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-gov-teal" />
              Business Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Business Name</h3>
                <p className="font-extrabold text-lg text-gov-navy leading-tight">{business.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Sector</h3>
                  <p className="text-slate-700 font-medium">{business.sector}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</h3>
                  <p className="text-slate-700 font-medium">{business.state}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Size</h3>
                  <p className="text-slate-700 font-medium">{business.businessSize}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Stage</h3>
                  <p className="text-slate-700 font-medium">{business.businessStage}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gov-blue" />
              Compliance Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-400" /> Total Required
                </div>
                <div className="text-4xl font-black text-gov-navy">{totalCompliances}</div>
              </div>
              <div className="bg-green-50 p-5 rounded-2xl border border-green-200 shadow-sm">
                <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </div>
                <div className="text-4xl font-black text-green-700">{completedCompliances}</div>
              </div>
              <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Pending Action
                </div>
                <div className="text-4xl font-black text-amber-700">{pendingCompliances}</div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Overall Progress</span>
                <span className="text-lg font-black text-gov-teal">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 shadow-inner overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-gov-teal h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <h2 className="text-2xl font-extrabold text-gov-navy mb-6 tracking-tight">Required Licences</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compliances.map(compliance => (
            <Card key={compliance.id} className="flex flex-col border-t-4 border-t-gov-teal">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="text-lg font-extrabold text-gov-navy leading-tight">{compliance.name}</h3>
                  {compliance.required ? (
                    <Badge variant="red" className="flex items-center gap-1 flex-shrink-0">
                      <AlertCircle className="w-3 h-3" /> Mandatory
                    </Badge>
                  ) : (
                    <Badge variant="blue" className="flex-shrink-0">Applicable</Badge>
                  )}
                </div>
                
                <div className="space-y-4 mb-6 flex-1">
                  <div className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <Building className="w-4 h-4 mt-0.5 text-gov-teal shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Department</span>
                      <span className="font-medium text-slate-700">{compliance.department}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <FileText className="w-4 h-4 mt-0.5 text-gov-blue shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Documents</span>
                      <span className="font-medium text-slate-700">{compliance.documents.length} required</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Current Status</span>
                    <StatusBadge status={compliance.status} />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <Link to={`/compliance/${compliance.id}`}>
                    <Button variant="outline" className="w-full justify-between group hover:border-gov-teal">
                      View AI Guidance
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gov-teal" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
