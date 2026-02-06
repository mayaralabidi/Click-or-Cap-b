# pyre-ignore-all-errors[21]  # Pyre cannot see venv packages
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend/ or project root
_backend_env = Path(__file__).resolve().parent / ".env"
if _backend_env.exists():
    load_dotenv(dotenv_path=_backend_env)
else:
    load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.routers import decision, users

# Path to frontend folder (project root / frontend)
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "frontend"

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

# Include routers (must be before static mount)
app.include_router(decision.router, prefix="/decision", tags=["Decision Engine"])
app.include_router(users.router, prefix="/users", tags=["Users & Gamification"])

@app.get("/api")
def api_info():
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


@app.get("/health/ai")
def health_ai():
    """Check if Mistral API key is configured (does not expose the key)."""
    import os
    key = os.getenv("MISTRAL_API_KEY", "").strip()
    return {
        "mistral_configured": bool(key and key != "missing_key"),
        "hint": "Add MISTRAL_API_KEY to backend/.env (get key from console.mistral.ai)" if not key else "OK",
    }

# Serve frontend (index, image_analysis, dashboard) - mount last so API routes take precedence
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
