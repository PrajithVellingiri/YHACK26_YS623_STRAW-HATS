from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import business, compliance, applications
from database.database import engine, Base

# Ensure tables are created
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Compliance Platform API")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(business.router)
app.include_router(compliance.router)
app.include_router(applications.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Compliance Platform API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
