// Toggle the hamburger menu for the header
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Validating the form
function validateForm() {
    // Get form elements for Job Seekers and Employers
    const fullName = document.getElementById('full-name');
    const companyName = document.getElementById('companyName'); // For employer registration
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const profilePicture = document.getElementById('profile-picture'); // Job Seeker
    const resume = document.getElementById('resume'); // Job Seeker
    const companyLogo = document.getElementById('companyLogo'); // Employer
    const skills = document.getElementById('skills'); // Job Seeker
    const industry = document.getElementById('industry'); // Employer
    const companyLocation = document.getElementById('location-input'); // Employer

    // Reset previous error messages
    clearErrors();

    let isValid = true;

    // Validate full name or company name (not empty)
    if (fullName && fullName.value.trim() === '') {
        showError(fullName, 'Full Name is required');
        isValid = false;
    }
    if (companyName && companyName.value.trim() === '') {
        showError(companyName, 'Company Name is required');
        isValid = false;
    }

    // Validate email (simple regex for basic email format)
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    if (email && !emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password (min 8 characters, 1 uppercase, 1 number)
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordPattern.test(password.value)) {
        showError(password, 'Password must be at least 8 characters long, include an uppercase letter and a number');
        isValid = false;
    }

    // Validate confirm password (matches password)
    if (confirmPassword && password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    // Validate profile picture (must be an image)
    if (profilePicture && profilePicture.files[0] && !['image/jpeg', 'image/png', 'image/gif'].includes(profilePicture.files[0].type)) {
        showError(profilePicture, 'Profile picture must be an image (jpg, png, gif)');
        isValid = false;
    }

    // Validate resume (must be .doc or .pdf)
    if (resume && resume.files[0] && !['application/pdf', 'application/msword'].includes(resume.files[0].type)) {
        showError(resume, 'Resume must be a .doc or .pdf file');
        isValid = false;
    }

    // Validate company logo (must be an image)
    if (companyLogo && companyLogo.files[0] && !['image/jpeg', 'image/png', 'image/gif'].includes(companyLogo.files[0].type)) {
        showError(companyLogo, 'Company logo must be an image (jpg, png, gif)');
        isValid = false;
    }

    // Validate skills (not empty)
    if (skills && skills.value.trim() === '') {
        showError(skills, 'Skills are required');
        isValid = false;
    }

    // Validate industry (must be selected)
    if (industry && (industry.value === '' || industry.value === null)) {
        showError(industry, 'Please select an industry');
        isValid = false;
    }

    // Validate company location (not empty)
    if (companyLocation && companyLocation.value.trim() === '') {
        showError(companyLocation, 'Company location is required');
        isValid = false;
    }

    return isValid; // Return the overall validity
}

// Function to show error messages directly below each input field
function showError(inputElement, message) {
    // Create or select the error message element
    let errorElement = inputElement.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
    }

    // Set the error message and style
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.9em';
    errorElement.style.marginTop = '5px';
}

// Function to clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(message) {
        message.remove();
    });
}


// Function to toggle password visibility
function togglePasswordVisibility(fieldId) {
    const passwordField = document.getElementById(fieldId);
    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

// Set your Mapbox access token
mapboxgl.accessToken = 'sk.eyJ1IjoiYWthc2g0MDFwYW5kZXkiLCJhIjoiY20yZHI1aWRrMWgxaDJrcHlpazBlODRoMSJ9.eslrPjm2a8dNy_H3a2Kshw';

document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    const suggestionsContainer = document.getElementById('suggestions');

    if (!locationInput || !suggestionsContainer) {
        console.error('Location input or suggestions container not found. Check your HTML.');
        return;
    }

    locationInput.addEventListener('input', function() {
        const query = locationInput.value.trim();

        if (query.length > 2) { // Start searching after 3 characters
            console.log(`Searching for: ${query}`);

            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&autocomplete=true&limit=5`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

                    if (!data.features.length) {
                        console.warn('No suggestions found.');
                    }

                    data.features.forEach((feature) => {
                        const suggestion = document.createElement('div');
                        suggestion.classList.add('suggestion');
                        suggestion.textContent = feature.place_name;

                        // When a suggestion is clicked, set the input field and clear suggestions
                        suggestion.addEventListener('click', () => {
                            locationInput.value = feature.place_name;
                            suggestionsContainer.innerHTML = '';
                        });

                        suggestionsContainer.appendChild(suggestion);
                    });
                })
                .catch(error => {
                    console.error('Error fetching location data:', error);
                });
        } else {
            suggestionsContainer.innerHTML = ''; // Clear suggestions if input is too short
        }
    });
});


// APi response to the Generated quiz Page
document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const continueBtn = document.getElementById('continue-btn');

    // Mock quiz data for demonstration
    const generatedQuiz = [
        {
            question: "What is the product of 12 and 15?",
            options: ["160", "180", "200", "220"],
            correctAnswer: "180"
        },
        {
            question: "Calculate the result of 23 × 19.",
            options: ["437", "447", "437", "457"],
            correctAnswer: "437"
        },
        {
            question: "If a rectangle has a length of 8 metres and a width of 7 metres, what is the area in square metres?",
            options: ["54m²", "56m²", "58m²", "60m²"],
            correctAnswer: "56m²"
        }
    ];

    function displayQuiz() {
        quizContainer.innerHTML = ''; // Clear any previous data

        generatedQuiz.forEach((quizItem, index) => {
            const quizDiv = document.createElement('div');
            quizDiv.classList.add('quiz-item');

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `Question ${index + 1}: ${quizItem.question}`;
            quizDiv.appendChild(questionTitle);

            const answerList = document.createElement('ul');
            quizItem.options.forEach(option => {
                const answerItem = document.createElement('li');
                answerItem.textContent = option;
                if (option === quizItem.correctAnswer) {
                    answerItem.classList.add('correct-answer');
                }
                answerList.appendChild(answerItem);
            });

            quizDiv.appendChild(answerList);
            quizContainer.appendChild(quizDiv);
        });
    }

    // Call function to display quiz when page loads
    displayQuiz();

    // Event listener for the Regenerate button
    regenerateBtn.addEventListener('click', () => {
        // Placeholder for real regeneration logic
        alert('Regenerating quiz...');
        displayQuiz(); // Replace with actual regeneration logic
    });

    // Event listener for the Continue button
    continueBtn.addEventListener('click', () => {
        window.location.href = 'gamifiedQuizPage.html'; // Placeholder URL
    });
});



// Prompt box
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', function() {
// Reset height so scrollHeight gives correct value
this.style.height = '60px';
// Set the height to the scroll height, effectively expanding the input
this.style.height = (this.scrollHeight) + 'px';
});

// In your frontend JavaScript code
const apiUrl = "http://localhost:3005/api/quiz?level=1";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log("Quiz data:", data);
        // Handle the quiz data in your frontend
    })
    .catch(error => console.error("Error fetching quiz data:", error));


   