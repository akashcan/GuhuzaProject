 // Show the "Send Invite" section and hide the "Invite Friends" section
 function showInviteOptions() {
    document.getElementById("invite-section").classList.add("hidden");
    document.getElementById("invite-options").classList.remove("hidden");
}

// Hide the "Send Invite" section and show the "Invite Friends" section
function hideInviteOptions() {
    document.getElementById("invite-options").classList.add("hidden");
    document.getElementById("invite-section").classList.remove("hidden");
}

// Copy the invite link to the clipboard
function copyToClipboard() {
    const inviteLink = document.getElementById("invite-link");
    inviteLink.select();
    inviteLink.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(inviteLink.value);
    alert("Link copied to clipboard!");
}

// Redirect to email when "Share Your Link" is clicked
function shareLink() {
    const inviteLink = document.getElementById("invite-link").value;

    if (!inviteLink) {
        alert("Invite link is missing or invalid!");
        return;
    }

    // Craft a compelling subject and body
    const subject = encodeURIComponent("You're Invited to an Exciting Quiz Challenge!");
    const body = encodeURIComponent(
        `Hi there!\n\nThink you're ready for a fun and engaging challenge? Join me on Skill Master and test your skills in an exciting quiz!\n\nClick the link below to start playing:\n${inviteLink}\n\nProve you're the best, climb the leaderboard, and have some fun along the way. Don't miss out!\n\nSee you there!`
    );

    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    console.log("Mailto link:", mailtoLink); // Debugging step

    // Redirect to the mailto link
    window.location.href = mailtoLink;
}