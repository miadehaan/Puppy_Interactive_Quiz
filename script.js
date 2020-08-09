var startBtn = document.querySelector(".startQuiz");
var resetBtn = document.querySelector(".resetBtn");
var questionEl = document.querySelector(".question");
var choices = document.querySelector(".choices");
var clock = document.querySelector(".clock");
var formEl = document.querySelector(".form");
var scoreTracker = document.querySelector(".scoreTracker");
var scoreBoard = document.querySelector(".scoreBoard");
var topSection = document.querySelector(".topSection");
var bottomSection = document.querySelector(".bottomSection");

var currentIndex = 0;
var score = 0;
var scoreTitle = "";
var scoreList = "";
var gameTimer;
var totalTime; //Seconds


// Use Objects to list out questions/choices/answer
var questions = [
    {
        title: "Question 1: Which of the following statements is true?",
        choices: ["Puppies are born with teeth", "Puppies are born blind & deaf", "Puppies don't drink a lot water"],
        answer: "Puppies are born blind & deaf"
    },
    {
        title: "Question 2: Why are dog noses wet?",
        choices: ["It's how they sweat", "To show when they are sick", "To help absorb scent chemicals"],
        answer: "To help absorb scent chemicals"
    },
    {
        title: "Question 3: How many different types of dog breeds are there?",
        choices: ["79", "564", "360", "190"],
        answer: "360"
    },
    {
        title: "Question 4: What is the most rare type of dog?",
        choices: ["Norwegian Lundehund", "Chihuahua", "Hairless Terrier"],
        answer: "Norwegian Lundehund"
    },
    {
        title: "Question 5: What's the average weight of an adult Ovcharka Caucasian Mountain Dog?",
        choices: ["50 lbs", "200 lbs", "90 lbs"],
        answer: "200 lbs"
    }
];

//Start the whole quiz or reset the quiz
startBtn.addEventListener("click", startQuiz);
resetBtn.addEventListener("click", reset);

// Display each question and answer choices
function startQuiz() {
    scoreTitle.innerHTML = "";
    formEl.innerHTML = "";
    scoreList.innerHTML = ""; 
    scoreBoard.textContent = "";

    // Reset time and score from previous game
    currentIndex = 0;
    clock.textContent = 0;
    clearInterval(gameTimer);
    totalTime = 60;
    score = 0;
    scoreTracker.textContent = score;

    gameTimer = setInterval(timer, 1000);
    populateQuestion();
}

// Reset Button to re-Start the game
function reset() {
    currentIndex = 0;
    clock.textContent = 0;
    clearInterval(gameTimer);
    score = 0;
    scoreTracker.textContent = score;

    alert("You have reset the quiz - Click 'Start Quiz!' to restart the quiz!");
}

function populateQuestion() {
    //Accesses Array [0], then the corresponding property within, etc
    questionEl.textContent = questions[currentIndex].title; 
    choices.textContent = "";

    for (var i=0; i < questions[currentIndex].choices.length; i++) { 
        //create 'li' element and list out multiple choice options:
        var choiceNode = document.createElement("li");
        var buttonNode = document.createElement("button");

        buttonNode.setAttribute("value", questions[currentIndex].choices[i]);
        buttonNode.className = ("btn btn-outline-dark btn-block"); //style the buttons
        buttonNode.textContent = questions[currentIndex].choices[i];
        buttonNode.addEventListener("click", checkAnswer); // OR: buttonNode.onclick = checkAnswer; 

        choiceNode.appendChild(buttonNode);
        choices.appendChild(choiceNode); 
    }


}

// Check answer and track score
// If answer is wrong, deduct 1 pt and reduce the time
// IF asnwer is correct, add 1 pt to score
function checkAnswer() {
    if(this.value === questions[currentIndex].answer) {
        //change score +1 & display
        score++;
        scoreTracker.textContent = score;
    }
    else {
        // Change Score -1 & display  
        score--;
        scoreTracker.textContent = score;

        //subtract time
        totalTime-= 5;
        clock.textContent = totalTime;
    }

    // Check if last Q has been answered & end quiz if it has
        var check = questions.length - 1;
        if (currentIndex === check) {
            endQuiz();
        } 
        else {
            currentIndex++;
            populateQuestion();
        }

}

// Timer
function timer() {
    totalTime--;
    clock.textContent = totalTime;

    if (totalTime <= 0){ 
        endQuiz();
    }

}

function endQuiz() {
    clearInterval(gameTimer);

    // clear question & multiple choice answers
    questionEl.textContent = ""; 
    choices.textContent = "";
    
    var quizOver = document.createElement("h2");
    quizOver.innerHTML = "You've reached the end of the quiz!";
    topSection.appendChild(quizOver);

    //Once game is over, have user input and submit their initials
    var initialsEl = document.createElement("input");
    var submitEl = document.createElement("button");

    initialsEl.placeholder = "Enter You Initials Here";
    submitEl.textContent = "Submit";
    
    formEl.appendChild(initialsEl);
    formEl.appendChild(submitEl);


    submitEl.addEventListener("click", function(event) {
        event.preventDefault(); 
        formEl.textContent = ""; //hide the input form
        quizOver.innerHTML = "";

        //Display all highscores w/ user initials
        scoreTitle = document.createElement("h2");
        scoreTitle.innerHTML = "High Scores: ";
        scoreTitle.setAttribute("style", "text-align: center;");

        // Save my initials and score in localStorage
        var userName = initialsEl.value.trim(); //saves user initials from input form
        localStorage.setItem(userName, score);
        // localStorage.getItem(userName, score);

        scoreList.innerHTML = "";
        scoreBoard.textContent = "";
        for (var i=0; i < localStorage.length; i++)   {
            scoreList = document.createElement("li");
            scoreList.textContent = localStorage.key(i) + ":  " + localStorage.getItem(localStorage.key(i));
           
            scoreBoard.appendChild(scoreList);
            formEl.append(scoreBoard);
        }
        topSection.appendChild(scoreTitle);

    });
}

