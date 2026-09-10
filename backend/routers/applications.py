from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Application
from schemas.application import ApplicationStatusUpdateRequest, ApplicationStatusUpdateResponse

router = APIRouter(prefix="/api/applications", tags=["applications"])

@router.patch("/{application_id}/status", response_model=ApplicationStatusUpdateResponse)
def update_application_status(application_id: int, request: ApplicationStatusUpdateRequest, db: Session = Depends(get_db)):
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    app.status = request.status
    db.commit()
    db.refresh(app)
    
    return ApplicationStatusUpdateResponse(
        application_id=app.id,
        status=app.status
    )
