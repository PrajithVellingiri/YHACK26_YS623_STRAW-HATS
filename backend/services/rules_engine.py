from sqlalchemy.orm import Session
from database.models import Compliance
from schemas.compliance import ComplianceGenerateRequest
from typing import List

def get_applicable_compliances(db: Session, business_data: ComplianceGenerateRequest) -> List[Compliance]:
    """
    Deterministic rule engine that checks the master compliance dataset
    against the business profile based on explicit rules.
    """
    query = db.query(Compliance)
    all_compliances = query.all()
    
    applicable = []
    for comp in all_compliances:
        # Check Sector
        if comp.sector != "All" and comp.sector.lower() != business_data.sector.lower():
            continue
            
        # Check State
        if comp.state != "All" and comp.state.lower() != business_data.state.lower():
            continue
            
        # Check Business Size
        if comp.business_size != "All" and comp.business_size.lower() != business_data.business_size.lower():
            continue
            
        applicable.append(comp)
        
    return applicable
