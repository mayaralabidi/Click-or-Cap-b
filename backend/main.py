# pyre-ignore-all-errors[21]  # Pyre cannot see venv packages
import io
import zipfile
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend/ or project root
_backend_env = Path(__file__).resolve().parent / ".env"
if _backend_env.exists():
    load_dotenv(dotenv_path=_backend_env)
else:
    load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from backend.routers import decision, users

# Paths (project root relative to backend/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
FRONTEND_DIR = PROJECT_ROOT / "frontend"
EXTENSION_DIR = PROJECT_ROOT / "extension"

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


@app.get("/download/extension")
def download_extension():
    """Download the browser extension as a zip file (free option - no Chrome Web Store)."""
    if not EXTENSION_DIR.exists():
        raise HTTPException(status_code=404, detail="Extension folder not found")

    # Exclude unnecessary files
    exclude = {".git", "__pycache__", ".DS_Store", "node_modules", "test-page.html"}

    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as zf:
        for file_path in EXTENSION_DIR.rglob("*"):
            if file_path.is_file() and not any(p in file_path.parts for p in exclude):
                arcname = file_path.relative_to(EXTENSION_DIR)
                zf.write(file_path, arcname)

    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=click-or-cap-extension.zip"},
    )


# Serve frontend (index, image_analysis, dashboard) - mount last so API routes take precedence
if FRONTEND_DIR.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")
