import {
  AnalyzeBusinessRequest,
  AnalyzeBusinessResponse,
  ApplicationStatus,
  BusinessProfile,
  ComplianceRequirement
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const analyzeBusiness = async (
  request: AnalyzeBusinessRequest
): Promise<AnalyzeBusinessResponse> => {
  // Step 1: Analyze business
  const analyzeRes = await fetch(`${API_BASE_URL}/business/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      business_name: request.name || "My Business",
      description: request.description,
      sector: request.sector,
      state: request.state,
      business_size: request.businessSize,
      business_stage: request.businessStage
    }),
  });
  if (!analyzeRes.ok) throw new Error("Failed to analyze business");
  const businessData = await analyzeRes.json();

  // Step 2: Generate compliance checklist
  const generateRes = await fetch(`${API_BASE_URL}/compliance/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      business_name: businessData.business_name,
      sector: businessData.sector,
      state: businessData.state,
      business_size: businessData.business_size,
      business_stage: businessData.business_stage
    }), 
  });
  if (!generateRes.ok) throw new Error("Failed to generate compliance");
  const complianceData = await generateRes.json();

  // Map to frontend types
  const mappedBusiness: BusinessProfile = {
    name: businessData.business_name,
    description: request.description,
    sector: businessData.sector,
    state: businessData.state,
    businessSize: businessData.business_size,
    businessStage: businessData.business_stage
  };

  const mappedCompliances: ComplianceRequirement[] = complianceData.compliances.map((c: any) => ({
    id: String(c.application_id), 
    compliance_id: c.compliance_id,
    name: c.name,
    required: c.requirement_type === "Required",
    department: c.department,
    status: c.status,
    description: c.description,
    whyNeeded: c.description, // Fallback if no specific "why"
    documents: c.required_documents || []
  }));

  return {
    business: mappedBusiness,
    compliances: mappedCompliances,
  };
};

export const getGuidance = async (complianceIdStr: string): Promise<string> => {
  // We need to fetch from localStorage to send business context to backend
  const storedBusiness = localStorage.getItem('businessProfile');
  const storedCompliances = localStorage.getItem('compliances');
  
  if (!storedBusiness || !storedCompliances) {
     throw new Error("Business data missing from local storage.");
  }
  
  const business = JSON.parse(storedBusiness);
  const compliances = JSON.parse(storedCompliances);
  const compliance = compliances.find((c: any) => c.id === complianceIdStr);
  
  if (!compliance) {
     throw new Error("Compliance not found");
  }

  const response = await fetch(`${API_BASE_URL}/compliance/guidance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      business_name: business.name,
      sector: business.sector,
      state: business.state,
      compliance_id: compliance.compliance_id
    }),
  });
  if (!response.ok) throw new Error("Failed to get guidance");
  const data = await response.json();
  return data.guidance;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update status");
};
