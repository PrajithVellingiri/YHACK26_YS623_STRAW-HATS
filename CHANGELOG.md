# Project Changelog

## Current Version / Development Status

Status: Core Citizen/User MVP Implemented

This document reflects the exact repository state as of the current hackathon milestone.

====================================================================
## STATUS LEGEND
====================================================================

✅ WORKING / VERIFIED
⚠️ IMPLEMENTED BUT NOT FULLY TESTED
🟡 PARTIALLY IMPLEMENTED
❌ NOT IMPLEMENTED

---

## Implemented Features

### Frontend
- **Landing Page**: React component displaying project overview.
- **Business Intake**: Form capturing Business Name, Description, Sector, State, Size, and Stage.
- **Compliance Dashboard**: UI displaying generated compliance checklist and requirement statuses.
- **Compliance Details**: Detailed view of specific compliance rules and required documents.
- **Status Tracking UI**: UI allowing the user to update their application status.
- **API Integrations**: Fully wired to real backend endpoints in `api.ts`, cleanly separating business analysis from compliance generation.

### Backend
- **FastAPI Core**: Server established with CORS configuration.
- **LLM Integration (`llm_service.py`)**: Prompts configured for extracting structured business data and generating human-friendly compliance guidance. Contains fallback mock mechanisms.
- **Rules Engine (`rules_engine.py`)**: Deterministic python-based logic filtering compliances based on State, Sector, and Size parameters without AI hallucination risks.
- **Compliance Generation**: Logic to map a business to applicable records and create initial Application trackers.
- **Application Tracking**: Endpoints to persist and update `NOT_STARTED`, `SUBMITTED`, `UNDER_REVIEW`, `APPROVED` statuses.

### Citizen / General User Module

Status: ✅ WORKING / VERIFIED

The primary workflow for a citizen/business owner to input details, see required compliances, understand why they need them via AI, and track their application progress is implemented and wired.

---

## Database Status

Status: ⚠️ IMPLEMENTED BUT NOT FULLY TESTED

- **Technology**: SQLite via SQLAlchemy ORM.
- **Models/Tables**: 
  - `businesses` (Stores submitted business profiles)
  - `compliances` (Master reference table of regulations)
  - `applications` (Join table tracking the progress of a business on a specific compliance)
- **Initialization**: Automatic table creation on startup.
- **Seed Data**: A seed script (`seed.py`) populates the database with basic testing compliances (FSSAI, Shop & Establishment, GST, Fire Safety).
- **Testing State**: The tables and foreign keys are structured correctly and basic CRUD operations occur during the user flow, but extensive end-to-end edge case persistence, cascading deletes, and load testing have not yet been formally verified.

---

## Authentication Status

Status: ❌ NOT IMPLEMENTED

- No user login system exists.
- No signup system exists.
- No role-based access control (RBAC) or session management exists.
- Currently, local storage is used on the frontend to persist sessions temporarily for the hackathon MVP.

---

## Officer Module Status

Status: ❌ NOT IMPLEMENTED

- No interfaces or APIs exist for government officers to log in, review submitted applications, or officially approve them.

---

## Admin Module Status

Status: ❌ NOT IMPLEMENTED

- No admin dashboard or APIs exist to manage the master `compliances` dataset, view platform analytics, or manage users.

---

## API Status

All APIs listed below exist, are wired in the backend routers, and are integrated into the frontend client.

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/business/analyze` | POST | Extracts structured business data from natural text | ✅ WORKING |
| `/api/compliance/generate` | POST | Runs rule engine & creates applications | ✅ WORKING |
| `/api/compliance/{id}` | GET | Returns static details for one compliance | ✅ WORKING |
| `/api/compliance/guidance` | POST | Generates LLM explanations for a compliance requirement | ✅ WORKING |
| `/api/applications/{id}/status` | PATCH | Updates tracking status of an application | ✅ WORKING |

---

## Current Working Flow

Citizen/User
↓
Business Information Input ✅ VERIFIED WORKING
↓
Business Analysis (LLM Extraction) ✅ VERIFIED WORKING
↓
Rule-Based Compliance Detection ✅ VERIFIED WORKING
↓
Compliance Results Dashboard ✅ VERIFIED WORKING
↓
Compliance Details / AI Guidance ✅ VERIFIED WORKING
↓
Application Status Tracking ⚠️ IMPLEMENTED BUT NOT FULLY TESTED (Persistence unverified edge cases)

---

## Known Limitations

- **Database not fully tested**: Edge cases and concurrent writes untested.
- **No authentication**: Anyone can access the system; identity is not securely verified.
- **No Officer Module**: Status updates are "self-reported" by the user currently since no officer portal exists to officially process them.
- **No Admin Module**: The compliance dataset is currently hardcoded via the database seeder and cannot be managed via UI.
- **Ephemeral Sessions**: Frontend loses state if local storage is cleared.

---

## Pending Work

### High Priority Remaining Work
- Formalize Database Tests
- Implement Authentication & User Accounts
- Secure API endpoints behind authorization tokens

### Future Modules
- Officer Module (Application review and approval workflows)
- Admin Module (Platform configuration, Master Dataset management, Analytics)
- Real-time notifications (Email/SMS)

---

## Architecture Status

The current repository follows the intended strict separation of concerns perfectly:

Frontend (React + Vite) → FastAPI Backend → Rules Engine / LLM (Gemini) → SQLite Database.

- LLM is correctly isolated to Understand/Explain workflows.
- Rules Engine securely handles the Compliance determination.

---

## Testing Status

### Verified
✅ Frontend UI routing and state management (MVP flow).
✅ Backend FastAPI startup and CORS routing.
✅ API request/response format matching between React and FastAPI.
✅ LLM Fallback and prompt extraction logic.
✅ Rule engine deterministic filtering.

### Not Yet Verified
⚠️ SQLite database edge-cases, data durability, and concurrent session tracking.

### Not Implemented
❌ Authentication / Security
❌ Officer side features
❌ Admin side features
