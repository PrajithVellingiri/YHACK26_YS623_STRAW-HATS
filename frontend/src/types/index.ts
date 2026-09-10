export type BusinessStage = "Starting" | "Operating" | "Expanding";
export type BusinessSize = "Micro" | "Small" | "Medium" | "Large";
export type ApplicationStatus = "NOT_STARTED" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED";

export interface BusinessProfile {
  name: string;
  description: string;
  sector: string;
  state: string;
  businessSize: BusinessSize | string;
  businessStage: BusinessStage | string;
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  required: boolean;
  department: string;
  status: ApplicationStatus;
  description: string;
  whyNeeded?: string;
  documents: string[];
  steps?: string[];
  aiGuidance?: string;
}

export interface AnalyzeBusinessRequest {
  description: string;
  name?: string;
  sector?: string;
  state?: string;
  businessSize?: string;
  businessStage?: string;
}

export interface AnalyzeBusinessResponse {
  business: BusinessProfile;
  compliances: ComplianceRequirement[];
}

export interface ApplicationRecord {
  id: string;
  businessId: string;
  businessName: string;
  complianceId: string;
  complianceName: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface AdminStats {
  totalBusinesses: number;
  totalApplications: number;
  totalCompliances: number;
  statusDistribution: Record<ApplicationStatus, number>;
}

export interface OfficerStats {
  totalApplications: number;
  pendingReview: number;
  underReview: number;
  approved: number;
}
