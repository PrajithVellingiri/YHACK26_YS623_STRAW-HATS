from pydantic import BaseModel
from typing import List

class ComplianceGenerateRequest(BaseModel):
    business_name: str
    sector: str
    state: str
    business_size: str
    business_stage: str

class ComplianceItem(BaseModel):
    application_id: int
    compliance_id: int
    name: str
    department: str
    requirement_type: str
    description: str
    required_documents: List[str]
    status: str

class ComplianceGenerateResponse(BaseModel):
    business_id: int
    business_name: str
    compliances: List[ComplianceItem]

class ComplianceDetailResponse(BaseModel):
    id: int
    name: str
    department: str
    requirement_type: str
    description: str
    required_documents: List[str]

class GuidanceRequest(BaseModel):
    business_name: str
    sector: str
    state: str
    compliance_id: int

class GuidanceResponse(BaseModel):
    guidance: str
