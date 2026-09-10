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

  if (!appDetails) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/officer" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Application #{appDetails.application.id}</h1>
            <p className="text-gray-600">Review details and update status.</p>
          </div>
          <StatusBadge status={appDetails.application.status} className="text-base px-3 py-1" />
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
              <p className="text-gray-900 font-medium">{appDetails.business.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Sector</p>
                <p className="text-gray-900 text-sm">{appDetails.business.sector}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">State</p>
                <p className="text-gray-900 text-sm">{appDetails.business.state}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Size</p>
                <p className="text-gray-900 text-sm">{appDetails.business.business_size}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Stage</p>
                <p className="text-gray-900 text-sm">{appDetails.business.business_stage}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-gray-900 text-sm">{appDetails.business.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Compliance Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Licence / Approval</p>
              <p className="text-gray-900 font-medium">{appDetails.compliance.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Department</p>
              <p className="text-gray-900 text-sm">{appDetails.compliance.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-gray-900 text-sm">{appDetails.compliance.description}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Required Documents</p>
              <p className="text-gray-900 text-sm">{appDetails.compliance.required_documents}</p>
            </div>
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
                  value={appDetails.application.status}
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