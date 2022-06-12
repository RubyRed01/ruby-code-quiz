//questions array
var questions = [
    {
        question:  "Which of these is NOT a data type?",
        choices: ["string", "number", "prompt", "boolean"],
        answer: 2
    },
    {
        question: "Who was the first person ever to develop JavaScript?",
        choices: ["Brendan Fraser", "Brendan Urie", "Brandon Flowers", "Brendan Eich"],
        answer: 3
    },
    {
        question: "What will the following code do?: console.log('Hello World!')",
        choices: ["Generates a new world in reality.", "Will print 'Hello World!' to the console", "Will open the gates to hell and we all have to be saved by our lord and saviour DoomGuy.", "Puppy appears in your time of need."],
        answer: 2
    },
    {
        question: "What does JSON stand for?",
        choices: ["JavaScript Object Notation", "Jabba Seen On NATGEO", "Din Djarin Is A Cutie", "JavaScript Only Noobs"],
        answer: 0
    },
    {
        question: "Which one is actually a string?",
        choices: ["[Never say never]", "!Never say never!", "478", "'478'",],
        answer: 3
    }
]

//variables for elements
var timerEl = document.getElementById("timer")
var intro = document.getElementById("intro")
var questionSection = document.getElementById('quizQuestion')
var start = document.getElementById("startBtn")
var questionTitle = document.getElementById('heading-question-title')
var questionChoices = document.getElementById('question-choices')
var returnBtn = document.getElementById('return-button')
const nameInput = document.createElement('input')

var currentQuestion = 0

//for storing high scores locally
var highScores = JSON.parse(localStorage.getItem("highScores"));
if (highScores == null) {
    highScores = [];
}

//Endgame function to be applied later
function endGame() {
    timerEl.classList.add('hide')
    questionChoices.classList.add('hide')
    questionTitle.textContent = "You scored " +timer+ " points"
    
    nameInput.type = "text";
    nameInput.setAttribute("id","nameInput")
    questionSection.append(nameInput)
    
    
}

//adding the timer as the score and initials
nameInput.addEventListener("change",function() {
    highScores.push({ name: nameInput.value , time: timer})
    localStorage.setItem("highScores", JSON.stringify(highScores))
    questionSection.textContent = ""
    questionTitle.textContent = "HIGH SCORES"

    for (var index = 0; index < highScores.length; index++) {
        var stringP= document.createElement('p');
        stringP.textContent = highScores[index].name+": "+highScores[index].time
        questionSection.append(stringP)

    }
    
})

//Asking question function
function askQuestion(qid) {
    questionTitle.textContent = questions[qid].question;

    //clears the question section area
    questionChoices.textContent ="";

    // loop thru choices in question data
    for (let index = 0; index < questions[qid].choices.length; index++) {
        const choice = questions[qid].choices[index];
        
        // create a new li each time, 
        const li = document.createElement('li')

        //button created for choices
        const choiceBtn = document.createElement('button');

        choiceBtn.textContent = choice;

        //Creates class for choice button
        choiceBtn.classList.add('choice-btn');

        choiceBtn.setAttribute("id", index);

        li.append(choiceBtn);

        questionChoices.append(li);

        questionChoices.append(li)
    }
}

//timer starts at 100
timer = 100;
function startTimer(){
var myTimer = setInterval(function () {

    //counts down by 1 second intervals
    timer--
    
    timerEl.textContent = timer
    if (timer <= 0) {
        clearInterval(myTimer)
        endGame()
    }

    },1000)     
}

//Start button commencing the game
start.addEventListener('click', function(event){
    startTimer()
    intro.classList.add('hide');
    questionSection.classList.remove('hide');
    askQuestion(currentQuestion)
})

questionChoices.addEventListener("click", function(event){
    if (event.target.id == questions[currentQuestion].answer)
    {
      timer=timer+5
    }
    

    else 
    {
      timer=timer-10
    }

    
    currentQuestion++
    if(currentQuestion == questions.length) {
        endGame()
    }
    else {
        askQuestion(currentQuestion)
    }
    
})
