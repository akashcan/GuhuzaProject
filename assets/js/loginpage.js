// Handle thejob seekers form submission
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Call validateForm() before proceeding
            if (!validateForm()) {
                console.log('Form validation failed');
                return; // Stop form submission if validation fails
            }

            const formData = new FormData(this); // Collect form data including files

            // Use fetch() to send the form data to the backend
            fetch('http://localhost:3005/register', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Registration successful:', data);
                alert(data.message);  // Display the success message from the server

                // Redirect to the login page after successful registration
                window.location.href = "signIn.html"; 
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Error occurred while registering. Check the console for details.');
            });
        });
    } else {
        console.error('Form with id="registration" not found');
    }
});


document.addEventListener('DOMContentLoaded', function() { 
    const loginForm = document.getElementById('login-form');
    const otpForm = document.getElementById('otp-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Prepare the login data
            const loginData = {
                email: email,
                password: password
            };

            // Send a POST request to the backend for login
            fetch('http://localhost:3005/login', { // Update port to match the refactored server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'OTP sent to your email') {

                     // Store user's email for future requests
                     localStorage.setItem('userEmail', email);

                    // Hide the login form and show the OTP form
                    document.getElementById('login-form').style.display = 'none';
                    document.getElementById('otp-form').style.display = 'block';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
                alert(error.message); // Show the specific error message
            });
        });
    }

    // OTP Verification
    if (otpForm) {
        otpForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
        
            const email = document.getElementById('username').value;
            const otp = document.getElementById('otp').value;
        
            fetch('http://localhost:3005/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message.includes('successfully')) {
                    // Store the full name in localStorage
                    localStorage.setItem('fullName', data.fullName);
                    alert(`Welcome, ${data.fullName}`);
                    window.location.href = 'DashBoardAI.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error verifying OTP:', error);
                alert('Failed to verify OTP. Please try again.');
            });
        });
    };
});

// DashboardAI Page
document.addEventListener('DOMContentLoaded', function() {
    const fullName = localStorage.getItem('fullName');
    console.log("Retrieved fullName:", fullName); // This log will confirm if fullName is retrieved correctly

    // Check if fullName exists and update the HTML
    if (fullName) {
        const firstName = fullName.trim().split(' ')[0];

        document.getElementById('user-name').textContent = firstName;

    } else  {
        document.getElementById('user-name').textContent = 'Guest';
    }
});

// Send Button
document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.querySelector('.send-button');

    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const query = searchInput.value.trim();

            if (query) {
                // Navigate to the quiz generation page
                window.location.href = 'generatedQuiz.html';
            } else {
                alert("Please enter a topic to generate a quiz.");
            }
        });
    }
});