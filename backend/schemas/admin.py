from pydantic import BaseModel
from typing import Optional

class AdminDashboardStats(BaseModel):
    total_businesses: int
    total_applications: int
    total_compliances: int
    submitted: int
    under_review: int
    approved: int

class ComplianceBase(BaseModel):
    name: str
    sector: str
    state: str
    business_size: str
    department: str
    requirement_type: str
    description: str
    required_documents: str

class ComplianceCreate(ComplianceBase):
    pass

class ComplianceUpdate(ComplianceBase):
    pass

class ComplianceResponse(ComplianceBase):
    id: int

    class Config:
        from_attributes = True
