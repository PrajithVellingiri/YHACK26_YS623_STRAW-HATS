import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, FileText, ArrowRight, ArrowLeft, CheckCircle2, AlertTriangle, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ComplianceRequirement, AIGuidance } from '../types';
import { getGuidance } from '../services/api';

export const ComplianceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [compliance, setCompliance] = useState<ComplianceRequirement | null>(null);
  const [aiGuidance, setAiGuidance] = useState<AIGuidance | null>(null);
  const [isGuidanceLoading, setIsGuidanceLoading] = useState(false);
  const [guidanceError, setGuidanceError] = useState<string | null>(null);

  useEffect(() => {
    const storedCompliances = localStorage.getItem('compliances');
    if (storedCompliances && id) {
      const compliances: ComplianceRequirement[] = JSON.parse(storedCompliances);
      const found = compliances.find(c => c.id === id);
      if (found) {
        setCompliance(found);
      }
    }
  }, [id]);

  const handleGetGuidance = async () => {
    if (!id) return;
    setIsGuidanceLoading(true);
    setGuidanceError(null);
    try {
      const guidance = await getGuidance(id);
      setAiGuidance(guidance);
    } catch (err) {
      setGuidanceError("We couldn't generate the AI explanation right now. Please try again.");
    } finally {
      setIsGuidanceLoading(false);
    }
  };

  if (!compliance) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-gov-navy mb-2 tracking-tight">Compliance not found</h2>
        <Link to="/dashboard">
          <Button variant="primary" className="mt-4 shadow-premium">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative">
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="gap-2 font-bold hover:border-gov-teal hover:text-gov-teal">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col justify-between items-start bg-white p-6 rounded-2xl shadow-soft border border-slate-200 relative z-10 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gov-navy mb-4 tracking-tight leading-tight">{compliance.name}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="blue" className="px-3 py-1 text-sm">{compliance.department}</Badge>
            {compliance.required && <Badge variant="red" className="px-3 py-1 text-sm">Mandatory</Badge>}
            <StatusBadge status={compliance.status} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-t-4 border-t-gov-teal">
            <CardContent className="p-8">
              <h3 className="text-xl font-extrabold text-gov-navy mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gov-teal" />
                Why do we need this?
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-8 font-medium">
                {compliance.whyNeeded}
              </p>

              {!aiGuidance && !isGuidanceLoading && !guidanceError && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-gov-blue rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-start gap-5">
                    <div className="bg-teal-50 p-3 rounded-xl text-gov-teal flex-shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gov-navy mb-1 text-lg">Confused about this requirement?</h4>
                      <p className="text-slate-500 text-sm mb-4 font-medium leading-relaxed">
                        Our AI can explain exactly why this applies to your specific business and what it means for you in simple terms.
                      </p>
                      <Button onClick={handleGetGuidance} variant="primary" size="sm" className="shadow-premium">
                        Explain This to Me
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {isGuidanceLoading && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center shadow-inner">
                  <Sparkles className="w-8 h-8 text-gov-teal animate-spin mx-auto mb-4" />
                  <p className="text-gov-navy font-extrabold tracking-tight">Preparing a simple explanation & steps...</p>
                </div>
              )}

              {guidanceError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-red-800 text-sm mb-3 font-medium">{guidanceError}</p>
                    <Button onClick={handleGetGuidance} variant="outline" size="sm" className="border-red-200 hover:bg-red-100">Retry</Button>
                  </div>
                </div>
              )}

              {aiGuidance && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* AI Explanation Section */}
                  <div className="relative">
                    <div className="absolute -inset-[2px] bg-gradient-to-r from-teal-400 to-gov-blue rounded-2xl opacity-30"></div>
                    <div className="relative bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                      <div className="absolute -top-3 -right-3 bg-gov-navy text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-teal-400" /> AI Insight
                      </div>
                      <p className="text-slate-700 leading-relaxed font-medium text-sm mt-2">
                        {aiGuidance.why_needed}
                      </p>
                    </div>
                  </div>

                  {/* Steps to Apply Section */}
                  <div className="pt-2">
                    <h3 className="text-xl font-extrabold text-gov-navy mb-5 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gov-teal" />
                      Steps to Apply
                    </h3>
                    <div className="space-y-4">
                      {aiGuidance.steps_to_apply?.map((step, index) => (
                        <div key={index} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="w-8 h-8 rounded-full bg-white border-2 border-gov-teal text-gov-teal flex items-center justify-center font-black flex-shrink-0 group-hover:bg-gov-teal group-hover:text-white transition-colors">
                            {index + 1}
                          </div>
                          <p className="text-sm font-medium text-slate-700 mt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Guide / Application Link Section */}
                  <div className="pt-2">
                    <h3 className="text-xl font-extrabold text-gov-navy mb-4 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-gov-blue" />
                      Official Resources
                    </h3>
                    {aiGuidance.official_link !== "#" ? (
                      <a href={aiGuidance.official_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 shadow-soft hover:shadow-premium hover:-translate-y-0.5 rounded-xl text-sm font-bold text-gov-blue transition-all">
                        <ExternalLink className="w-4 h-4" />
                        {aiGuidance.official_link_label}
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-500">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        {aiGuidance.official_link_label}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-5">
              <CardTitle className="flex items-center gap-2 text-base font-extrabold text-gov-navy uppercase tracking-wider">
                <FileText className="w-4 h-4 text-slate-400" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              {compliance.documents && compliance.documents.length > 0 ? (
                <ul className="space-y-3">
                  {compliance.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-gov-teal mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(13,148,136,0.8)]" />
                      {doc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm font-medium text-slate-500">No specific documents listed.</p>
              )}
            </CardContent>
          </Card>

          <Link to="/tracker" className="block w-full">
            <Button variant="primary" className="w-full justify-between group py-3 shadow-premium hover:-translate-y-1">
              Update Status
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};