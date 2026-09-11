import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, FileText, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Select } from '../components/ui/Select';
import { ApplicationStatus } from '../types';
import { getOfficerApplicationDetails, updateOfficerApplicationStatus } from '../services/api';

export const ApplicationReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appDetails, setAppDetails] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      if (id) {
        try {
          const data = await getOfficerApplicationDetails(id);
          setAppDetails(data);
        } catch (e) {
          console.error("Failed to load details:", e);
        }
      }
    };
    fetchApp();
  }, [id]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!appDetails) return;
    setIsUpdating(true);
    try {
      await updateOfficerApplicationStatus(String(appDetails.application.id), newStatus);
      setAppDetails({
        ...appDetails,
        application: { ...appDetails.application, status: newStatus }
      });
      alert("Application status updated.");
    } catch (e) {
      console.error(e);
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!appDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-blue-50 text-gov-blue rounded-full flex items-center justify-center animate-pulse shadow-inner">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy tracking-tight">Loading application details...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <Link to="/officer" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-gov-teal mb-6 uppercase tracking-wider transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
          <div>
            <h1 className="text-3xl font-extrabold text-gov-navy tracking-tight mb-1">Application #{appDetails.application.id}</h1>
            <p className="text-slate-500 font-medium">Review details and update status.</p>
          </div>
          <StatusBadge status={appDetails.application.status} className="text-sm px-4 py-1.5 shadow-sm" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-t-4 border-t-gov-teal shadow-soft">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
            <CardTitle className="flex items-center gap-2 text-gov-navy font-extrabold uppercase tracking-wider text-sm"><Building className="w-4 h-4 text-gov-teal" /> Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Business Name</p>
              <p className="text-lg font-extrabold text-gov-navy">{appDetails.business.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sector</p>
                <p className="text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">{appDetails.business.sector}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">State</p>
                <p className="text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">{appDetails.business.state}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Size</p>
                <p className="text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">{appDetails.business.business_size}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Stage</p>
                <p className="text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">{appDetails.business.business_stage}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{appDetails.business.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-gov-blue shadow-soft">
          <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
            <CardTitle className="flex items-center gap-2 text-gov-navy font-extrabold uppercase tracking-wider text-sm"><FileText className="w-4 h-4 text-gov-blue" /> Compliance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Licence / Approval</p>
              <p className="text-lg font-extrabold text-gov-navy">{appDetails.compliance.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department</p>
              <p className="text-slate-700 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">{appDetails.compliance.department}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{appDetails.compliance.description}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Required Documents</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{appDetails.compliance.required_documents}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-t-4 border-t-amber-500 shadow-premium overflow-hidden">
        <CardHeader className="bg-amber-50 border-b border-amber-100 p-6">
          <CardTitle className="flex items-center gap-2 text-amber-700 font-extrabold tracking-tight text-lg"><Activity className="w-5 h-5" /> Officer Action</CardTitle>
        </CardHeader>
        <CardContent className="p-8 bg-white">
          <div className="max-w-md space-y-6">
            <p className="text-sm font-medium text-slate-600 leading-relaxed">Update the current status of this application based on your review. The business owner will be notified of changes.</p>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Set Application Status</label>
              <Select
                value={appDetails.application.status}
                onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
                disabled={isUpdating}
                className="font-bold text-gov-navy shadow-sm"
                options={[
                  { label: 'Not Started', value: 'NOT_STARTED' },
                  { label: 'Submitted', value: 'SUBMITTED' },
                  { label: 'Under Review', value: 'UNDER_REVIEW' },
                  { label: 'Approved', value: 'APPROVED' },
                ]}
              />
            </div>
            <div className="h-4">
              {isUpdating && <p className="text-xs font-bold text-amber-600 animate-pulse uppercase tracking-wider">Saving changes to database...</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};