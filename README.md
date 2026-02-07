# Click or Cap — AI Hate Speech Fighter

An AI-powered browser extension and web app that detects hate speech, toxicity, and harmful content in text and images. Users earn points for positive actions and can access de-escalation tools.

---

## Features

- **Text & Image Detection** — Analyze content for hate speech using Mistral AI (text) and Pixtral (images)
- **Empathy Mirror** — Check drafts before posting and get kinder alternatives
- **De-Escalation Assistant** — Generate constructive replies (polite, educational, firm)
- **Content Hiding** — Auto-hide or warn on toxic content
- **Gamification** — Points, leaderboard, and badges for positive behavior
- **Hate Weather** — Global toxicity statistics

---

## Prerequisites

- **Python 3.10+**
- **Node.js** (optional, for alternative tooling)
- **Chrome** or Chromium-based browser
- **Mistral API key** — [Get one at console.mistral.ai](https://console.mistral.ai)

---

## Quick Start (5 minutes)

### Step 1: Clone & Enter Project

```powershell
cd c:\Users\labid\not-on-onedrive\click-or-cap
```

### Step 2: Create Virtual Environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

On macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3: Install Dependencies

```powershell
pip install fastapi uvicorn mistralai python-dotenv pydantic
```

Or from `requirements.txt` (if available):

```powershell
pip install -r requirements.txt
```

### Step 4: Configure API Key

Create or edit `backend/.env`:

```env
MISTRAL_API_KEY=your_key_here
```

Get a key from [console.mistral.ai](https://console.mistral.ai) → API Keys → Create.

### Step 5: Start the Server

```powershell
uvicorn backend.main:app --reload --port 8000
```

You should see:

```
Uvicorn running on http://127.0.0.1:8000
```

### Step 6: Open the App

In your browser, go to:

| Page | URL |
|------|-----|
| Home | http://localhost:8000/ |
| Dashboard | http://localhost:8000/dashboard.html |
| Image Analysis | http://localhost:8000/image_analysis.html |

---

## Tutorial: Step-by-Step Setup

### Part A: Backend Setup

#### 1.1 Install Python Dependencies

```powershell
pip install fastapi uvicorn mistralai python-dotenv pydantic
```

Core packages:
- **fastapi** — Web framework
- **uvicorn** — ASGI server
- **mistralai** — Mistral/Pixtral AI
- **python-dotenv** — Load `.env`
- **pydantic** — Validation

#### 1.2 Create `backend/.env`

```
backend/
└── .env
```

Content:

```env
MISTRAL_API_KEY=sk_xxxxxxxxxxxxxxxxxxxx
```

No spaces around `=`, no quotes. One key per line.

#### 1.3 Verify Backend

```powershell
uvicorn backend.main:app --reload --port 8000
```

### Part B: Web Frontend

#### 2.1 Access the App

With the server running, the frontend is served at `http://localhost:8000/`.

- **Landing**: http://localhost:8000/
- **Dashboard**: http://localhost:8000/dashboard
- **Image AI**: http://localhost:8000/image_analysis

#### 2.2 Test Text Analysis

1. Open **Dashboard**
2. Go to "AI Analysis"
3. Enter text (e.g. "I hate everyone here")
4. Click "Check Text"
5. Expect HIDE/WARN/ALLOW and score

#### 2.3 Test Image Analysis

1. Open **Image Analysis**
2. Upload an image (PNG or JPEG)
3. Click "Analyze Image"
4. Expect SAFE / WARNING / HIDE and score

---

### Part C: Browser Extension

#### 3.1 Load Extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Choose the `extension` folder in the project

```
click-or-cap/
└── extension/   ← select this folder
```

#### 3.2 Configure API URL

Ensure the backend runs on `http://localhost:8000`.

Edit `extension/content.js` if your API is elsewhere:

```javascript
const API_BASE_URL = 'http://localhost:8000';
```

#### 3.3 Use the Extension

- **Popup**: Click the extension icon for score and leaderboard
- **Content hiding**: Bad Words are hidden

---

## Project Structure

```
click-or-cap/
├── backend/                 # Python API
│   ├── main.py             # FastAPI app, static files
│   ├── core/
│   │   ├── ai.py           # Mistral/Pixtral
│   │   ├── config.py       # Env vars
│   │   └── models.py       # Pydantic
│   ├── routers/
│   │   ├── decision.py     # AI endpoints
│   │   └── users.py        # Gamification
│   └── .env                # API keys
├── frontend/               # Web UI
│   ├── index.html
│   ├── dashboard.html
│   └── image_analysis.html
├── extension/              # Chrome extension
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   └── ...
├── TECH_STACK.md           # Tech details
└── README.md               # This file
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/decision/engine` | Text toxicity analysis |
| POST | `/decision/analyze-image` | Image toxicity analysis |
| POST | `/decision/empathy-check` | Draft check |
| POST | `/decision/de-escalate` | Reply options |
| POST | `/users/action` | Log action, earn points |
| GET | `/users/leaderboard` | Top users |
| GET | `/users/weather` | Toxicity stats |

---

## Troubleshooting

### 401 Unauthorized (Image/Text Analysis)

- Check `MISTRAL_API_KEY` in `backend/.env`
- Confirm key is valid at [console.mistral.ai](https://console.mistral.ai)
- Restart the server after changing `.env`

### CORS Errors

- Use `http://localhost:8000` (not `file://`) for the frontend
- Backend serves the frontend at `/` when running

### Extension Not Working

- Backend must be running on port 8000
- Check `API_BASE_URL` in `content.js` and `popup.js`
- Inspect extension popup: right‑click → Inspect

### "MISTRAL_API_KEY not found"

- Ensure `backend/.env` exists
- Ensure no spaces: `MISTRAL_API_KEY=sk_xxx`
- Restart uvicorn

---

## Tech Stack (Summary)

- **Backend**: Python, FastAPI, Uvicorn
- **AI**: Mistral Small (text), Pixtral 12B (images)
- **Frontend**: HTML, CSS, JavaScript
- **Extension**: Manifest V3, Chrome APIs

See [TECH_STACK.md](TECH_STACK.md) for full details.

---

## License & Credits

Built for hackathon projects focused on fighting hate speech with AI. Uses Mistral AI for content analysis.
