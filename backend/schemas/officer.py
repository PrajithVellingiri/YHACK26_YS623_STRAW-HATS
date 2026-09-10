from pydantic import BaseModel
from typing import Optional

class ApplicationListResponse(BaseModel):
    application_id: int
    business_name: str
    compliance_name: str
    status: str

class BusinessInfo(BaseModel):
    name: str
    description: str
    sector: str
    state: str
    business_size: str
    business_stage: str

class ComplianceInfo(BaseModel):
    name: str
    department: str
    requirement_type: str
    description: str
    required_documents: str

class ApplicationInfo(BaseModel):
    id: int
    status: str

class ApplicationDetailResponse(BaseModel):
    business: BusinessInfo
    compliance: ComplianceInfo
    application: ApplicationInfo

class ApplicationStatusUpdateRequest(BaseModel):
    status: str
