# Extension Integration Guide

## Overview

This guide shows how to integrate your browser extension with the Report Hate Speech API.

## API Endpoint

**Base URL:** `http://localhost:8000` (development) or `https://your-domain.com` (production)

**Endpoint:** `POST /reports/submit`

## Extension Code Example

### 1. Background Script (background.js)

```javascript
// Listen for context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "reportHate") {
    // Get selected text or post content
    const content = info.selectionText || await getPostContent(tab.id);
    
    // Get user ID from storage
    const { userId } = await chrome.storage.local.get(['userId']);
    
    // Detect platform
    const platform = detectPlatform(tab.url);
    
    // Submit report
    await submitReport(content, platform, userId);
  }
});

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "reportHate",
    title: "🚨 Report Hate Speech",
    contexts: ["selection", "page"],
    documentUrlPatterns: [
      "*://twitter.com/*",
      "*://x.com/*",
      "*://facebook.com/*",
      "*://reddit.com/*"
    ]
  });
});

// Submit report function
async function submitReport(content, platform, userId) {
  try {
    const response = await fetch('http://localhost:8000/reports/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        contentType: 'text',
        platform: platform,
        userId: userId || 'anonymous',
        location: null // Optional: add geolocation
      })
    });

    const data = await response.json();

    if (data.success) {
      // Show success notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Report Submitted!',
        message: data.message,
        priority: 2
      });

      // Update badge with new score
      chrome.action.setBadgeText({ text: data.newTotalScore.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#e12320' });
    }
  } catch (error) {
    console.error('Failed to submit report:', error);
    
    // Show error notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'Report Failed',
      message: 'Could not submit report. Please try again.',
      priority: 2
    });
  }
}

// Detect platform from URL
function detectPlatform(url) {
  if (url.includes('twitter.com') || url.includes('x.com')) return 'x';
  if (url.includes('facebook.com')) return 'facebook';
  if (url.includes('reddit.com')) return 'reddit';
  return 'unknown';
}

// Get post content from page (inject content script)
async function getPostContent(tabId) {
  const results = await chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: extractPostContent
  });
  return results[0].result;
}

// This function runs in the page context
function extractPostContent() {
  // Try to find the closest post element
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    
    // Twitter/X
    const tweet = container.closest('[data-testid="tweet"]');
    if (tweet) {
      return tweet.textContent;
    }
    
    // Facebook
    const fbPost = container.closest('[role="article"]');
    if (fbPost) {
      return fbPost.textContent;
    }
    
    // Reddit
    const redditPost = container.closest('.Post');
    if (redditPost) {
      return redditPost.textContent;
    }
  }
  
  return selection.toString();
}
```

### 2. Manifest Configuration (manifest.json)

```json
{
  "manifest_version": 3,
  "name": "Click or Cap - Hate Speech Reporter",
  "version": "1.0.0",
  "description": "Report hate speech and earn points",
  
  "permissions": [
    "contextMenus",
    "notifications",
    "storage",
    "activeTab",
    "scripting"
  ],
  
  "host_permissions": [
    "*://twitter.com/*",
    "*://x.com/*",
    "*://facebook.com/*",
    "*://reddit.com/*",
    "http://localhost:8000/*"
  ],
  
  "background": {
    "service_worker": "background.js"
  },
  
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

### 3. Popup UI (popup.html)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 300px;
      padding: 16px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    .stat {
      display: flex;
      justify-content: space-between;
      padding: 12px;
      margin: 8px 0;
      border: 2px solid black;
      border-radius: 8px;
      font-weight: bold;
    }
    .stat-value {
      color: #e12320;
      font-size: 20px;
    }
    button {
      width: 100%;
      padding: 12px;
      background: black;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 12px;
    }
    button:hover {
      background: #333;
    }
  </style>
</head>
<body>
  <h2>Click or Cap</h2>
  
  <div class="stat">
    <span>Total Points</span>
    <span class="stat-value" id="totalPoints">0</span>
  </div>
  
  <div class="stat">
    <span>Reports Today</span>
    <span class="stat-value" id="todayReports">0/10</span>
  </div>
  
  <div class="stat">
    <span>Accuracy</span>
    <span class="stat-value" id="accuracy">0%</span>
  </div>
  
  <button id="viewDashboard">View Dashboard</button>
  
  <script src="popup.js"></script>
</body>
</html>
```

### 4. Popup Script (popup.js)

```javascript
// Load user stats when popup opens
async function loadStats() {
  const { userId } = await chrome.storage.local.get(['userId']);
  
  if (!userId) {
    // Generate new user ID if doesn't exist
    const newUserId = 'user_' + Date.now();
    await chrome.storage.local.set({ userId: newUserId });
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:8000/reports/stats?user_id=${userId}`);
    const stats = await response.json();
    
    document.getElementById('totalPoints').textContent = stats.totalPoints;
    document.getElementById('todayReports').textContent = `${stats.todayReports}/10`;
    document.getElementById('accuracy').textContent = `${stats.accuracyRate}%`;
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

// Open dashboard in new tab
document.getElementById('viewDashboard').addEventListener('click', () => {
  chrome.tabs.create({ url: 'http://localhost:3000/dashboard/reports' });
});

// Load stats on popup open
loadStats();
```

## User Flow

1. **User browses social media** (Twitter, Facebook, Reddit)
2. **Sees hateful content**
3. **Right-clicks on the post**
4. **Selects "🚨 Report Hate Speech"**
5. **Extension:**
   - Extracts post content
   - Sends to backend API
   - Receives toxicity analysis
6. **Notification appears:**
   - "Report validated! +50 points 🎉" (if hate speech)
   - "Not hate speech. -10 points" (if false positive)
7. **Badge updates** with new score
8. **User can click extension icon** to see stats
9. **Click "View Dashboard"** to see full report history

## API Response Format

### Success Response

```json
{
  "success": true,
  "reportId": "uuid-here",
  "toxicityScore": 0.89,
  "isValidated": true,
  "pointsAwarded": 50,
  "newTotalScore": 1250,
  "message": "Report validated! +50 points 🎉"
}
```

### Error Response (Rate Limit)

```json
{
  "detail": "Daily report limit reached (10/day). Try again tomorrow!"
}
```

## Testing

1. **Install extension** in Chrome
2. **Visit Twitter/Facebook/Reddit**
3. **Right-click on any post**
4. **Select "Report Hate Speech"**
5. **Check notification** appears
6. **Click extension icon** to see updated stats
7. **Visit dashboard** to see report history

## Production Deployment

Update API URL in extension:

```javascript
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com' 
  : 'http://localhost:8000';
```

## CORS Configuration

The backend is already configured to allow all origins in development. For production, update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-extension-id.chromiumapp.org"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
