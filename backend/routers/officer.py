from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database.database import get_db
from database.models import Application, Business, Compliance
from schemas.officer import (
    ApplicationListResponse,
    ApplicationDetailResponse,
    ApplicationStatusUpdateRequest,
    BusinessInfo,
    ComplianceInfo,
    ApplicationInfo
)

router = APIRouter(prefix="/api/officer", tags=["officer"])

from fastapi import Header
from database.models import User

def verify_officer(x_user_id: int = Header(None), db: Session = Depends(get_db)):
    if not x_user_id:
        raise HTTPException(status_code=401, detail="Missing X-User-Id header for authorization")
        
    user = db.query(User).filter(User.id == x_user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    if user.role != "OFFICER":
        raise HTTPException(status_code=403, detail="Forbidden: Officer access required")
        
    return user

@router.get("/applications", response_model=List[ApplicationListResponse])
def get_all_applications(db: Session = Depends(get_db), officer: User = Depends(verify_officer)):
    # Fetch all applications joined with Business and Compliance
    applications = db.query(Application, Business, Compliance).join(
        Business, Application.business_id == Business.id
    ).join(
        Compliance, Application.compliance_id == Compliance.id
    ).all()

    result = []
    for app, biz, comp in applications:
        result.append(ApplicationListResponse(
            application_id=app.id,
            business_name=biz.name,
            compliance_name=comp.name,
            status=app.status
        ))

    return result

@router.get("/applications/{application_id}", response_model=ApplicationDetailResponse)
def get_application_details(application_id: int, db: Session = Depends(get_db), officer: User = Depends(verify_officer)):
    record = db.query(Application, Business, Compliance).join(
        Business, Application.business_id == Business.id
    ).join(
        Compliance, Application.compliance_id == Compliance.id
    ).filter(Application.id == application_id).first()

    if not record:
        raise HTTPException(status_code=404, detail="Application not found")

    app, biz, comp = record

    return ApplicationDetailResponse(
        business=BusinessInfo(
            name=biz.name,
            description=biz.description or "",
            sector=biz.sector,
            state=biz.state,
            business_size=biz.business_size,
            business_stage=biz.business_stage
        ),
        compliance=ComplianceInfo(
            name=comp.name,
            department=comp.department,
            requirement_type=comp.requirement_type,
            description=comp.description or "",
            required_documents=comp.required_documents or ""
        ),
        application=ApplicationInfo(
            id=app.id,
            status=app.status
        )
    )

@router.patch("/applications/{application_id}/status")
def update_application_status(
    application_id: int, 
    request: ApplicationStatusUpdateRequest, 
    db: Session = Depends(get_db),
    officer: User = Depends(verify_officer)
):
    valid_statuses = ["NOT_STARTED", "SUBMITTED", "UNDER_REVIEW", "APPROVED"]
    if request.status not in valid_statuses:
        raise HTTPException(status_code=400, detail="Invalid status")

    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    app.status = request.status
    db.commit()
    db.refresh(app)

    return {
        "application_id": app.id,
        "status": app.status
    }
