import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, FileText, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { ApplicationRecord, ApplicationStatus } from '../types';
import { getOfficerApplications, updateOfficerApplicationStatus } from '../services/api';

export const ApplicationReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchApp = async () => {
      const data = await getOfficerApplications();
      const found = data.find((a: ApplicationRecord) => a.id === id);
      if (found) setApplication(found);
    };
    fetchApp();
  }, [id]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (!application) return;
    setIsUpdating(true);
    try {
      await updateOfficerApplicationStatus(application.id, newStatus);
      setApplication({ ...application, status: newStatus });
      alert("Application status updated.");
    } catch (e) {
      console.error(e);
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!application) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/officer" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Application #{application.id}</h1>
            <p className="text-gray-600">Review details and update status.</p>
          </div>
          <StatusBadge status={application.status} className="text-base px-3 py-1" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building className="w-5 h-5" /> Business Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Business Name</p>
              <p className="text-gray-900 font-medium">{application.businessName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Business ID</p>
              <p className="text-gray-900 font-mono text-sm">{application.businessId}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">View Full Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Compliance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Licence / Approval</p>
              <p className="text-gray-900 font-medium">{application.complianceName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Submitted Date</p>
              <p className="text-gray-900 text-sm">{new Date(application.submittedAt).toLocaleDateString()}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">View Documents</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-200">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="flex items-center gap-2 text-blue-900"><Activity className="w-5 h-5" /> Officer Action</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="max-w-md space-y-4">
            <p className="text-sm text-gray-600">Update the current status of this application based on your review.</p>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Select
                  value={application.status}
                  onChange={(e) => handleStatusChange(e.target.value as ApplicationStatus)}
                  disabled={isUpdating}
                  options={[
                    { label: 'Not Started', value: 'NOT_STARTED' },
                    { label: 'Submitted', value: 'SUBMITTED' },
                    { label: 'Under Review', value: 'UNDER_REVIEW' },
                    { label: 'Approved', value: 'APPROVED' },
                  ]}
                />
              </div>
            </div>
            {isUpdating && <p className="text-sm text-blue-600 animate-pulse">Saving changes...</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
