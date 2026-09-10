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
        <h2 className="text-2xl font-bold text-text-main mb-2">Compliance not found</h2>
        <Link to="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-text-main mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-text-main">{compliance.name}</h1>
              {compliance.required ? (
                <Badge variant="red">Mandatory</Badge>
              ) : (
                <Badge variant="blue">Applicable</Badge>
              )}
            </div>
            <p className="text-xl text-text-muted">{compliance.description}</p>
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
                <BookOpen className="w-5 h-5 text-text-muted" />
                Why do you need this?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-main leading-relaxed mb-6">
                {compliance.whyNeeded}
              </p>

              {!aiGuidance && !isGuidanceLoading && !guidanceError && (
                <div className="bg-[#111] border border-border rounded-xl p-5 shadow-[0_0_15px_rgba(174,255,0,0.05)]">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1A1A1A] p-2 rounded-lg text-accent-green border border-border shadow-[0_0_10px_rgba(174,255,0,0.1)]">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main mb-1">Confused about this requirement?</h4>
                      <p className="text-text-muted text-sm mb-3">
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
                <div className="bg-[#111] border border-border rounded-xl p-6 text-center">
                  <Sparkles className="w-6 h-6 text-accent-green animate-spin mx-auto mb-3" />
                  <p className="text-text-main font-medium">Preparing a simple explanation...</p>
                </div>
              )}

              {guidanceError && (
                <div className="bg-[#1A0A0A] border border-[#331111] rounded-xl p-5 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#FF5500] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#FF5500] text-sm mb-2">{guidanceError}</p>
                    <Button onClick={handleGetGuidance} variant="outline" size="sm">Retry</Button>
                  </div>
                </div>
              )}

              {aiGuidance && (
                <div className="bg-[#111] border border-accent-green/30 rounded-xl p-6 relative overflow-hidden shadow-[0_0_20px_rgba(174,255,0,0.05)]">
                  <div className="absolute top-0 right-0 bg-[#1A1A1A] text-accent-green border-b border-l border-accent-green/30 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AI Guidance
                  </div>
                  <div className="flex items-start gap-3 mt-2">
                    <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">
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
                <ol className="relative border-l-2 border-border ml-3 space-y-6">
                  {compliance.steps.map((step, index) => (
                    <li key={index} className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-[#1A1A1A] border-2 border-accent-green rounded-full -left-4 ring-4 ring-background text-accent-green font-bold text-sm shadow-[0_0_10px_rgba(174,255,0,0.3)]">
                        {index + 1}
                      </span>
                      <div className="pt-1 text-text-main">
                        {step}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-text-muted italic">No specific steps available.</p>
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
