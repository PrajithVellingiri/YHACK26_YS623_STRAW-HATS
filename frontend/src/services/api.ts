import {
  AnalyzeBusinessRequest,
  AnalyzeBusinessResponse,
  ApplicationStatus,
  BusinessProfile,
  ComplianceRequirement,
  ApplicationRecord
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
    whyNeeded: c.description,
    documents: Array.isArray(c.required_documents) ? c.required_documents : []
  }));

  return { business: mappedBusiness, compliances: mappedCompliances };
};

export const getGuidance = async (complianceIdStr: string): Promise<string> => {
  const storedBusiness = localStorage.getItem("businessProfile");
  const storedCompliances = localStorage.getItem("compliances");

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

// --- AUTH HELPER ---

const getAuthHeaders = (): Record<string, string> => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new Error("Authentication required. Please log in.");
  }
  try {
    const user = JSON.parse(userStr);
    if (!user || !user.id) throw new Error("Invalid user session.");
    return { 
      "Content-Type": "application/json",
      "X-User-Id": String(user.id) 
    };
  } catch (e) {
    throw new Error("Invalid user session.");
  }
};

// --- OFFICER APIS ---

export const getOfficerApplications = async (): Promise<ApplicationRecord[]> => {
  const response = await fetch(`${API_BASE_URL}/officer/applications`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to fetch officer applications");
  const data = await response.json();
  return data.map((d: any) => ({
    id: String(d.application_id),
    businessId: "N/A",
    businessName: d.business_name,
    complianceId: "N/A",
    complianceName: d.compliance_name,
    status: d.status,
    submittedAt: new Date().toISOString()
  }));
};

export const getOfficerApplicationDetails = async (applicationId: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/officer/applications/${applicationId}`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to fetch application details");
  return response.json();
};

export const updateOfficerApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/officer/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update officer application status");
};

// --- ADMIN APIS ---

export const getAdminStats = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to fetch admin stats");
  return response.json();
};

export const getAdminCompliances = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances`, {
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to fetch admin compliances");
  return response.json();
};

export const createAdminCompliance = async (data: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create compliance");
  return response.json();
};

export const updateAdminCompliance = async (id: number, data: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update compliance");
  return response.json();
};

export const deleteAdminCompliance = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error("Failed to delete compliance");
};

// --- AUTH APIS ---

export const signin = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Sign in failed");
  }
  return response.json();
};

export const signup = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Sign up failed");
  }
  return response.json();
};
