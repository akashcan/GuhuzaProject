// Fetch and display leaderboard data
async function fetchLeaderboard() {
    try {
        const response = await fetch('http://localhost:3005/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');

        const leaderboard = await response.json();
        const playerListContainer = document.getElementById('player-list');

        if (!playerListContainer) {
            console.error('Player list container element is null or not found.');
            return;
        }

        playerListContainer.innerHTML = ''; // Clear existing content

        leaderboard.forEach((player, index) => {
            let rankClass = '';
            let rankIcon = '';

            if (index === 0) {
                rankClass = 'first';
                rankIcon = '<img src="/images/first-icon.svg" alt="Gold Medal" />';
            } else if (index === 1) {
                rankClass = 'second';
                rankIcon = '<img src="/images/second-icon.svg" alt="Silver Medal" />';
            } else if (index === 2) {
                rankClass = 'third';
                rankIcon = '<img src="/images/third-icon.svg" alt="Bronze Medal" />';
            } else {
                rankIcon = `<div class="rank">${index + 1}</div>`;
            }

            const nameInitial = player.FullName.charAt(0).toUpperCase();

            const playerRow = `
                <div class="player-row ${rankClass}">
                    <div class="rank-icon">
                        ${rankIcon}
                    </div>
                    <div class="icon">${nameInitial}</div>
                    <div class="name">${player.FullName}</div>
                    <div class="xp">${player.TotalXP} XP</div>
                </div>
            `;
            playerListContainer.innerHTML += playerRow;
        });

        console.log('Leaderboard rendered successfully.');
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

// Call fetchLeaderboard on page load
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('leaderboard.html')) {
        console.log('Leaderboard page detected. Fetching leaderboard...');
        fetchLeaderboard();
    }
});
