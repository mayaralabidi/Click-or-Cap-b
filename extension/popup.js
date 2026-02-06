// Popup script
const API_BASE_URL = 'http://localhost:8000';

async function loadUserStats() {
    try {
        // Get user ID from storage
        const { userId } = await chrome.storage.local.get(['userId']);
        if (!userId) {
            document.getElementById('userScore').textContent = '0';
            document.getElementById('actionCount').textContent = '0';
            return;
        }

        // Fetch user score
        const response = await fetch(`${API_BASE_URL}/users/score/${userId}`);
        const data = await response.json();

        document.getElementById('userScore').textContent = data.score || 0;
        document.getElementById('actionCount').textContent = data.actions_count || 0;

        // Get blocked count from storage
        const { blockedCount } = await chrome.storage.local.get(['blockedCount']);
        document.getElementById('blockedCount').textContent = blockedCount || 0;

    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// View leaderboard button
document.getElementById('viewLeaderboard').addEventListener('click', async () => {
    chrome.tabs.create({
        url: `${API_BASE_URL}/docs#/Users%20%26%20Gamification/get_leaderboard_users_leaderboard_get`
    });
});

// Load stats on popup open
loadUserStats();
