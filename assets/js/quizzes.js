document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    // Move character to the specified level and save the current position
    function moveCharacter(level, callback) {
        currentLevel = level;
        sessionStorage.setItem("currentLevel", currentLevel); // Save current level
        const startIndex = currentLevel - 1;
        const endIndex = level;
        const steps = pathPositions.slice(startIndex, endIndex + 1);
        let stepIndex = 0;
        const totalZigzagSteps = 5;
        const zigzagDistance = 5

        function animateStep() {
            if (stepIndex < steps.length) {
                const { top: targetTop, left: targetLeft } = steps[stepIndex];
                const currentTop = parseFloat(character.style.top) || 0;
                const currentLeft = parseFloat(character.style.left) || 0;

                const deltaY = (targetTop - currentTop) / totalZigzagSteps;
                const deltaX = (targetLeft - currentLeft) / totalZigzagSteps;

                let zigzagStep = 0;

                function animateZigzag() {
                    if (zigzagStep <= totalZigzagSteps) {
                        const intermediateTop = currentTop + deltaY * zigzagStep;
                        const intermediateLeft = currentLeft + deltaX * zigzagStep;
                        const zigzagOffset = (zigzagStep % 2 === 0 ? zigzagDistance : -zigzagDistance) * (1 - zigzagStep / totalZigzagSteps);
                        character.style.top = `${intermediateTop}px`;
                        character.style.left = `${intermediateLeft + zigzagOffset}px`;

                        zigzagStep++;
                        setTimeout(animateZigzag, 50);
                    } else {
                        stepIndex++;
                        animateStep();
                    }
                }

             animateZigzag();
            } else {
                currentLevel = level;
              // Ensure click sound plays with error handling
        if (clickSound) {
            clickSound.play().catch(error => {
                console.error("Error playing click sound:", error);
            });
        }

        if (callback) callback(); // Trigger callback only when complete
    } 
        }

        animateStep();
    }

    // Unlock the next level, update sessionStorage, and enable the next level button
    function unlockNextLevel(level) {
        if (levelsContainer && level < totalLevels) {
            const nextLevelButton = levelsContainer.children[level];
            if (nextLevelButton) {
                nextLevelButton.classList.remove("locked");
                nextLevelButton.classList.add("unlocked");
                nextLevelButton.disabled = false;
                unlockedLevels = level + 1;
                sessionStorage.setItem("unlockedLevels", unlockedLevels); // Save unlocked levels
            }
        }
    }

    // Quiz and UI variables
    const countdownOverlay = document.getElementById("countdown-overlay");
    const countdownElement = document.getElementById("countdown");
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    const progressBarElement = document.getElementById("progress");
    const timerElement = document.getElementById("timer");
    const continueButton = document.getElementById("continue-btn");
    const leaderboardOverlay = document.getElementById("leaderboard-overlay");
    const playerPhotoElement = document.querySelector(".player-photo");
    const totalQuestionsElement = document.getElementById("total-questions");
    const scoreElement = document.getElementById("score-value");
    const timeTakenElement = document.getElementById("time-taken-value");
    const nextLevelBtn = document.getElementById("next-level-btn");
    const replayBtn = document.getElementById("replay-btn");
    const quizTitleElement = document.getElementById("quiz-title");
    const quizLevelElement = document.getElementById("quiz-level");
    const clickSound = document.getElementById("click-sound");
    const moveSound = document.getElementById("move-sound");
    const lockedSound = document.getElementById("locked-sound");
    let currentDifficulty = 'easy'; // Default value
    let quizStartTime; // Global variable to track quiz start time
    function startQuiz() {
        quizStartTime = Date.now(); // Set start time when the quiz starts
        displayQuestion();
        startTimer();
    }
    
    // Quiz logic variables
    let countdown = 3;
    let timeRemaining = 60;
    let currentQuestionIndex = 0;
    let score = 0;
    let timerInterval;
    const quizData = JSON.parse(sessionStorage.getItem("quizData")) || {
        question: [{ question: "Sample Question?", answers: ["Answer 1", "Answer 2"], test_answer: 0 }]
    };

    // Sidebar, Level, and Music variables
    const levelsContainer = document.getElementById("levels-container");
    const character = document.getElementById("character");
    const backgroundMusic = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");
    const totalLevels = 50;
    let currentLevel = parseInt(sessionStorage.getItem("currentLevel") || "1", 10);
    let unlockedLevels = parseInt(sessionStorage.getItem("unlockedLevels") || "1", 10);
    const pathPositions = [];

    // Music Toggle
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener("click", () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.textContent = "🔊";
            } else {
                backgroundMusic.pause();
                musicToggle.textContent = "🔈";
            }
        });
    }

    // Start Button, Character Movement, and Level Unlocking
    if (levelsContainer && character) {
        const startButton = document.createElement("button");
        startButton.classList.add("level-circle", "start-btn");
        startButton.textContent = "Start";
        startButton.style.position = "absolute";
        startButton.style.top = "50px";
        startButton.style.left = "130px";
        levelsContainer.appendChild(startButton);

        setTimeout(() => {
            pathPositions.push({ top: startButton.offsetTop, left: startButton.offsetLeft });
        }, 0);

        for (let i = 1; i <= totalLevels; i++) {
            const button = document.createElement("button");
            button.classList.add("level-circle", i <= unlockedLevels ? "unlocked" : "locked");
            button.textContent = `Level ${i}`;
            button.disabled = i > unlockedLevels;
            button.setAttribute("data-level", i); // Assign dynamic data-level
            button.style.position = "absolute";
            button.style.top = `${i * 300}px`;
            button.style.left = i % 2 === 0 ? "200px" : "60px";
            levelsContainer.appendChild(button);
            setTimeout(() => {
                pathPositions.push({ top: button.offsetTop, left: button.offsetLeft });
            }, 0);

            // Add click event for unlocked levels
            button.addEventListener("click", () => {
                if (!button.disabled) moveCharacter(i, () => unlockNextLevel(i));
            });
        }

        startButton.addEventListener("click", () => moveCharacter(1, () => unlockNextLevel(1)));
    }

    // Quiz Countdown and Display Functions
    function startCountdown() {
        const countdownSequence = ["Ready", "3", "2", "1", "Go!"];
        let countdownIndex = 0;
        countdownElement.innerText = countdownSequence[countdownIndex];
        const countdownInterval = setInterval(() => {
            countdownIndex++;
            if (countdownIndex < countdownSequence.length) {
                countdownElement.innerText = countdownSequence[countdownIndex];
            } else {
                clearInterval(countdownInterval);
                countdownOverlay.style.display = "none";
                startQuiz();
            }
        }, 1000);
    }
    
    // Start Quiz
    function startQuiz() {
        quizStartTime = Date.now(); // Record the start time
        displayQuestion();
        startTimer();
    }
    
    // Display Question
    function displayQuestion() {
        const questionData = quizData.question[currentQuestionIndex];
        const totalQuestions = quizData.question.length; // Total number of questions
        const questionNumberElement = document.getElementById("question-number");
        const questionsPerLevel = 10; // Defining how many questions are in each level
        quizTitleElement.textContent = quizData.title || "Quiz";
        quizLevelElement.textContent = `Level ${currentLevel}`;
        questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        questionElement.innerHTML = `<h4>${questionData.question}</h4>`;
        choicesElement.innerHTML = "";
        questionData.answers.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.classList.add("choice");
            choiceButton.textContent = choice;
            choiceButton.dataset.correct = questionData.test_answer === index;
            choiceButton.addEventListener("click", selectAnswer);
            choicesElement.appendChild(choiceButton);
        });
    
        continueButton.disabled = true; // Disable continue button until an answer is selected
    }
    
    // Timer
    function startTimer() {
        clearInterval(timerInterval); // Clear any existing timer interval
        timeRemaining = 60; // Reset timeRemaining for each question
        timerElement.innerText = `${timeRemaining--}s`;
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timerElement.innerText = `${timeRemaining--}s`;
                updateProgressBar();
            } else {
                clearInterval(timerInterval);
                timerElement.innerText = "Time's Up!";
                disableChoices();
                continueButton.disabled = false; // Enable continue button when timer ends
            }
        }, 1000);
    }
    
    // Progress Bar
