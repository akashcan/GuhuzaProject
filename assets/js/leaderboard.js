async function fetchLeaderboard() {
    try {
        // Retrieve JobSeekerID from localStorage
        const currentJobSeekerID = localStorage.getItem('JobSeekerID');
        if (!currentJobSeekerID) {
            console.error('JobSeekerID not found in localStorage.');
            return;
        }

        const response = await fetch('http://localhost:3005/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');

        const leaderboard = await response.json();
        const playerListContainer = document.getElementById('player-list');
        const currentUserContainer = document.getElementById('current-user-container');

        if (!playerListContainer || !currentUserContainer) {
            console.error('One or more container elements are null or not found.');
            return;
        }

        playerListContainer.innerHTML = ''; // Clear existing content
        currentUserContainer.innerHTML = ''; // Clear current user section

        // Sort leaderboard by TotalXP in descending order and calculate ranks
        leaderboard.sort((a, b) => b.TotalXP - a.TotalXP);
        leaderboard.forEach((player, index) => {
            player.Rank = index + 1; // Assign rank based on sorted position
        });

        console.log('JobSeekerID in leaderboard:', leaderboard.map(player => player.JobSeekerID));
        console.log('Looking for JobSeekerID:', parseInt(currentJobSeekerID, 10));

        // Find the current user based on JobSeekerID
        const currentUser = leaderboard.find(player => player.JobSeekerID === parseInt(currentJobSeekerID, 10));
        console.log('Current user:', currentUser);

        // Render Top 10 Players
        leaderboard.slice(0, 10).forEach((player, index) => {
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
                rankIcon = `<div class="rank">${player.Rank}</div>`;
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

        // Render Current User Below Leaderboard
        if (currentUser && currentUser.Rank > 10) {
            const nameInitial = currentUser.FullName.charAt(0).toUpperCase();
            const currentUserRow = `
                <h3>You are here:</h3>
                <div class="player-row">
                    <div class="rank">${currentUser.Rank}</div>
                    <div class="icon">${nameInitial}</div>
                    <div class="name">${currentUser.FullName}</div>
                    <div class="xp">${currentUser.TotalXP} XP</div>
                </div>
            `;
            currentUserContainer.innerHTML = currentUserRow;
        } else if (!currentUser) {
            console.warn('Current user not found in leaderboard data.');
        }

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
