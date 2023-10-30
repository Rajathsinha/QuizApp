const question=[
{
    question:"What is the purpose of the JSON.parse() method in JavaScript?",
    answers: [
        {text:"A) To stringify a JavaScript object",correct:false},
        {text:"B) To parse a JSON string into a JavaScript object",correct:true},
        {text:"C) To remove an element from an array",correct:false},
        {text:"D) To convert a JavaScript object to a JSON string",correct:false},
    ]
    
},
 {
    question:"Which of the following methods is used to add an element to the end of an array in JavaScript?",
    answers: [
        {text:"A) push()",correct:true},
        {text:"B) unshift()",correct:false},
        {text:"C) splice()",correct:false},
        {text:"D) concat()",correct:false},
    ]
 },
 {
    question:"What does the this keyword refer to in JavaScript?",
    answers: [
        {text:"A) The current function's parameters",correct:false},
        {text:"B) The global object (e.g., window in a browser)",correct:false},
        {text:"C) The calling function",correct:false},
        {text:"D) The current object that the function is a method of",correct:true},
    ]
 },
 {
    question:"What is the purpose of the localStorage object in JavaScript?",
    answers: [
        {text:"A) To make HTTP requests to a server",correct:false},
        {text:"B) To store key-value pairs in the browser for data persistence",correct:true},
        {text:"C) To fetch data from an external API",correct:false},
        {text:"D) To control the visibility of HTML elements",correct:false},
    ]
 },{
    question:"What is the purpose of the addEventListener method in JavaScript?",
    answers: [
        {text:"A) To add a new HTML element to the page",correct:false},
        {text:"B) To remove an HTML element from the page",correct:false},
        {text:"C) To attach an event handler to an HTML element",correct:true},
        {text:"D) To change the style of an HTML element",correct:false},
    ]
 }
]
const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");


let currentQuestionIndex =0
let score=0

 function startQuiz(){
    currentQuestionIndex =0
    let score=0
    nextbutton.innerHTML="Next";
    showQuestion(); 
 }

 function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML= questionNo+ "." +currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button)

        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
 }

function resetState(){
    nextbutton.style.display="none"
    while(answerbuttons.firstChild)
    {
        answerbuttons.removeChild(answerbuttons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add('correct')
        }
        button.disabled= true;
    })
    nextbutton.style.display="block"

}
function showScore()
{
    resetState();
    questionElement.innerHTML= `you Scored ${score} out of ${question.length}!`;
    nextbutton.innerHTML="Play Again!"

    nextbutton.style.display="block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex<question.length)
    {
        handleNextButton()

    }
    else{
        startQuiz();
    }
})



 startQuiz()