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
      <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-2xl shadow-soft border border-slate-200 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-inner border border-slate-100 relative z-10">
          <Activity className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy mb-2 relative z-10 tracking-tight">No applications to track</h2>
        <p className="text-slate-500 mb-8 max-w-md relative z-10 font-medium">Complete your business details to generate your compliance checklist and start tracking progress.</p>
        <Link to="/intake" className="relative z-10">
          <button className="bg-gov-teal text-white px-6 py-2.5 rounded-lg hover:bg-gov-tealHover transition-all shadow-md hover:-translate-y-0.5 font-bold">
            Go to Business Intake
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
        <h1 className="text-3xl font-extrabold text-gov-navy mb-1 tracking-tight">Application Tracker</h1>
        <p className="text-slate-500 font-medium">Update and monitor the progress of your licences and approvals.</p>
      </div>

      <div className="space-y-5">
        {compliances.map((compliance) => {
          const progress = getWorkflowProgress(compliance.status);
          const isUpdating = updatingId === compliance.id;
          const showFeedback = feedbackMsg?.id === compliance.id;
          
          return (
            <Card key={compliance.id} className="overflow-hidden border-l-4 border-l-gov-teal group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-extrabold text-gov-navy leading-tight">
                        <Link to={`/compliance/${compliance.id}`} className="hover:text-gov-teal transition-colors">
                          {compliance.name}
                        </Link>
                      </h3>
                      <StatusBadge status={compliance.status} />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-6">
                      <Shield className="w-4 h-4 text-gov-blue" /> {compliance.department}
                    </p>
                    
                    <div className="relative pt-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex mb-3 items-center justify-between text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        <span className={progress >= 0 ? 'text-gov-teal' : ''}>Not Started</span>
                        <span className={progress >= 33 ? 'text-gov-teal' : ''}>Submitted</span>
                        <span className={progress >= 66 ? 'text-gov-teal' : ''}>Under Review</span>
                        <span className={progress >= 100 ? 'text-green-600' : ''}>Approved</span>
                      </div>
                      <div className="flex bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`flex flex-col justify-center overflow-hidden ${progress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-teal-400 to-gov-teal'} transition-all duration-700 ease-out`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 flex-shrink-0 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Update Status</label>
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
                        className="text-sm font-bold shadow-sm"
                      />
                    </div>
                    
                    <div className="h-5">
                      {isUpdating && <span className="text-xs font-bold text-gov-teal animate-pulse uppercase tracking-wider">Updating status...</span>}
                      {showFeedback && <span className="text-xs font-bold text-green-600">{feedbackMsg.msg}</span>}
                    </div>

                    <Link to={`/compliance/${compliance.id}`} className="mt-auto text-sm text-gov-navy hover:text-gov-teal font-bold flex items-center transition-colors">
                      View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
