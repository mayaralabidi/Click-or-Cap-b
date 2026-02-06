# Click or Cap — Tech Stack & Architecture

## Overview

Click or Cap is an AI-powered hate speech detection system consisting of:
- **Backend API** (Python/FastAPI)
- **Web Frontend** (HTML/CSS/JavaScript)
- **Browser Extension** (Chrome/Manifest V3)
- **AI Models** (Mistral & Pixtral via API)

---

## 1. Backend

### Framework & Server

| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.10+ | Runtime |
| **FastAPI** | 0.128+ | Async REST API framework |
| **Uvicorn** | 0.40+ | ASGI server |
| **Pydantic** | 2.x | Request/response validation |

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `mistralai` | Mistral AI SDK for text (Mistral Small) and image (Pixtral) models |
| `python-dotenv` | Load environment variables from `.env` |
| `uvicorn` | Run the ASGI application |

### Project Structure

```
backend/
├── main.py           # FastAPI app, CORS, static files, routers
├── core/
│   ├── ai.py         # Mistral/Pixtral integration (analyze_toxicity, analyze_image)
│   ├── config.py     # Environment variables (Supabase, API keys)
│   └── models.py     # Pydantic request/response models
├── routers/
│   ├── decision.py   # /decision/* — AI decision engine, empathy, de-escalation
│   └── users.py      # /users/* — Gamification, leaderboard, points
└── .env              # MISTRAL_API_KEY (required)
```

### API Design

- **REST** over HTTP/JSON
- **Async** handlers for non-blocking AI calls
- **CORS** enabled for all origins (development)
- **Static files** served from `frontend/` at `/`

---

## 2. AI / Machine Learning

### Models Used

| Model | Provider | Purpose |
|-------|----------|---------|
| **Mistral Small** (`mistral-small-latest`) | Mistral AI | Text toxicity analysis, civilized rewrites, de-escalation options |
| **Pixtral 12B** (`pixtral-12b-2409`) | Mistral AI | Image analysis (hate symbols, offensive imagery) |

### AI Flow

1. **Text → Mistral Small**: Structured prompt returns `Rating: 0-100` and `Reason: ...`
2. **Image → Pixtral**: Base64 or URL sent; model returns toxicity rating and explanation
3. **Score bands**:
   - 0–29: ALLOW
   - 30–69: WARN
   - 70–100: HIDE

### API Key

- Required: `MISTRAL_API_KEY` in `backend/.env`
- Source: [console.mistral.ai](https://console.mistral.ai)

---

## 3. Frontend

### Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure |
| **CSS3** | Styling (custom properties, gradients, Flexbox/Grid) |
| **Vanilla JavaScript** | Fetch API, DOM manipulation |
| **Google Fonts (Space Grotesk)** | Typography |

### Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Landing page, feature overview |
| `dashboard.html` | `/dashboard.html` | AI Analysis, Empathy Mirror, De-escalator, Hate Weather |
| `image_analysis.html` | `/image_analysis.html` | Image upload & toxicity analysis |

### Features

- **Dashboard**: Text analysis, empathy check, de-escalation reply generation
- **Image Analysis**: File upload → base64 → API → score + action (HIDE/WARN/ALLOW)

---

## 4. Browser Extension

### Manifest

| Field | Value |
|-------|-------|
| **Manifest Version** | 3 |
| **Platform** | Chrome (Chromium-based browsers) |
| **Permissions** | `activeTab`, `storage`, `host_permissions: <all_urls>` |

### Components

| File | Role |
|------|------|
| `manifest.json` | Extension metadata, permissions, scripts |
| `background.js` | Service worker (background tasks) |
| `content.js` | Injected into pages — scans content, empathy mirror |
| `content.css` | Styles for hidden/warning overlays |
| `popup.html` / `popup.js` | Extension popup — score, leaderboard link |

### Content Script Flow

1. **Page load**: Initialize user ID from `chrome.storage`
2. **DOM scan**: Find `p`, `div`, `span`, `h1`–`h3`, `article`
3. **Per element**: Call `/decision/engine` with text → HIDE/WARN/ALLOW
4. **Empathy mirror**: Attach to `textarea`, `input[type="text"]` → debounced `/decision/empathy-check`
5. **MutationObserver**: Watch for new DOM nodes, re-scan

### API Integration

- Base URL: `http://localhost:8000`
- Endpoints used: `/decision/engine`, `/decision/empathy-check`, `/users/action`

---

## 5. Data & Storage

### Current (MVP)

- **In-memory**: `users_db`, `actions_db`, `global_stats` in `users.py`
- **Extension**: `chrome.storage.local` for `userId`
- **No persistent DB** — data is lost on server restart

### Planned (Config)

- **Supabase** (optional): `SUPABASE_URL`, `SUPABASE_KEY` in config

---

## 6. Security & Configuration

### Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `MISTRAL_API_KEY` | Yes | Mistral/Pixtral API access |
| `SUPABASE_URL` | No | Future persistence |
| `SUPABASE_KEY` | No | Future persistence |

### CORS

- `allow_origins=["*"]` for development
- Production: restrict to frontend/extension origins

---

## 7. API Endpoints Summary

### Decision Engine (`/decision`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/engine` | Text toxicity → HIDE/WARN/ALLOW |
| POST | `/analyze-image` | Image toxicity analysis |
| POST | `/generate-alternative` | Rewrite toxic text |
| POST | `/empathy-check` | Draft toxicity check |
| POST | `/de-escalate` | Generate reply options |

### Users (`/users`)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/action` | Log action, award points |
| GET | `/leaderboard` | Top users by score |
| GET | `/score/{user_id}` | User score |
| GET | `/weather` | Global toxicity stats |
| POST | `/weather/update` | Update stats (internal) |

### Utility

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api` | API info |
| GET | `/health` | Health check |
| GET | `/health/ai` | Mistral key configured check |

---

## 8. Request/Response Flow

### Text Analysis (Extension → Backend)

```
Page text → content.js → POST /decision/engine { text }
  → decision.py → analyze_toxicity() → Mistral API
  → parse rating → score_to_action → DecisionResponse
  → content.js → processHatefulContent() → HIDE/WARN overlay
```

### Image Analysis (Web → Backend)

```
User uploads file → FileReader → base64
  → POST /decision/analyze-image { image_data }
  → analyze_image() → Pixtral API
  → parse rating → { action, score, reason, analysis }
  → Frontend displays badge + score bar
```

### Gamification

```
User uses civilized version → content.js → logUserAction('civilized_message')
  → POST /users/action { user_id, action_type }
  → users.py → points_map → update users_db
  → return points_earned, badge_unlocked
```

---

## 9. Development Tools

| Tool | Purpose |
|------|---------|
| **Pyright/Pyre** | Type checking (optional) |
| **pyproject.toml** | Python config, venv path |
| **.env** | Local secrets (not committed) |

---

## 10. Deployment Considerations

- **Backend**: Deploy FastAPI (e.g. Railway, Render, Fly.io)
- **Extension**: Update `API_BASE_URL` in `content.js` and `popup.js` to production URL
- **Frontend**: Served by FastAPI static files or separate CDN
- **CORS**: Update `allow_origins` for production domains
