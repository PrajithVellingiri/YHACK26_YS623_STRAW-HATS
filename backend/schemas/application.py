from pydantic import BaseModel

class ApplicationStatusUpdateRequest(BaseModel):
    status: str

class ApplicationStatusUpdateResponse(BaseModel):
    application_id: int
    status: str
