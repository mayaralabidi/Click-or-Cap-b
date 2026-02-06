// Background Service Worker
console.log('Click-or-Cap: Background service worker initialized');

// Context menu for de-escalation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'de-escalate-reply',
        title: '💬 Help me reply to this',
        contexts: ['selection']
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId !== 'de-escalate-reply' || !info.selectionText) return;

    const selectedText = info.selectionText;

    try {
        const response = await fetch('http://localhost:8000/decision/de-escalate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ context: selectedText })
        });

        if (!response.ok) {
            console.warn('[Click-or-Cap] De-escalate API:', response.status);
            return;
        }

        const result = await response.json();
        if (!result?.options) return;

        if (tab?.id) {
            try {
                await chrome.tabs.sendMessage(tab.id, {
                    action: 'showDeEscalationOptions',
                    options: result.options,
                    recommended: result.recommended
                });
            } catch (msgErr) {
                // Content script may not be loaded (e.g. chrome:// pages)
                console.warn('[Click-or-Cap] Could not send to tab:', msgErr.message);
            }
        }
    } catch (error) {
        console.warn('[Click-or-Cap] De-escalation error:', error.message);
    }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBadge') {
        chrome.action.setBadgeText({
            text: request.count.toString(),
            tabId: sender.tab.id
        });
        chrome.action.setBadgeBackgroundColor({
            color: '#f44336',
            tabId: sender.tab.id
        });
    }
});
