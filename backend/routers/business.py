from fastapi import APIRouter
from schemas.business import BusinessAnalyzeRequest, BusinessAnalyzeResponse
from services.llm_service import analyze_business_description

router = APIRouter(prefix="/api/business", tags=["business"])

@router.post("/analyze", response_model=BusinessAnalyzeResponse)
def analyze_business(request: BusinessAnalyzeRequest):
    # LLM extracts details from the description
    extracted_data = analyze_business_description(request.description)
    
    return BusinessAnalyzeResponse(
        business_name=request.business_name,
        sector=extracted_data.get("sector", request.sector or "Unknown"),
        state=extracted_data.get("state", request.state or "Unknown"),
        business_size=extracted_data.get("business_size", request.business_size or "Unknown"),
        business_stage=extracted_data.get("business_stage", request.business_stage or "Unknown")
    )
