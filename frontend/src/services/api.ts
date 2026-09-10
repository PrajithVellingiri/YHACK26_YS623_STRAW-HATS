import { BusinessProfile, ComplianceRequirement, AnalyzeBusinessRequest, AnalyzeBusinessResponse, ApplicationStatus } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const handleResponse = async (response: Response, defaultErrorMsg: string) => {
  if (!response.ok) {
    let errText = defaultErrorMsg;
    try {
      const errorData = await response.json();
      errText = errorData.detail || errorData.message || defaultErrorMsg;
    } catch {
      errText = "Server returned " + response.status + " error";
    }
    throw new Error(errText);
  }
  return response.json();
};

export const analyzeBusiness = async (
  request: AnalyzeBusinessRequest
): Promise<AnalyzeBusinessResponse> => {
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
  
  const businessData = await handleResponse(analyzeRes, "Failed to analyze business");

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
  
  const complianceData = await handleResponse(generateRes, "Failed to generate compliance requirements");

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
  
  const data = await handleResponse(response, "Failed to get guidance");
  return data.guidance;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  
  await handleResponse(response, "Failed to update status");
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

export const getOfficerApplications = async (): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/officer/applications`, {
    headers: getAuthHeaders()
  });
  
  const data = await handleResponse(response, "Failed to fetch officer applications");
  return data.map((d: any) => ({
    id: String(d.application_id),
    businessId: "N/A",
    businessName: d.business_name,
    complianceId: String(d.compliance_id),
    complianceName: d.compliance_name,
    status: d.status,
    submittedAt: d.submitted_at
  }));
};

export const getOfficerApplicationDetails = async (applicationId: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/officer/applications/${applicationId}`, {
    headers: getAuthHeaders()
  });
  
  return handleResponse(response, "Failed to fetch application details");
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
  
  await handleResponse(response, "Failed to update officer application status");
};

// --- ADMIN APIS ---

export const getAdminStats = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response, "Failed to fetch admin stats");
};

export const getAdminCompliances = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances`, {
    headers: getAuthHeaders()
  });
  return handleResponse(response, "Failed to fetch admin compliances");
};

export const createAdminCompliance = async (data: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Failed to create compliance");
};

export const updateAdminCompliance = async (id: number, data: any): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse(response, "Failed to update compliance");
};

export const deleteAdminCompliance = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/compliances/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    let errText = "Failed to delete compliance";
    try {
      const errorData = await response.json();
      errText = errorData.detail || errText;
    } catch {}
    throw new Error(errText);
  }
};

// --- AUTH APIS ---

export const signin = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response, "Sign in failed");
};

export const signup = async (userData: any) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(response, "Sign up failed");
};