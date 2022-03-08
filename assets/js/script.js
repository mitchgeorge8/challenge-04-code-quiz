// When the "Start Quiz" button is selected, that page disappears and the quiz begins
// During the quiz, the timer is running down
// During the quiz, every button leads to the next question until all questions have been answered
// Each question has 4 multiple choice options, and each option is a button
// Once all questions have been answered, the timer stops and displays time as score

var timerEl = document.querySelector("#timer");
var pageContentEl = document.querySelector("#page-content");
var quizStartEl = document.querySelector("#quiz-start");
var quizQuestionEl = document.querySelector("#quiz-question");
var questionH1El = document.querySelector("#question-h1");
var optionEl1 = document.querySelector("#option1");
var optionEl2 = document.querySelector("#option2");
var optionEl3 = document.querySelector("#option3");
var optionEl4 = document.querySelector("#option4");
var questionH2El = document.querySelector("#question-h2");
var quizFinishEl = document.querySelector("#quiz-finish");
var finalScoreEl = document.querySelector("#final-score");
var quizHighScoresEl = document.querySelector("#quiz-high-scores");
var highScoresOlEl = document.querySelector("#high-scores-ol");

var questionsArr = [
    "Commonly used data types DO NOT include:",
    "The condition in an if/else statement is enclosed with _____.",
    "Arrays in JavaScript can be used to store _____.",
    "String values must be enclosed within _____ when being assigned to variables",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
];

var answersArr = [
    "Strings","Booleans","Alerts","Numbers",
    "Quotes","Curly brackets","Parenthesis","Square brackets",
    "Numbers and strings","Other arrays","Booleans","All of the above",
    "Commas","Curly brackets","Quotes","Parenthesis",
    "JavaScript","Terminal/Bash","For loops","Console.log"
];

var correctAnswersArr = [
    "option3",
    "option3",
    "option4",
    "option3",
    "option4"
];

var highScores = [];

var targetEl;
var timer;
var quizTime = 75;
var questionId = 0;
var answerId = 0;
var finalScore = 0;
var initials;
var scoreDataObj;

function buttonHandler(event) {
    targetEl = event.target;
    console.log(targetEl);

    switch(true) {
        case targetEl.matches("#high-scores"):
            viewHighScores();
            break;
        case targetEl.matches("#start-quiz"):
            startQuiz();
            break;
        case targetEl.matches(".btn-answer"):
            nextQuestion();
            break;
        case targetEl.matches("#save-high-score"):
            submitScore();
            break;
        case targetEl.matches("#go-back"):
            goBack();
            break;
        case targetEl.matches("#clear-high-scores"):
            clearHighScores();
            break;
    }
};

function viewHighScores() {
    quizStartEl.style.display = "none";
    quizFinishEl.style.display = "none";
    questionH2El.style.display = "none";
    quizHighScoresEl.style.display = "block";
};

function startQuiz() {
    quizStartEl.style.display = "none";
    document.querySelector("#high-scores").style.display = "none"
    quizQuestionEl.style.display = "block";

    // Reset variables
    questionId = 0;
    answerId = 0;
    quizTime = 75;

    // Start the quiz
    timeCountDown();
    timer = setInterval(timeCountDown, 1000);

    // Add question content
    addQuestionContent();
};

function nextQuestion() {
    if (questionId >= questionsArr.length) {
        quizFinishContent();
    }
    checkAnswer(targetEl.id);
    addQuestionContent();
};

function submitScore() {
    initials = document.querySelector("input[name='initials']").value;

    if (!initials) {
        alert("High score cannot be saved without initials!")
        return false;
    }

    scoreDataObj = {
        init: initials,
        score: finalScore
    };

    if (!highScores) {
        highScores = [];
    }

    highScores.push(scoreDataObj);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    loadHighScores();

    document.querySelector("input[name='initials']").value = "";
    viewHighScores();
};

function goBack() {
    quizHighScoresEl.style.display = "none";
    quizFinishEl.style.display = "none";
    questionH2El.style.display = "none";
    quizStartEl.style.display = "block";
    timerEl.textContent = "Time: 0";
};

function clearHighScores() {
    if (highScoresOlEl.firstChild) {
        clear = confirm("Are you sure you want to clear high scores?")

        if (clear = true) {
            while (highScoresOlEl.firstChild) {
                highScoresOlEl.removeChild(highScoresOlEl.firstChild);
            }
            highScores = [];
            localStorage.clear();
        }
        else {
            return false;
        }
    }
};

function timeCountDown() {
    timerEl.textContent = "Time: " + quizTime;
    quizTime--;
};

function addQuestionContent() {
    questionH1El.innerHTML = questionsArr[questionId];
    questionId++;

    optionEl1.innerHTML = "1. " + answersArr[answerId];
    answerId++;
    optionEl2.innerHTML = "2. " + answersArr[answerId];
    answerId++;
    optionEl3.innerHTML = "3. " + answersArr[answerId];
    answerId++;
    optionEl4.innerHTML = "4. " + answersArr[answerId];
    answerId++;
};

function checkAnswer(optionId) {
    if (optionId === correctAnswersArr[questionId - 1]) {
        questionH2El.innerHTML = "Correct!";
    }
    else {
        questionH2El.innerHTML = "Wrong!";
        quizTime = quizTime - 10;
    }
    questionH2El.style.display = "block";
};

function quizFinishContent() {
    quizQuestionEl.style.display = "none";
    quizFinishEl.style.display = "block";
    document.querySelector("#high-scores").style.display = "inline"

    clearInterval(timer);
    checkAnswer(targetEl.id);

    timerEl.textContent = "Time: " + (quizTime + 1);
    finalScore = quizTime + 1;

    finalScoreEl.innerHTML = "Your final score is " + finalScore;
};

function loadHighScores() {
    var retreived = localStorage.getItem("highScores");
    highScores = JSON.parse(retreived);

    if (!highScores) {
        return false;
    }

    for (var i = 0; i < highScores.length; i++) {
        var highScoreItemEl = document.createElement("li");
        highScoreItemEl.innerHTML = (i + 1) + ". " + highScores[i].init + ": " + highScores[i].score;
        highScoresOlEl.appendChild(highScoreItemEl);
    };
};

pageContentEl.addEventListener("click", buttonHandler);

loadHighScores();
