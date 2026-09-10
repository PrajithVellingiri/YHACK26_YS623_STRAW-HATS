from fastapi import APIRouter
from schemas.business import BusinessAnalyzeRequest, BusinessAnalyzeResponse
from services.llm_service import analyze_business_description

router = APIRouter(prefix="/api/business", tags=["business"])

@router.post("/analyze", response_model=BusinessAnalyzeResponse)
def analyze_business(request: BusinessAnalyzeRequest):
    # LLM extracts details from the description — user-submitted values take priority
    extracted_data = analyze_business_description(request.description)

    def pick(extracted_val, submitted_val):
        # Use extracted if it's meaningful, otherwise fall back to submitted
        if extracted_val and extracted_val.lower() not in ("unknown", ""):
            return extracted_val
        return submitted_val or "Unknown"

    return BusinessAnalyzeResponse(
        business_name=request.business_name,
        sector=pick(extracted_data.get("sector"), request.sector),
        state=pick(extracted_data.get("state"), request.state),
        business_size=pick(extracted_data.get("business_size"), request.business_size),
        business_stage=pick(extracted_data.get("business_stage"), request.business_stage)
    )
