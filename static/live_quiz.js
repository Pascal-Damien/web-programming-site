// =====================================================================
// Week 7 — Live Quiz (STARTER). Fill in the // TODO parts yourself.
// File: static/live_quiz.js  (loaded by templates/live_quiz.html)
//
// The server provides:
//   GET /api/questions/count   -> { "count": N }
//   GET /api/question/<i>      -> { index, question, choices, answer, explanation }
// Use RELATIVE paths (e.g. "/api/question/0") so it works on localhost AND on Render.
// =====================================================================

// --- Elements ---
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const qNumberEl = document.getElementById("q-number");
const qTextEl = document.getElementById("q-text");
const choicesEl = document.getElementById("choices");
const firstBtn = document.getElementById("first");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const lastBtn = document.getElementById("last");
const submitBtn = document.getElementById("submit");
const resultsEl = document.getElementById("results");

// --- State ---
let total = 0; // how many questions (from the server)
let current = 0; // which question is showing (0-based)
const userAnswers = []; // userAnswers[i] = chosen choice index
const cache = {}; // cache[i] = the fetched question object

// --- Helper: fetch one question (with caching) ---
async function getQuestion(index) {
  // TODO:
  //  - if cache[index] exists, return it
  //  - otherwise: await fetch(`/api/question/${index}`)
  //  - check response.ok; if not ok, throw an error
  //  - const data = await response.json();
  //  - store in cache and return it
}

// --- Show one question in the page ---
async function showQuestion(index) {
  // TODO:
  //  - show the loading message, hide the error
  //  - try { const q = await getQuestion(index); ... render it ... }
  //    render: q-number ("Question i+1 of total"), q-text, and a radio for each choice
  //    restore the saved answer (userAnswers[index]) if any
  //  - catch (e) { show the error message }
  //  - finally { hide the loading message }
  //  - update which nav buttons are disabled (first/prev on 0, next/last on total-1)
}

// --- Save the selected answer for the current question ---
function saveAnswer(choiceIndex) {
  // TODO: userAnswers[current] = choiceIndex;
}

// --- Submit: score, percentage, message, correction ---
async function submitQuiz() {
  // TODO:
  //  - make sure every question is fetched (loop 0..total-1 with await getQuestion(i))
  //  - count correct answers, compute percentage, pick a message
  //  - build the correction and show the results section
}

// --- Start ---
async function init() {
  // TODO:
  //  - await fetch("/api/questions/count"), check ok, read { count }
  //  - set total, then showQuestion(0)
  //  - wire the buttons (first/prev/next/last/submit) with addEventListener
}

init();
