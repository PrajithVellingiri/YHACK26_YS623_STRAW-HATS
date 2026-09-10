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
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compliance not found</h2>
        <Link to="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{compliance.name}</h1>
          <div className="flex items-center gap-3">
            <Badge variant="blue">{compliance.department}</Badge>
            {compliance.required && <Badge variant="red">Mandatory</Badge>}
            <StatusBadge status={compliance.status} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-400" />
                Why do we need this?
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm mb-6">
                {compliance.whyNeeded}
              </p>

              {!aiGuidance && !isGuidanceLoading && !guidanceError && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Confused about this requirement?</h4>
                      <p className="text-blue-800 text-sm mb-3">
                        Our AI can explain exactly why this applies to your specific business and what it means for you in simple terms.
                      </p>
                      <Button onClick={handleGetGuidance} variant="primary" size="sm">
                        Explain This to Me
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {isGuidanceLoading && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                  <Sparkles className="w-6 h-6 text-blue-600 animate-spin mx-auto mb-3" />
                  <p className="text-blue-900 font-medium">Preparing a simple explanation & steps...</p>
                </div>
              )}

              {guidanceError && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 text-sm mb-2">{guidanceError}</p>
                    <Button onClick={handleGetGuidance} variant="outline" size="sm">Retry</Button>
                  </div>
                </div>
              )}

              {aiGuidance && (
                <div className="space-y-6">
                  {/* AI Explanation Section */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Insight
                    </div>
                    <div className="flex items-start gap-3 mt-2">
                      <p className="text-blue-900 leading-relaxed text-sm">
                        {aiGuidance.why_needed}
                      </p>
                    </div>
                  </div>

                  {/* Steps to Apply Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Steps to Apply
                    </h3>
                    <div className="space-y-3">
                      {aiGuidance.steps_to_apply?.map((step, index) => (
                        <div key={index} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Guide / Application Link Section */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-gray-400" />
                      Official Resources
                    </h3>
                    {aiGuidance.official_link !== "#" ? (
                      <a href={aiGuidance.official_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        {aiGuidance.official_link_label}
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4 text-gray-400" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {compliance.documents && compliance.documents.length > 0 ? (
                <ul className="space-y-3">
                  {compliance.documents.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No specific documents listed.</p>
              )}
            </CardContent>
          </Card>

          <Link to="/tracker" className="block w-full">
            <Button variant="primary" className="w-full justify-between group">
              Update Status
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};