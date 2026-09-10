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
            model='gemini-3.1-flash-lite',
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

def explain_compliance(business_name: str, sector: str, compliance_name: str, compliance_desc: str) -> dict:
    """
    Job 2: Explain why a compliance applies to this specific business, give steps, and provide an official link.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "why_needed": f"This compliance ({compliance_name}) is legally required for {sector} businesses like {business_name} to ensure standardized safety and regulatory adherence.",
            "steps_to_apply": [
                "Check eligibility requirements on the official portal.",
                "Prepare all necessary identity and business documents.",
                "Fill out and submit the official application form.",
                "Track the application status through the regulatory portal."
            ],
            "official_link": "#",
            "official_link_label": "Official Guide / Apply Here (Verified link unavailable)"
        }

    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are a helpful assistant for a business owner.
    Business Name: {business_name}
    Sector: {sector}
    Compliance Requirement: {compliance_name}
    Official Description: {compliance_desc}
    
    Return ONLY a valid JSON object with the following keys:
    1. "why_needed": Explain specifically why this business needs this compliance, what risk it avoids, and its business importance. (Target exactly 40-60 words).
    2. "steps_to_apply": A list of strings containing 4-8 practical, compliance-specific numbered steps to apply.
    3. "official_link": A verified official government/department URL to apply or read guidelines. DO NOT hallucinate. If you cannot verify an exact URL, use a general department portal or return "#".
    4. "official_link_label": "Official Guide / Apply Here" (or add "(Link unavailable)" if you returned "#").
    
    Output ONLY JSON. Do not include markdown formatting like ```json.
    """
    try:
        response = client.models.generate_content(
            model='gemini-3.1-flash-lite',
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
            "why_needed": f"This compliance ({compliance_name}) is a critical regulatory requirement for your {sector} business to operate legally and maintain compliance.",
            "steps_to_apply": [
                "Review the official documentation.",
                "Gather required documents.",
                "Submit the application form.",
                "Monitor your application status."
            ],
            "official_link": "#",
            "official_link_label": "Official Guide (Link unavailable)"
        }