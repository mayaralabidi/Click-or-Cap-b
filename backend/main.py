# pyre-ignore-all-errors[21]  # Pyre cannot see venv packages  
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import decision, users

app = FastAPI(
    title="Click-or-Cap API",
    description="Backend for hate speech detection and gamification",
    version="1.0.0"
)

# CORS configuration - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(decision.router, prefix="/decision", tags=["Decision Engine"])
app.include_router(users.router, prefix="/users", tags=["Users & Gamification"])

@app.get("/")
def root():
    return {
        "message": "Click-or-Cap API",
        "status": "running",
        "endpoints": {
            "decision": "/decision",
            "users": "/users"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
