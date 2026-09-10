import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Activity } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Select } from '../components/ui/Select';
import { ApplicationStatus, ComplianceRequirement } from '../types';
import { updateApplicationStatus } from '../services/api';

export const TrackerPage: React.FC = () => {
  const [compliances, setCompliances] = useState<ComplianceRequirement[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{id: string, msg: string} | null>(null);

  useEffect(() => {
    const storedCompliances = localStorage.getItem('compliances');
    if (storedCompliances) {
      setCompliances(JSON.parse(storedCompliances));
    }
  }, []);

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    setUpdatingId(id);
    try {
      await updateApplicationStatus(id, newStatus);
      
      const updatedCompliances = compliances.map(c => 
        c.id === id ? { ...c, status: newStatus } : c
      );
      
      setCompliances(updatedCompliances);
      localStorage.setItem('compliances', JSON.stringify(updatedCompliances));
      
      setFeedbackMsg({ id, msg: 'Application status updated successfully.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
      
    } catch (error: any) {
      console.error('Failed to update status', error);
      alert(`Failed to update status: ${error.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const getWorkflowProgress = (status: ApplicationStatus) => {
    switch(status) {
      case 'NOT_STARTED': return 0;
      case 'SUBMITTED': return 33;
      case 'UNDER_REVIEW': return 66;
      case 'APPROVED': return 100;
      default: return 0;
    }
  };

  if (compliances.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No applications to track</h2>
        <p className="text-gray-600 mb-6">Complete your business details to generate your compliance checklist.</p>
        <Link to="/intake" className="text-blue-600 font-medium hover:underline">
          Go to Business Intake
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Tracker</h1>
        <p className="text-gray-600">Update and monitor the progress of your licences and approvals.</p>
      </div>

      <div className="space-y-4">
        {compliances.map((compliance) => {
          const progress = getWorkflowProgress(compliance.status);
          const isUpdating = updatingId === compliance.id;
          const showFeedback = feedbackMsg?.id === compliance.id;
          
          return (
            <Card key={compliance.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        <Link to={`/compliance/${compliance.id}`} className="hover:text-blue-600 transition-colors">
                          {compliance.name}
                        </Link>
                      </h3>
                      <StatusBadge status={compliance.status} />
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4">
                      <Shield className="w-4 h-4" /> {compliance.department}
                    </p>
                    
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between text-xs text-gray-500">
                        <span className={progress >= 0 ? 'text-blue-600 font-medium' : ''}>Not Started</span>
                        <span className={progress >= 33 ? 'text-blue-600 font-medium' : ''}>Submitted</span>
                        <span className={progress >= 66 ? 'text-blue-600 font-medium' : ''}>Under Review</span>
                        <span className={progress >= 100 ? 'text-green-600 font-bold' : ''}>Approved</span>
                      </div>
                      <div className="flex bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`flex flex-col justify-center overflow-hidden ${progress === 100 ? 'bg-green-500' : 'bg-blue-600'} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 flex-shrink-0 flex flex-col gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                    <label className="text-xs font-medium text-gray-500">Update Status</label>
                    <Select 
                      value={compliance.status}
                      disabled={isUpdating}
                      onChange={(e) => handleStatusChange(compliance.id, e.target.value as ApplicationStatus)}
                      options={[
                        { label: 'Not Started', value: 'NOT_STARTED' },
                        { label: 'Submitted', value: 'SUBMITTED' },
                        { label: 'Under Review', value: 'UNDER_REVIEW' },
                        { label: 'Approved', value: 'APPROVED' },
                      ]}
                      className="text-sm"
                    />
                    
                    <div className="h-4">
                      {isUpdating && <span className="text-xs text-blue-600 animate-pulse">Updating status...</span>}
                      {showFeedback && <span className="text-xs text-green-600">{feedbackMsg.msg}</span>}
                    </div>

                    <Link to={`/compliance/${compliance.id}`} className="mt-2 text-sm text-blue-600 font-medium flex items-center hover:underline">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
