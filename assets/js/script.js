// When the "Start Quiz" button is selected, that page disappears and the quiz begins
// During the quiz, the timer is running down
// During the quiz, every button leads to the next question until all questions have been answered
// Each question has 4 multiple choice options, and each option is a button
// Once all questions have been answered, the timer stops and displays time as score

var pageContentEl = document.querySelector("#page-content");
var quizStartEl = document.querySelector("#quiz-start");
var quizQuestionEl = document.querySelector("#quiz-question");

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

var buttonHandler = function(event) {
    var targetEl = event.target;

    console.log(targetEl);

    if (targetEl.matches("#start-quiz")) {
        runQuiz(0);
    }
}

var runQuiz = function(questionId) {
    quizStartEl.style.display = "none";

    var questionEl = document.createElement("h1");
    questionEl.innerHTML = questionsArr[questionId];
    quizQuestionEl.appendChild(questionEl);

    var answersEl = document.createElement("ol");

    var listItemEl1 = document.createElement("li");
    var listItemEl2 = document.createElement("li");
    var listItemEl3 = document.createElement("li");
    var listItemEl4 = document.createElement("li");

    listItemEl1.innerHTML = answersArr[questionId];
    listItemEl2.innerHTML = answersArr[questionId + 1];
    listItemEl3.innerHTML = answersArr[questionId + 2];
    listItemEl4.innerHTML = answersArr[questionId + 3];

    answersEl.appendChild(listItemEl1);
    answersEl.appendChild(listItemEl2);
    answersEl.appendChild(listItemEl3);
    answersEl.appendChild(listItemEl4);

    quizQuestionEl.appendChild(answersEl);
}

pageContentEl.addEventListener("click", buttonHandler);
