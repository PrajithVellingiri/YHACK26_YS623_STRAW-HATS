import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

def analyze_business_description(description: str) -> dict:
    """
    Job 1: Understand Business Description and extract structured fields.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "sector": "Food",
            "state": "Tamil Nadu",
            "business_size": "Small",
            "business_stage": "Starting"
        }
        
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    Analyze the following business description and extract these exact fields:
    - sector (e.g., Food, IT, Manufacturing, Retail)
    - state (The Indian state, e.g., Tamil Nadu, Maharashtra)
    - business_size (e.g., Micro, Small, Medium, Large)
    - business_stage (e.g., Starting, Expanding, Established)
    
    Business Description: "{description}"
    
    Return ONLY a valid JSON object with the keys: sector, state, business_size, business_stage.
    """
    try:
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=prompt,
        )
        
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
            
        return json.loads(text)
    except Exception as e:
        print(f"LLM Error: {e}")
        return {
            "sector": "Unknown",
            "state": "Unknown",
            "business_size": "Unknown",
            "business_stage": "Unknown"
        }

def explain_compliance(business_name: str, sector: str, compliance_name: str, compliance_desc: str) -> str:
    """
    Job 2: Explain why a compliance applies to this specific business.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return f"This compliance ({compliance_name}) is legally required for {sector} businesses like {business_name}."

    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are a helpful assistant for a business owner.
    Business Name: {business_name}
    Sector: {sector}
    Compliance Requirement: {compliance_name}
    Official Description: {compliance_desc}
    
    Explain simply in 2-3 sentences why this specific business needs this compliance.
    """
    try:
        response = client.models.generate_content(
            model='gemini-3.6-flash',
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        print(f"LLM Error: {e}")
        return f"This compliance is relevant to your {sector} business based on standard regulatory rules."
