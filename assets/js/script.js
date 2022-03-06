// When the "Start Quiz" button is selected, that page disappears and the quiz begins
// During the quiz, the timer is running down
// During the quiz, every button leads to the next question until all questions have been answered
// Each question has 4 multiple choice options, and each option is a button
// Once all questions have been answered, the timer stops and displays time as score

var timerEl = document.querySelector("#timer");
var pageContentEl = document.querySelector("#page-content");
var quizStartEl = document.querySelector("#quiz-start");
var quizQuestionEl = document.querySelector("#quiz-question");

var startTime = 75;

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
]

var buttonHandler = function(event) {
    var targetEl = event.target;

    console.log(targetEl);

    switch(true) {
        case targetEl.matches("#start-quiz"):
            // Hide quizStartEl at the beginning of the quiz
            quizStartEl.style.display = "none";

            // Start the quiz
            runQuiz(0);

            break;
        case targetEl.matches(".btn-answer"):
            checkAnswer()

            break;
    }
    
}

function runQuiz(questionId) {
    if (questionId < questionsArr.length) {

        timeCountDown();
        var quizTime = setInterval(timeCountDown, 1000);

        createQuizQuestion(questionId);
    }
    else {
        clearInterval(quizTime);
        var quizScore = startTime;
        console.log(quizScore);
    }
}

function timeCountDown() {
    timerEl.textContent = "Time: " + startTime;
    startTime--;
}

function createQuizQuestion(questionId) {
    var questionEl = document.createElement("h1");
    questionEl.innerHTML = questionsArr[questionId];
    quizQuestionEl.appendChild(questionEl);

    var answersEl = document.createElement("ol");

    var listItemEl1 = document.createElement("li");
    var listItemEl2 = document.createElement("li");
    var listItemEl3 = document.createElement("li");
    var listItemEl4 = document.createElement("li");

    listItemEl1.innerHTML = "<button class='btn btn-answer' id='option1'>1. " + answersArr[questionId] + "</button>";
    listItemEl2.innerHTML = "<button class='btn btn-answer' id='option2'>2. " + answersArr[questionId + 1] + "</button>";
    listItemEl3.innerHTML = "<button class='btn btn-answer' id='option3'>3. " + answersArr[questionId + 2] + "</button>";
    listItemEl4.innerHTML = "<button class='btn btn-answer' id='option4'>4. " + answersArr[questionId + 3] + "</button>";

    answersEl.appendChild(listItemEl1);
    answersEl.appendChild(listItemEl2);
    answersEl.appendChild(listItemEl3);
    answersEl.appendChild(listItemEl4);

    quizQuestionEl.appendChild(answersEl);
}

pageContentEl.addEventListener("click", buttonHandler);
