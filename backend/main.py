from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import business, compliance, applications, auth, officer, admin
from database.database import engine, Base
import os

# Ensure tables are created
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Compliance Platform API")

# Configure CORS dynamically
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", 
    "http://localhost:5173,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(business.router)
app.include_router(compliance.router)
app.include_router(applications.router)
app.include_router(auth.router)
app.include_router(officer.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Compliance Platform API"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    # Note: reload=True is generally for dev. In prod it will just run normally if invoked via gunicorn or uvicorn directly.
    uvicorn.run("main:app", host="0.0.0.0", port=port)