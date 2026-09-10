from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List

from database.database import get_db
from database.models import User, Business, Application, Compliance
from schemas.admin import (
    AdminDashboardStats,
    ComplianceCreate,
    ComplianceUpdate,
    ComplianceResponse
)

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Hackathon-friendly Authorization Dependency
def verify_admin(x_user_id: int = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Missing X-User-Id header for authorization")
        
    user = db.query(User).filter(User.id == x_user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    if user.role != "ADMIN":
        raise HTTPException(status_code=403, detail="Forbidden: Admin access required")
        
    return user

@router.get("/dashboard", response_model=AdminDashboardStats)
def get_admin_dashboard(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    total_businesses = db.query(Business).count()
    total_applications = db.query(Application).count()
    total_compliances = db.query(Compliance).count()
    
    submitted = db.query(Application).filter(Application.status == "SUBMITTED").count()
    under_review = db.query(Application).filter(Application.status == "UNDER_REVIEW").count()
    approved = db.query(Application).filter(Application.status == "APPROVED").count()
    
    return AdminDashboardStats(
        total_businesses=total_businesses,
        total_applications=total_applications,
        total_compliances=total_compliances,
        submitted=submitted,
        under_review=under_review,
        approved=approved
    )

@router.get("/compliances", response_model=List[ComplianceResponse])
def get_all_compliances(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    return db.query(Compliance).all()

@router.get("/compliances/{compliance_id}", response_model=ComplianceResponse)
def get_compliance(compliance_id: int, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    compliance = db.query(Compliance).filter(Compliance.id == compliance_id).first()
    if not compliance:
        raise HTTPException(status_code=404, detail="Compliance not found")
    return compliance

@router.post("/compliances", response_model=ComplianceResponse)
def create_compliance(request: ComplianceCreate, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    new_compliance = Compliance(
        name=request.name,
        sector=request.sector,
        state=request.state,
        business_size=request.business_size,
        department=request.department,
        requirement_type=request.requirement_type,
        description=request.description,
        required_documents=request.required_documents
    )
    db.add(new_compliance)
    db.commit()
    db.refresh(new_compliance)
    return new_compliance

@router.put("/compliances/{compliance_id}", response_model=ComplianceResponse)
def update_compliance(compliance_id: int, request: ComplianceUpdate, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    compliance = db.query(Compliance).filter(Compliance.id == compliance_id).first()
    if not compliance:
        raise HTTPException(status_code=404, detail="Compliance not found")
        
    compliance.name = request.name
    compliance.sector = request.sector
    compliance.state = request.state
    compliance.business_size = request.business_size
    compliance.department = request.department
    compliance.requirement_type = request.requirement_type
    compliance.description = request.description
    compliance.required_documents = request.required_documents
    
    db.commit()
    db.refresh(compliance)
    return compliance

@router.delete("/compliances/{compliance_id}")
def delete_compliance(compliance_id: int, db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    compliance = db.query(Compliance).filter(Compliance.id == compliance_id).first()
    if not compliance:
        raise HTTPException(status_code=404, detail="Compliance not found")
        
    db.delete(compliance)
    db.commit()
    
    return {"detail": "Compliance deleted successfully"}
