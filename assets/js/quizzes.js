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

    function startQuiz() {
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        const questionData = quizData.question[currentQuestionIndex];
        quizTitleElement.textContent = quizData.title || "Quiz"; 
        quizLevelElement.textContent = `Level ${quizData.level || 1}`;    
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
        continueButton.disabled = true;
    }
//Timer
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timerElement.innerText = `${timeRemaining--}s`;
                updateProgressBar();
            } else {
                clearInterval(timerInterval);
                disableChoices();
                showLeaderboard();
            }
        }, 1000);
    }
//Progressbar
    function updateProgressBar() {
        const progress = ((30 - timeRemaining) / 30) * 100;
        progressBarElement.style.width = `${progress}%`;
    }

    function selectAnswer(event) {
        const selectedChoice = event.target;
        const isCorrect = selectedChoice.dataset.correct === "true";
        selectedChoice.classList.add(isCorrect ? "correct" : "incorrect");
        disableChoices();
        continueButton.disabled = false;
        if (isCorrect) score++;
    }

    function disableChoices() {
        const choices = choicesElement.querySelectorAll(".choice");
        choices.forEach(choice => {
            choice.disabled = true;
            choice.classList.add(choice.dataset.correct === "true" ? "correct" : "incorrect");
        });
    }
//QuizContinue button
    continueButton.addEventListener("click", () => {
        if (currentQuestionIndex < quizData.question.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            clearInterval(timerInterval);
            showLeaderboard();
        }
    });
//Leadgerboatd
    function showLeaderboard() {
        clearInterval(timerInterval);
        playerPhotoElement.src = "images/Frogita - Telegram Animated Stickers.gif";
        totalQuestionsElement.innerText = quizData.question.length;
        scoreElement.innerText = `${score} / ${quizData.question.length}`;
        timeTakenElement.innerText = `${60 - timeRemaining}s`;
        leaderboardOverlay.style.display = "flex";
        updateUserName('player-name');

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
                }, 1300); // Adjust the delay time as needed (in milliseconds)
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
