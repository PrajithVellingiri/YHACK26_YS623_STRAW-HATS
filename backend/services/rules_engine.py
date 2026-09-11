from sqlalchemy.orm import Session
from database.models import Compliance
from schemas.compliance import ComplianceGenerateRequest
from typing import List
from services.llm_service import generate_ai_compliances

def get_applicable_compliances(db: Session, business_data: ComplianceGenerateRequest) -> List[Compliance]:
    """
    AI-powered rule engine that dynamically generates applicable compliances
    based on the business profile.
    """
    ai_recommendations = generate_ai_compliances(
        business_name=business_data.business_name,
        sector=business_data.sector,
        state=business_data.state,
        business_size=business_data.business_size,
        business_stage=business_data.business_stage
    )
    
    applicable = []
    
    # Fallback to deterministic rules if AI fails
    if not ai_recommendations:
        query = db.query(Compliance)
        for comp in query.all():
            if comp.sector != "All" and comp.sector.lower() != business_data.sector.lower():
                continue
            if comp.state != "All" and comp.state.lower() != business_data.state.lower():
                continue
            if comp.business_size != "All" and comp.business_size.lower() != business_data.business_size.lower():
                continue
            applicable.append(comp)
        return applicable

    for rec in ai_recommendations:
        name = rec.get("Requirement Name", "Unknown Requirement")
        req_type = rec.get("Type", "License")
        authority = rec.get("Authority", "Relevant Authority")
        
        # Combine fields into the description
        applicability = rec.get("Applicability", "")
        why = rec.get("Why it may apply", "")
        conditions = rec.get("Conditions", "")
        next_step = rec.get("Next Step", "")
        
        desc = f"Applicability: {applicability}\nWhy: {why}\nConditions: {conditions}\nNext Step: {next_step}"
        
        # Check if it already exists to avoid duplicates
        existing_comp = db.query(Compliance).filter(
            Compliance.name == name,
            Compliance.sector == business_data.sector,
            Compliance.state == business_data.state
        ).first()
        
        if existing_comp:
            applicable.append(existing_comp)
        else:
            new_comp = Compliance(
                name=name,
                department=authority,
                requirement_type=req_type,
                description=desc,
                required_documents="Dependent on specific requirement",
                sector=business_data.sector,
                state=business_data.state,
                business_size=business_data.business_size
            )
            db.add(new_comp)
            db.commit()
            db.refresh(new_comp)
            applicable.append(new_comp)
            
    return applicable
