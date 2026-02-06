// Popup script
const API_BASE_URL = 'http://localhost:8000';

async function checkApiAvailable() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
        return response.ok;
    } catch {
        return false;
    }
}

async function showApiUnavailable() {
    document.getElementById('apiUnavailable').style.display = 'block';
    document.getElementById('statsContainer').style.opacity = '0.5';
    document.getElementById('viewLeaderboard').disabled = true;
}

function showApiAvailable() {
    document.getElementById('apiUnavailable').style.display = 'none';
    document.getElementById('statsContainer').style.opacity = '1';
    document.getElementById('viewLeaderboard').disabled = false;
}

async function loadUserStats() {
    const apiAvailable = await checkApiAvailable();
    if (!apiAvailable) {
        showApiUnavailable();
        return;
    }
    showApiAvailable();

    try {
        const { userId } = await chrome.storage.local.get(['userId']);
        if (!userId) {
            document.getElementById('userScore').textContent = '0';
            document.getElementById('actionCount').textContent = '0';
            document.getElementById('blockedCount').textContent = '0';
            return;
        }

        const response = await fetch(`${API_BASE_URL}/users/score/${userId}`);
        const data = await response.json();

        document.getElementById('userScore').textContent = data.score ?? 0;
        document.getElementById('actionCount').textContent = data.actions_count ?? 0;

        const { blockedCount } = await chrome.storage.local.get(['blockedCount']);
        document.getElementById('blockedCount').textContent = blockedCount ?? 0;
    } catch (error) {
        showApiUnavailable();
    }
}

// View leaderboard button
document.getElementById('viewLeaderboard').addEventListener('click', async () => {
    chrome.tabs.create({
        url: `${API_BASE_URL}/dashboard.html`
    });
});

// Load stats on popup open
loadUserStats();
