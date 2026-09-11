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
    - sector (Be highly specific! e.g., 'Small-scale Textile Manufacturing', 'Organic Food Bakery', 'B2B SaaS Startup'. Do NOT use generic terms like 'Manufacturing' if more detail is provided. This must capture the full operational context.)
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

def generate_ai_compliances(business_name: str, sector: str, state: str, business_size: str, business_stage: str) -> list:
    """
    Generate comprehensive AI compliance recommendations based on business context.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return []

    client = genai.Client(api_key=api_key)
    
    prompt = f"""
You are an expert business compliance consultant for businesses operating ONLY in INDIA 🇮🇳.
Analyze the following business and determine what compliance requirements could potentially apply to this specific business.

Business Name: {business_name}
Context / Sector Details: {sector}
State: {state} (India)
Size: {business_size}
Stage: {business_stage}

🛑 STRICT JURISDICTION RULE:
BizClear currently provides compliance guidance ONLY for businesses operating in India.
All recommendations, government authorities, regulatory bodies, licenses, registrations, approvals, NOCs, certificates, laws, and official websites MUST be relevant to India.
NEVER recommend United States regulations, FDA, US authorities, European regulations, UK regulations, or foreign compliance portals.
For Finance/FinTech: Prioritize Indian authorities like RBI, SEBI, IRDAI, PFRDA where relevant. Do not recommend US SEC, FINRA, etc.
For Food: Prioritize FSSAI, not FDA.
For Environment: Prioritize CPCB / State PCB, not EPA.

📍 INDIA → STATE → LOCAL HIERARCHY:
Evaluate requirements at the Central (Government of India) level, State level ({state}), and Local level (Municipality/Panchayat).

STEP 1 — UNDERSTAND THE BUSINESS
Analyze all available information, including business type, industry, scale, location, environmental impact, fire risk, etc.

STEP 2 — ANALYZE MULTIPLE COMPLIANCE CATEGORIES (INDIAN CONTEXT)
1. Business Foundation (e.g. MCA, Shop & Establishment)
2. Tax & Registrations (e.g. GST, PAN, TAN, Professional Tax)
3. MSME (e.g. Udyam)
4. Industry-Specific (e.g. FSSAI for food, RBI for fintech, CDSCO for pharma)
5. Local Authority (e.g. Trade License, Signboard License)
6. Environmental (e.g. Consent to Establish/Operate from State PCB)
7. Fire & Safety (e.g. Fire NOC)
8. Factory (e.g. Factory License under Factories Act, 1948)
9. Labour (e.g. EPF, ESI, Labour License)
10. NOCs and Approvals

STEP 3 — CLASSIFY RECOMMENDATIONS
Classify as: LIKELY REQUIRED, MAY BE REQUIRED, or RECOMMENDED / OPTIONAL.

IMPORTANT RULE ABOUT "NO REQUIREMENTS":
NEVER say "No certificates required." If no specific mandatory certificate is confidently identified, include a fallback: "No specific mandatory certificate was identified. However, your business may still need registrations, licenses, approvals, or NOCs depending on its location and operations in India."

REQUIRED OUTPUT STRUCTURE:
Return ONLY a valid JSON array of objects. Each object must have exactly these keys:
- "Requirement Name": string
- "Jurisdiction": string (e.g., India, or {state}, or Local)
- "Type": string (Registration / License / Approval / NOC / Certificate)
- "Applicability": string (LIKELY REQUIRED / MAY BE REQUIRED / RECOMMENDED / OPTIONAL)
- "Relevant Indian Authority": string (Mention the Indian authority when confidently known)
- "Why it may apply": string (Explain the connection to the business profile)
- "Conditions": string (Explain what determines whether it applies)
- "Next Step": string (Tell the user what to verify or do next in India)
- "Official Resource": string (Only provide an official Indian government/regulatory resource URL like .gov.in or .nic.in when confidently known. If unknown, return "#")

Do not include markdown formatting like ```json.
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
        print(f"LLM Error generating compliances: {e}")
        return []

def explain_compliance(business_name: str, sector: str, compliance_name: str, compliance_desc: str) -> dict:
    """
    Job 2: Explain why a compliance applies to this specific business, give steps, and provide an official link.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "why_needed": f"This compliance ({compliance_name}) is legally required for {sector} businesses like {business_name} to ensure standardized safety and regulatory adherence in India.",
            "steps_to_apply": [
                "Check eligibility requirements on the official Indian portal.",
                "Prepare all necessary identity and business documents.",
                "Fill out and submit the official application form.",
                "Track the application status through the regulatory portal."
            ],
            "official_link": "#",
            "official_link_label": "Official Guide / Apply Here (Verified link unavailable)"
        }

    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert compliance assistant for a business owner operating in INDIA 🇮🇳.
    Business Name: {business_name}
    Sector: {sector}
    Compliance Requirement: {compliance_name}
    Official Description: {compliance_desc}
    
    🛑 STRICT JURISDICTION RULE:
    You must ONLY provide information relevant to INDIA. 
    Never recommend US laws, FDA, SEC, European laws, or any foreign government portals.
    Only recommend official Indian government sources (e.g. .gov.in, .nic.in) or Indian statutory bodies (RBI, SEBI, FSSAI, etc.).
    
    Return ONLY a valid JSON object with the following keys:
    1. "why_needed": Explain specifically why this business needs this compliance in India, what risk it avoids, and its business importance. (Target exactly 40-60 words).
    2. "steps_to_apply": A list of strings containing 4-8 practical, compliance-specific numbered steps to apply in India.
    3. "official_link": A verified official Indian government/department URL to apply or read guidelines. DO NOT hallucinate URLs. If you cannot verify an exact Indian URL, return "#".
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