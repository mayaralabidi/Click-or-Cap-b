// Configuration
const API_BASE_URL = 'http://localhost:8000';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 500;
const API_UNAVAILABLE_COOLDOWN_MS = 60000; // Skip API calls for 1 min after repeated failures

// Content Script - Main Logic
console.log('Click-or-Cap: Content script loaded');

// State
let userId = null;
let isEnabled = true;
let apiFailureCount = 0;

// Initialize user ID
async function initializeUser() {
    const result = await chrome.storage.local.get(['userId']);
    if (!result.userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        await chrome.storage.local.set({ userId });
    } else {
        userId = result.userId;
    }
    console.log('Click-or-Cap: User ID:', userId);
}

// Store API status for popup
async function setApiAvailable(available) {
    await chrome.storage.local.set({
        apiAvailable: available,
        apiLastCheck: Date.now()
    });
}

// Check if we should skip API calls (cooldown after failures)
async function shouldSkipApiCalls() {
    const { apiAvailable, apiLastCheck } = await chrome.storage.local.get(['apiAvailable', 'apiLastCheck']);
    if (apiAvailable === true) return false;
    if (apiAvailable === false && apiLastCheck && (Date.now() - apiLastCheck) < API_UNAVAILABLE_COOLDOWN_MS) {
        return true; // Skip during cooldown
    }
    return false;
}

// API Functions with retry, detailed logging, and availability tracking
async function callAPI(endpoint, data, retries = MAX_RETRIES) {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        // Skip if we recently detected API as unavailable
        if (await shouldSkipApiCalls()) return null;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const text = await response.text();
        let parsed;
        try {
            parsed = text ? JSON.parse(text) : null;
        } catch {
            parsed = null;
        }

        if (!response.ok) {
            apiFailureCount++;
            if (apiFailureCount >= 3) await setApiAvailable(false);
            console.warn(`[Click-or-Cap] API ${response.status}: ${url}`, response.statusText, parsed?.detail || text?.slice(0, 100));
            return null;
        }

        apiFailureCount = 0;
        await setApiAvailable(true);
        return parsed;

    } catch (error) {
        apiFailureCount++;
        if (apiFailureCount >= 3) await setApiAvailable(false);

        const errDetails = {
            url,
            message: error.message,
            name: error.name,
            type: error instanceof TypeError ? 'network' : 'unknown'
        };

        if (retries > 0 && (error.message?.includes('fetch') || error.name === 'TypeError')) {
            await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
            return callAPI(endpoint, data, retries - 1);
        }

        console.warn('[Click-or-Cap] API unavailable:', errDetails);
        return null;
    }
}

// Scan text content for hate speech
async function scanTextContent(text) {
    if (!text || text.trim().length < 5) return null;
    
    const result = await callAPI('/decision/engine', { text });
    return result;
}

// Check empathy for user's draft
async function checkEmpathy(draftText) {
    const result = await callAPI('/decision/empathy-check', { draft_text: draftText });
    return result;
}

// Log user action for gamification
async function logUserAction(actionType) {
    await callAPI('/users/action', {
        user_id: userId,
        action_type: actionType
    });
}

