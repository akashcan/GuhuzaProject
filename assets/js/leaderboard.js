async function fetchLeaderboard() {
    try {
        // Retrieve the current user's JobSeekerID from localStorage
        const currentJobSeekerID = parseInt(localStorage.getItem('JobSeekerID'), 10);
        if (!currentJobSeekerID) {
            console.error('JobSeekerID not found or invalid in localStorage.');
            return;
        }

        // Fetch leaderboard data from the server
        const response = await fetch('http://localhost:3005/api/leaderboard');
        if (!response.ok) throw new Error('Failed to fetch leaderboard');

        const leaderboard = await response.json();

        // Get leaderboard and current user container elements
        const playerListContainer = document.getElementById('player-list');
        const currentUserContainer = document.getElementById('current-user-container');
        if (!playerListContainer || !currentUserContainer) {
            console.error('One or more container elements are null or not found.');
            return;
        }

        // Clear existing content in the containers
        playerListContainer.innerHTML = '';
        currentUserContainer.innerHTML = '';

        // Sort the leaderboard by TotalXP in descending order and assign ranks
        leaderboard.sort((a, b) => b.TotalXP - a.TotalXP);
        leaderboard.forEach((player, index) => {
            player.Rank = index + 1; // Assign rank
        });

        console.log('Leaderboard with ranks:', leaderboard);

        // Identify the current user in the leaderboard
        const currentUser = leaderboard.find(player => player.JobSeekerID === currentJobSeekerID);
        if (currentUser) {
            console.log('Found currentUser:', currentUser);
            console.log('Current user rank:', currentUser.Rank);
        } else {
            console.log('Currentuser : ',currentUser);
            console.warn('Current user not found in leaderboard data.');
        }

        // Render the top 10 players in the leaderboard
        leaderboard.slice(0, 10).forEach((player, index) => {
            let rankIcon = '';

            if (index === 0) rankIcon = '<img src="/images/first-icon.svg" alt="Gold Medal" />';
            else if (index === 1) rankIcon = '<img src="/images/second-icon.svg" alt="Silver Medal" />';
            else if (index === 2) rankIcon = '<img src="/images/third-icon.svg" alt="Bronze Medal" />';
            else rankIcon = `<div class="rank">${player.Rank}</div>`;

            const nameInitial = player.FullName.charAt(0).toUpperCase();
            const playerRow = `
                <div class="player-row">
                    <div class="rank-icon">${rankIcon}</div>
                    <div class="icon">${nameInitial}</div>
                    <div class="name">${player.FullName}</div>
                    <div class="xp">${player.TotalXP} XP</div>
                </div>
            `;
            playerListContainer.innerHTML += playerRow;
        });

        // Render the "You are here" section if the user is ranked beyond the top 10
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
            currentUserContainer.style.display = 'block'; // Ensure the section is visible
            console.log('Rendered "You are here" section:', currentUserRow);
        } else {
            currentUserContainer.style.display = 'none'; // Hide if the user is within the top 10 or not found
            console.log('Hiding "You are here" section.');
        }

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