function updateProgressBar() {
    const progressPercentage = ((60 - timeRemaining) / 60) * 100;
    progressBarElement.style.width = `${progressPercentage}%`;

     // Dynamic color transition using 
     if (timeRemaining > 19) {
        progressBarElement.style.backgroundColor = "Green"; //green
    } else if (timeRemaining > 9) {
        progressBarElement.style.backgroundColor = "#F7CA18"; //  yello
    } else {
        progressBarElement.style.backgroundColor = "#fc0505"; // red
    }
}
    // Select Answer
    function selectAnswer(event) {
        const selectedChoice = event.target;
        const isCorrect = selectedChoice.dataset.correct === "true";
        selectedChoice.classList.add(isCorrect ? "correct" : "incorrect");
    
        disableChoices(); // Disable all choices once an answer is selected
        continueButton.disabled = false; // Enable continue button after selecting an answer
    
        if (isCorrect) score++; // Increment score if the selected answer is correct
    }
    
    // Disable Choices
    function disableChoices() {
        const choices = choicesElement.querySelectorAll(".choice");
        choices.forEach(choice => {
            choice.disabled = true;
            choice.classList.add(choice.dataset.correct === "true" ? "correct" : "incorrect");
        });
    }
    
    // Continue Button 
    continueButton.addEventListener("click", () => {
        clearInterval(timerInterval); 
        progressBarElement.style.width = "0%"; // Reset the progress bar width
        progressBarElement.style.backgroundColor = "green"; // Reset the progress bar color
        if (currentQuestionIndex < quizData.question.length - 1) {
            currentQuestionIndex++;
            startTimer(); // Restart timer for the next question
            displayQuestion();
        } else {
            showLeaderboard(); // Show leaderboard when quiz is completed
            submitQuizResults(); // Submit the quiz results
        }
    });
    //submit quiz results