// Process and hide toxic content
function processHatefulContent(element, decision) {
    if (decision.action === 'HIDE') {
        // Create replacement div
        const replacement = document.createElement('div');
        replacement.className = 'click-or-cap-hidden';
        replacement.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin: 10px 0;
                font-family: system-ui, -apple-system, sans-serif;
            ">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 24px;">🌸</span>
                    <strong>Content Hidden</strong>
                </div>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">
                    ${decision.reason}
                </p>
                <button class="show-content-btn" style="
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                    font-size: 12px;
                ">Show anyway</button>
            </div>
        `;
        
        // Store original content
        const originalContent = element.cloneNode(true);
        
        // Replace element
        element.replaceWith(replacement);
        
        // Show content button handler
        replacement.querySelector('.show-content-btn').addEventListener('click', () => {
            replacement.replaceWith(originalContent);
        });
        
        return true;
    } else if (decision.action === 'WARN') {
        // Add warning overlay
        element.style.position = 'relative';
        const warning = document.createElement('div');
        warning.className = 'click-or-cap-warning';
        warning.innerHTML = `
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(255, 193, 7, 0.9);
                color: #000;
                padding: 8px;
                font-size: 12px;
                font-family: system-ui;
                z-index: 1000;
                border-radius: 4px 4px 0 0;
            ">
                ⚠️ ${decision.reason}
            </div>
        `;
        element.style.paddingTop = '40px';
        element.insertBefore(warning, element.firstChild);
        
        return true;
    }
    
    return false;
}

// Empathy Mirror - Check user's input
function attachEmpathyMirror() {
    // Find all textareas and input fields
    const inputs = document.querySelectorAll('textarea, input[type="text"]');
    
    inputs.forEach(input => {
        if (input.dataset.empathyAttached) return;
        input.dataset.empathyAttached = 'true';
        
        let empathyTimeout;
        input.addEventListener('input', () => {
            clearTimeout(empathyTimeout);
            empathyTimeout = setTimeout(async () => {
                const text = input.value;
                if (text.length > 20) {
                    const result = await checkEmpathy(text);
                    if (result && result.toxicity > 0.3) {
                        showEmpathyWarning(input, result);
                    }
                }
            }, 1000);
        });
    });
}

// Show empathy warning
function showEmpathyWarning(inputElement, empathyResult) {
    // Remove existing warning
    const existing = inputElement.parentElement.querySelector('.empathy-warning');
    if (existing) existing.remove();
    
    const warning = document.createElement('div');
    warning.className = 'empathy-warning';
    warning.innerHTML = `
        <div style="
            background: #fff3e0;
            border-left: 4px solid #ff9800;
            padding: 12px;
            margin-top: 8px;
            border-radius: 4px;
            font-family: system-ui;
            font-size: 14px;
        ">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                ${empathyResult.predicted_reaction_emoji} <strong>Empathy Check</strong>
            </div>
            <p style="margin: 0 0 8px 0; color: #666;">
                ${empathyResult.warning_message}
            </p>
            ${empathyResult.civilized_version !== inputElement.value ? `
                <button class="use-civilized" style="
                    background: #4caf50;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                ">✨ Use this instead</button>
            ` : ''}
        </div>
    `;
    
    inputElement.parentElement.insertBefore(warning, inputElement.nextSibling);
    
    // Civilize button handler
    const civilizeBtn = warning.querySelector('.use-civilized');
    if (civilizeBtn) {
        civilizeBtn.addEventListener('click', () => {
            inputElement.value = empathyResult.civilized_version;
            warning.remove();
            // Award points for self-regulation
            logUserAction('civilized_message');
        });
    }
}

// Scan page for harmful content
async function scanPage() {
    // Find all text-containing elements
    const textElements = document.querySelectorAll('p, div, span, h1, h2, h3, article');
    
    for (const element of textElements) {
        if (element.dataset.scanned) continue;
        
        const text = element.textContent;
        if (text && text.trim().length > 20) {
            const decision = await scanTextContent(text);
            if (decision) {
                processHatefulContent(element, decision);
                element.dataset.scanned = 'true';
            }
        }
    }
}

// Check API health (lightweight, no spam)
async function checkApiHealth() {
    try {
        const r = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
        const ok = r.ok;
        await setApiAvailable(ok);
        return ok;
    } catch {
        await setApiAvailable(false);
        return false;
    }
}

// Initialize
(async function init() {
    await initializeUser();
    await checkApiHealth();

    // Attach empathy mirror to inputs
    attachEmpathyMirror();

    // Scan existing content (callAPI will skip if API unavailable)
    await scanPage();
    
    // Observer for new content
    const observer = new MutationObserver((mutations) => {
        attachEmpathyMirror();
        // Debounce scan
        clearTimeout(window.scanTimeout);
        window.scanTimeout = setTimeout(scanPage, 500);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Click-or-Cap: Initialized successfully');
})();
