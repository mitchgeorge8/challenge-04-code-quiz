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

var startTime = 75;
var questionId = 0;

function buttonHandler(event) {
    var targetEl = event.target;

    switch(true) {
        case targetEl.matches("#start-quiz"):
            // Hide quizStartEl and unhide quizQuestionEl
            quizStartEl.style.display = "none";
            quizQuestionEl.style.display = "block";

            // Start the quiz
            quizStartStop(1);

            // Add question content
            addQuestionContent(questionId);
            break;
        case targetEl.matches(".btn-answer"):
            checkAnswer(targetEl.id);

            questionId++;
            addQuestionContent(questionId);
            break;
    }
    
};

function quizStartStop(value) {
    if (value === 1) {
        timeCountDown();
        var quizTime = setInterval(timeCountDown, 1000);
    }
    else if (value === 0) {
        clearInterval(quizTime)
    }
};

function timeCountDown() {
    timerEl.textContent = "Time: " + startTime;
    startTime--;
};

function addQuestionContent(questionId) {
    questionH1El.innerHTML = questionsArr[questionId];

    optionEl1.innerHTML = "1. " + answersArr[questionId];
    optionEl2.innerHTML = "2. " + answersArr[questionId + 1];
    optionEl3.innerHTML = "3. " + answersArr[questionId + 2];
    optionEl4.innerHTML = "4. " + answersArr[questionId + 3];
};

function checkAnswer(optionId) {
    if (optionId === correctAnswersArr[questionId]) {
        questionH2El.innerHTML = "Correct!"
    }
    else (
        questionH2El.innerHTML = "Wrong!"
    )
    questionH2El.style.display = "block";
};

pageContentEl.addEventListener("click", buttonHandler);
