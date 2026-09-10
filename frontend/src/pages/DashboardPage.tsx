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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your compliance requirements.</p>
        </div>
        <Link to="/tracker">
          <Button variant="outline">Go to Tracker</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-gray-400" />
              Business Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Business Name</h3>
                <p className="font-semibold text-gray-900">{business.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sector</h3>
                  <p className="text-gray-900">{business.sector}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-gray-900">{business.state}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="text-gray-900">{business.businessSize}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stage</h3>
                  <p className="text-gray-900">{business.businessStage}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Compliance Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" /> Total Required
                </div>
                <div className="text-3xl font-bold text-gray-900">{totalCompliances}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="text-sm font-medium text-green-700 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </div>
                <div className="text-3xl font-bold text-green-700">{completedCompliances}</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                <div className="text-sm font-medium text-yellow-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Pending Action
                </div>
                <div className="text-3xl font-bold text-yellow-700">{pendingCompliances}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Licences</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {compliances.map(compliance => (
            <Card key={compliance.id} className="flex flex-col">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{compliance.name}</h3>
                  {compliance.required ? (
                    <Badge variant="red" className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Mandatory
                    </Badge>
                  ) : (
                    <Badge variant="blue">Applicable</Badge>
                  )}
                </div>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4 mt-0.5 text-gray-400" />
                    <span><span className="font-medium">Department:</span> {compliance.department}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4 mt-0.5 text-gray-400" />
                    <span><span className="font-medium">Documents:</span> {compliance.documents.length} required</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 block mb-1">Current Status</span>
                    <StatusBadge status={compliance.status} />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <Link to={`/compliance/${compliance.id}`}>
                    <Button variant="outline" className="w-full justify-between group">
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
