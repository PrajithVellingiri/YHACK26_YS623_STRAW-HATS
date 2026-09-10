import {
  AnalyzeBusinessRequest,
  AnalyzeBusinessResponse,
  ApplicationStatus,
} from "../types";
import { MOCK_BUSINESS, MOCK_COMPLIANCES } from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const USE_MOCK = true; // Toggle this when ready to integrate with FastAPI

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyzeBusiness = async (
  request: AnalyzeBusinessRequest
): Promise<AnalyzeBusinessResponse> => {
  if (USE_MOCK) {
    await delay(2000); // Simulate API call
    return {
      business: {
        ...MOCK_BUSINESS,
        ...request,
      },
      compliances: MOCK_COMPLIANCES,
    };
  }

  const response = await fetch(`${API_BASE_URL}/business/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });
  if (!response.ok) throw new Error("Failed to analyze business");
  return response.json();
};

export const getGuidance = async (complianceId: string): Promise<string> => {
  if (USE_MOCK) {
    await delay(1500);
    const compliance = MOCK_COMPLIANCES.find((c) => c.id === complianceId);
    if (!compliance) throw new Error("Compliance not found");
    
    return `AI Guidance: Your business requires the ${compliance.name} because it involves specific regulated activities. According to standard operating procedures, failure to obtain this may result in penalties. We recommend applying through the ${compliance.department} immediately after your business registration is complete.`;
  }

  const response = await fetch(`${API_BASE_URL}/compliance/guidance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ complianceId }),
  });
  if (!response.ok) throw new Error("Failed to get guidance");
  const data = await response.json();
  return data.guidance;
};

export const updateApplicationStatus = async (
  complianceId: string,
  status: ApplicationStatus
): Promise<void> => {
  if (USE_MOCK) {
    await delay(1000);
    return;
  }

  const response = await fetch(`${API_BASE_URL}/applications/${complianceId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update status");
};
