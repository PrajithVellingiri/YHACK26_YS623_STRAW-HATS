from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Business, Application, Compliance
from schemas.compliance import (
    ComplianceGenerateRequest, 
    ComplianceGenerateResponse,
    ComplianceItem,
    ComplianceDetailResponse,
    GuidanceRequest,
    GuidanceResponse
)
from services.rules_engine import get_applicable_compliances
from services.llm_service import explain_compliance

router = APIRouter(prefix="/api/compliance", tags=["compliance"])

@router.post("/generate", response_model=ComplianceGenerateResponse)
def generate_compliance(request: ComplianceGenerateRequest, db: Session = Depends(get_db)):
    # 1. Store the business record
    new_business = Business(
        name=request.business_name,
        sector=request.sector,
        state=request.state,
        business_size=request.business_size,
        business_stage=request.business_stage
    )
    db.add(new_business)
    db.commit()
    db.refresh(new_business)
    
    # 2. Get applicable compliances via Rule Engine
    applicable_compliances = get_applicable_compliances(db, request)
    
    # 3. Create applications for these compliances
    compliance_items = []
    for comp in applicable_compliances:
        new_app = Application(
            business_id=new_business.id,
            compliance_id=comp.id,
            status="NOT_STARTED"
        )
        db.add(new_app)
        db.commit()
        db.refresh(new_app)
        
        required_docs = comp.required_documents.split(",") if comp.required_documents else []
        
        compliance_items.append(
            ComplianceItem(
                application_id=new_app.id,
                compliance_id=comp.id,
                name=comp.name,
                department=comp.department,
                requirement_type=comp.requirement_type,
                description=comp.description,
                required_documents=required_docs,
                status=new_app.status
            )
        )
        
    return ComplianceGenerateResponse(
        business_id=new_business.id,
        business_name=new_business.name,
        compliances=compliance_items
    )

@router.get("/{compliance_id}", response_model=ComplianceDetailResponse)
def get_compliance_details(compliance_id: int, db: Session = Depends(get_db)):
    comp = db.query(Compliance).filter(Compliance.id == compliance_id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Compliance not found")
        
    required_docs = comp.required_documents.split(",") if comp.required_documents else []
    
    return ComplianceDetailResponse(
        id=comp.id,
        name=comp.name,
        department=comp.department,
        requirement_type=comp.requirement_type,
        description=comp.description,
        required_documents=required_docs
    )

@router.post("/guidance", response_model=GuidanceResponse)
def get_guidance(request: GuidanceRequest, db: Session = Depends(get_db)):
    comp = db.query(Compliance).filter(Compliance.id == request.compliance_id).first()
    if not comp:
        raise HTTPException(status_code=404, detail="Compliance not found")
        
    guidance_text = explain_compliance(
        business_name=request.business_name,
        sector=request.sector,
        compliance_name=comp.name,
        compliance_desc=comp.description
    )
    
    return GuidanceResponse(guidance=guidance_text)
