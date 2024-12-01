document.addEventListener('DOMContentLoaded', async () => {
    const email = localStorage.getItem('userEmail'); // Get email from localStorage
    console.log('Email:', email);

    if (!email) {
        console.error('User email not found in localStorage.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3005/profile?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Failed to fetch profile');

        const profileData = await response.json();
        console.log('Profile data retrieved:', profileData); // Debug log

        // Update the profile section in the DOM
        document.getElementById('name').value = profileData.FullName || '';
        document.getElementById('email').value = profileData.Email || '';
        document.getElementById('join-date').value = profileData.JoinDate.split('T')[0] || ''; // Format date
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
});


