// ======================================================
// QUESTIONS
// ======================================================
const questions = [
  {
    question:
      "Which keyword declares a block-scoped variable that can later be reassigned?",
    choices: ["var", "let", "const", "static"],
    answer: 1,
    explanation:
      "let declares a block-scoped variable whose value may later be reassigned.",
  },
  {
    question: "Which JavaScript operator tests strict equality?",
    choices: ["=", "==", "===", "!="],
    answer: 2,
    explanation: "The === operator compares both value and type.",
  },
  {
    question:
      "Which property gives the number of elements in a JavaScript array?",
    choices: ["size", "length", "count", "length()"],
    answer: 1,
    explanation:
      "The length property contains the number of elements in an array.",
  },
  {
    question: "Which string method converts a string to uppercase?",
    choices: ["upper()", "toUpperCase()", "uppercase()", "capitalize()"],
    answer: 1,
    explanation:
      "toUpperCase() returns a new string containing uppercase characters.",
  },
  {
    question: "Which array method adds an element to the end of an array?",
    choices: ["add()", "append()", "push()", "insert()"],
    answer: 2,
    explanation: "push() adds one or more elements to the end of an array.",
  },
  {
    question:
      "Which control structure repeatedly executes code while a condition remains true?",
    choices: ["if", "switch", "while", "break"],
    answer: 2,
    explanation:
      "A while loop continues executing while its condition evaluates to true.",
  },
  {
    question: "Which is a valid JavaScript function declaration?",
    choices: [
      "function greet() {}",
      "def greet():",
      "func greet() {}",
      "function = greet() {}",
    ],
    answer: 0,
    explanation:
      "A standard JavaScript function declaration begins with the function keyword.",
  },
  {
    question:
      'Given const student = { name: "John", age: 20 }; which expression accesses the name property using dot notation?',
    choices: ["student:name", "student->name", "student.name", "student::name"],
    answer: 2,
    explanation:
      "Dot notation accesses an object property using objectName.propertyName.",
  },
  {
    question: "Which keyword sends a value back from a function?",
    choices: ["break", "return", "continue", "yield"],
    answer: 1,
    explanation:
      "The return statement ends the function and optionally sends a value back to the caller.",
  },
  {
    question: 'What is the result of typeof "hello"?',
    choices: ["text", "String", "string", "object"],
    answer: 2,
    explanation:
      'JavaScript\'s typeof operator returns "string" for a string value.',
  },
];

// ======================================================
// APPLICATION STATE
// ======================================================
let currentQuestion = 0;
const userAnswers = new Array(questions.length);

// ======================================================
// SAVE AN ANSWER
// ======================================================
function saveAnswer(choiceIndex) {
  userAnswers[currentQuestion] = choiceIndex;
}

// ======================================================
// NAVIGATION
// ======================================================
function goNext() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  }
}

function goPrevious() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function goFirst() {
  currentQuestion = 0;
  renderQuestion();
}
function goLast() {
  currentQuestion = questions.length - 1;
  renderQuestion();
}

// ======================================================
// CALCULATE SCORE
// ======================================================
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// ======================================================
// CALCULATE PERCENTAGE
// ======================================================
function calculatePercentage(score) {
  const percentage = (score / questions.length) * 100;
  return Math.round(percentage);
}

// ======================================================
// PERFORMANCE MESSAGE
// ======================================================
function getPerformanceMessage(percentage) {
  if (percentage >= 80) {
    return "Excellent";
  } else if (percentage >= 60) {
    return "Good";
  } else if (percentage >= 50) {
    return "Pass";
  } else {
    return "Needs improvement";
  }
}

// ======================================================
// BUILD CORRECTION
// ======================================================
function buildCorrection() {
  let correction = "";
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const userAnswerIndex = userAnswers[i];
    correction += `Question ${i + 1}: ${q.question}\n\n`;
    // ----------------------------------------------
    // USER ANSWER
    // ----------------------------------------------
    if (userAnswerIndex === undefined) {
      correction += "Your answer: Not answered\n";
    } else {
      correction += `Your answer: ${q.choices[userAnswerIndex]}\n`;
    }
    // ----------------------------------------------
    // CORRECT ANSWER
    // ----------------------------------------------
    correction += `Correct answer: ${q.choices[q.answer]}\n`;
    // ----------------------------------------------
    // RESULT
    // ----------------------------------------------
    if (userAnswerIndex === q.answer) {
      correction += "Result: Correct\n";
    } else {
      correction += "Result: Incorrect\n";
    }
    // ----------------------------------------------
    // EXPLANATION
    // ----------------------------------------------
    correction += `Explanation: ${q.explanation}\n`;
    correction += "\n----------------------------------------\n\n";
  }
  return correction;
}

// ======================================================
// SUBMIT QUIZ
// ======================================================
function submitQuiz() {
  const score = calculateScore();
  const percentage = calculatePercentage(score);
  const message = getPerformanceMessage(percentage);
  const correction = buildCorrection();
  showResults(score, percentage, message, correction);
}

// ======================================================
// PROVIDED INTERFACE CODE
//
// DOM manipulation and events will be studied later.
// ======================================================
function renderQuestion() {
  const q = questions[currentQuestion];

  // --------------------------------------------------
  // QUESTION NUMBER
  // --------------------------------------------------
  document.getElementById("progress").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  // --------------------------------------------------
  // QUESTION
  // --------------------------------------------------
  document.getElementById("questionText").textContent = q.question;

  // --------------------------------------------------
  // CHOICES
  // --------------------------------------------------
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";
  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");
    label.className = "choice";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = i;
    // Restore an answer previously selected
    // by the user.
    if (userAnswers[currentQuestion] === i) {
      radio.checked = true;
    }
    // When the user selects this answer,
    // save its index.
    radio.onclick = function () {
      saveAnswer(i);
    };
    label.appendChild(radio);
    label.appendChild(document.createTextNode(" " + q.choices[i]));
    choicesContainer.appendChild(label);
  }

  // --------------------------------------------------
  // NAVIGATION BUTTONS
  // --------------------------------------------------
  document.getElementById("firstBtn").disabled = currentQuestion === 0;
  document.getElementById("previousBtn").disabled = currentQuestion === 0;
  document.getElementById("nextBtn").disabled =
    currentQuestion === questions.length - 1;
  document.getElementById("lastBtn").disabled =
    currentQuestion === questions.length - 1;
}

// ======================================================
// DISPLAY RESULTS
// ======================================================
function showResults(score, percentage, message, correction) {
  document.getElementById("quizPanel").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  document.getElementById("scoreText").textContent =
    `Score: ${score} / ${questions.length}`;
  document.getElementById("percentageText").textContent =
    `Percentage: ${percentage}%`;
  document.getElementById("performanceText").textContent = message;
  document.getElementById("correction").textContent = correction;
}

// ======================================================
// START APPLICATION
// ======================================================
renderQuestion();
