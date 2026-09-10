from pydantic import BaseModel
from typing import Optional

class BusinessAnalyzeRequest(BaseModel):
    business_name: str
    description: str
    sector: Optional[str] = None
    state: Optional[str] = None
    business_size: Optional[str] = None
    business_stage: Optional[str] = None

class BusinessAnalyzeResponse(BaseModel):
    business_name: str
    sector: str
    state: str
    business_size: str
    business_stage: str