async function submitQuizResults() {
    // Retrieve JobSeekerID from localStorage
    const JobSeekerID = localStorage.getItem('JobSeekerID'); 
    
    // Dynamic values based on the user's quiz performance
    const LevelName = `Level ${currentLevel}`; // Dynamically fetch the current level
    const Difficulty = currentDifficulty || 'medium'; // Replace with selected difficulty
    const CorrectAnswers = score; // Use the actual score
    const TotalQuestions = quizData.question.length; // Total questions in the quiz
    const quizEndTime = Date.now();
    const TimeTaken = Math.floor((quizEndTime - quizStartTime) / 1000); // Time in seconds

    // XP Calculation
    const baseXpPerQuestion = 10; // Base XP for each correct answer
    const timeBonusPerQuestion = 5; // Bonus if time is favorable
    const levelCompletionBonus = 50; // Additional bonus for completing the level
    const accuracyBonus = Math.floor((CorrectAnswers / TotalQuestions) * 50); // Bonus based on accuracy
    const xpEarned = 
        CorrectAnswers * baseXpPerQuestion +
        timeBonusPerQuestion * CorrectAnswers +
        levelCompletionBonus +
        accuracyBonus;

    const payload = {
        JobSeekerID,
        LevelName,
        Difficulty,
        CorrectAnswers,
        TotalQuestions,
        TimeTaken,
        xpEarned, // Include calculated XP in the payload
    };

    console.log('Submitting payload:', payload);

    try {
        const response = await fetch('http://localhost:3005/api/submit-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to submit quiz results: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Quiz results submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting quiz results:', error);
    }
}


    // Leaderboard
    function showLeaderboard() {
        clearInterval(timerInterval); // Ensure no timer is running
    
        const quizEndTime = Date.now(); // Record the end time
        const totalTimeTaken = Math.floor((quizEndTime - quizStartTime) / 1000); // Time in seconds
    
        playerPhotoElement.src = "images/Frogita - Telegram Animated Stickers.gif";
        totalQuestionsElement.innerText = quizData.question.length;
        scoreElement.innerText = `${score} / ${quizData.question.length}`;
        timeTakenElement.innerText = `${totalTimeTaken}s`; // Display total time taken
        leaderboardOverlay.style.display = "flex";
        updateUserName("player-name"); // Update player name dynamically
    }
    
    

    function updateUserName(elementId, defaultName = 'Guest') {
        const fullName = localStorage.getItem('fullName');
        console.log("Retrieved fullName:", fullName);
    
        if (fullName) {
            const firstName = fullName.trim().split(' ')[0];
            document.getElementById(elementId).textContent = firstName;
        } else {
            document.getElementById(elementId).textContent = defaultName;
        }
    }
    
//NextLevel button
    nextLevelBtn.addEventListener("click", () => {
        console.log("Next level button clicked. Moving character to Level 2.");
        moveCharacter(2, () => {
            console.log("Character moved. Unlocking Level 2.");
            unlockNextLevel(2);
            window.location.href = "mainLevelPage.html";
        });
    });
//Replay button
    replayBtn.addEventListener("click", () => {
        window.location.reload();
    });

    startCountdown();
});

//Sidebar
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const openSidebarBtn = document.getElementById("open-sidebar-btn");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");
    const levelsContainer = document.getElementById("levels-container");

    // Sidebar toggle logic
    openSidebarBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
        document.querySelector(".main-content").classList.add("sidebar-open");
    });

    closeSidebarBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
        document.querySelector(".main-content").classList.remove("sidebar-open");
    });
});

// Popup Functionality
document.addEventListener("DOMContentLoaded", function () {
    const popupModal = document.getElementById("popup-modal");
    const popupContent = document.getElementById("popup-content");
    const startQuizBtn = document.getElementById("start-quiz-btn");

    document.querySelectorAll('.level-circle').forEach(button => {
        if (!button.classList.contains('start-btn')) {
            button.addEventListener('click', function (event) {
                document.getElementById("popup-title").innerText = "Unlock your potentials";
                document.getElementById("popup-description").innerText = "Prove your skills by challenging friends";

                // Delay popup display by 2 seconds (2000 milliseconds)
                setTimeout(() => {
                    popupModal.style.display = "flex";
                    setTimeout(() => {
                        popupContent.classList.add("show");
                    }, 10);
                    document.body.style.overflow = "hidden";
                }, 1000); // Adjust the delay time as needed (in milliseconds)
            });
        }
    });

    window.addEventListener('click', function (event) {
        if (event.target === popupModal) {
            closePopup();
        }
    });

    function closePopup() {
        popupContent.classList.remove("show");
        setTimeout(() => {
            popupModal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }

    window.addEventListener('scroll', function () {
        if (popupModal.style.display === "flex") {
            closePopup();
        }
    });

    document.getElementById("challenge-friends-btn").addEventListener("click", function(event) {
        event.stopPropagation();
        alert("Challenge your friends!");
    });
});
