# Click or Cap - Chrome Extension

🌸 **Fighting Hate Speech with Kindness**

## Installation Instructions

### For Development/Testing:

1. **Ensure Backend is Running**
   ```bash
   cd backend
   python -m uvicorn main:app --reload --port 8000
   ```

2. **Load Extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `extension` folder

3. **Test It Out**
   - Visit any website with comments/text
   - Try typing something potentially toxic in a text field
   - Watch the Empathy Mirror in action!

## Features

### 🌸 Empathy Mirror (Preventative AI)
- Checks your draft messages **before** you post
- Shows predicted reaction emoji
- Suggests civilized alternatives
- Awards **+50 points** for self-correction

### 🛡️ Content Moderation
- Automatically scans page content for hate speech
- **HIDE**: Replaces severe hate speech with calming message
- **WARN**: Shows warning banner for potentially toxic content
- **ALLOW**: Clean content passes through

### 💬 De-Escalation Assistant
- Right-click on toxic text → "Help me reply to this"
- Get polite, firm, or educational response options
- Awards points for constructive engagement

### 🎮 Gamification
- Earn points for positive actions
- View your score and rank in the popup
- Compete on the global leaderboard

## Extension Structure

```
extension/
├── manifest.json          # Extension configuration (Manifest V3)
├── content.js             # Main logic (scanning, empathy mirror)
├── content.css            # Styles for overlays
├── background.js          # Service worker (context menu)
├── popup.html             # Popup UI
├── popup.js               # Popup logic
└── icons/                 # Extension icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## API Endpoints Used

- `POST /decision/engine` - Analyze content and decide action
- `POST /decision/empathy-check` - Check draft for toxicity
- `POST /decision/de-escalate` - Generate constructive replies
- `POST /users/action` - Log user actions for points
- `GET /users/score/{user_id}` - Get user stats

## Configuration

API endpoint is configured in `content.js` and `popup.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

For production, update this to your deployed backend URL.

## Permissions Explained

- `activeTab`: Access current tab content
- `storage`: Save user ID and stats locally
- `<all_urls>`: Scan content on any website
- `contextMenus`: Right-click "De-escalation" menu

## Development Notes

- Uses **Manifest V3** (latest Chrome extension standard)
- Content script runs on ALL web pages
- Background service worker handles context menu
- Popup shows real-time stats from backend

## Next Steps

1. ✅ Extension loads and runs
2. 🔄 Test on live websites (Twitter, Reddit, YouTube)
3. 🎨 Create proper icon graphics
4. 🚀 Deploy backend to production
5. 📦 Package for Chrome Web Store

---

**Made for Google AI Hackathon 2026**
