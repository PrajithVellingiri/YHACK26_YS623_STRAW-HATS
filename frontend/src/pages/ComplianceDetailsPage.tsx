import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Building, CheckCircle2, FileText, Sparkles, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { ComplianceRequirement } from '../types';
import { getGuidance } from '../services/api';

export const ComplianceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [compliance, setCompliance] = useState<ComplianceRequirement | null>(null);
  const [aiGuidance, setAiGuidance] = useState<string | null>(null);
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{compliance.name}</h1>
              {compliance.required ? (
                <Badge variant="red">Mandatory</Badge>
              ) : (
                <Badge variant="blue">Applicable</Badge>
              )}
            </div>
            <p className="text-xl text-gray-600">{compliance.description}</p>
          </div>
          <div className="flex-shrink-0">
            <StatusBadge status={compliance.status} className="text-sm px-3 py-1.5" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                Why do you need this?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-6">
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
                  <p className="text-blue-900 font-medium">Preparing a simple explanation...</p>
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
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-blue-200 text-blue-800 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Guidance
                  </div>
                  <div className="flex items-start gap-3 mt-2">
                    <p className="text-blue-900 leading-relaxed text-sm whitespace-pre-wrap">
                      {aiGuidance}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
                Application Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              {compliance.steps && compliance.steps.length > 0 ? (
                <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                  {compliance.steps.map((step, index) => (
                    <li key={index} className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-600 rounded-full -left-4 ring-4 ring-white text-blue-600 font-bold text-sm">
                        {index + 1}
                      </span>
                      <div className="pt-1 text-gray-700">
                        {step}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 italic">No specific steps available.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building className="w-4 h-4 text-gray-400" />
                Department Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium text-gray-900">{compliance.department}</p>
              <p className="text-sm text-gray-500 mt-1">Responsible for issuing this approval.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4 text-gray-400" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {compliance.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Link to="/tracker" className="block w-full">
            <Button className="w-full">Update Status in Tracker</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
