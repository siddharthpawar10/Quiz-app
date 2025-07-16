const questions = [
  {
    question: "What planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "What galaxy do we live in?",
    options: ["Andromeda", "Whirlpool", "Milky Way", "Sombrero"],
    answer: "Milky Way",
  },
  {
    question: "What is the hottest planet in our solar system?",
    options: ["Mercury", "Mars", "Venus", "Jupiter"],
    answer: "Venus",
  },
  {
    question: "How many moons does Earth have?",
    options: ["1", "2", "4", "None"],
    answer: "1",
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const quizBox = document.getElementById("quiz-box");
const leaderboard = document.getElementById("scores-list");

function startQuiz() {
  resultEl.classList.add("hidden");
  quizBox.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  showQuestion();
  updateLeaderboard();
}

function showQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    optionsEl.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(option) {
  if (option === questions[currentQuestion].answer) score++;
  clearInterval(timer);
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizBox.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score}/${questions.length}`;
  saveScore(score);
  updateLeaderboard();
}

document.getElementById("next-btn").onclick = () => {
  clearInterval(timer);
  nextQuestion();
};

function startTimer() {
  timeLeft = 10;
  timeEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
}

function saveScore(score) {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push(score);
  scores = scores.slice(-5); // Keep top 5 recent
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function updateLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  leaderboard.innerHTML = "";
  scores
    .sort((a, b) => b - a)
    .forEach((s, i) => {
      const li = document.createElement("li");
      li.textContent = `#${i + 1} — ${s} pts`;
      leaderboard.appendChild(li);
    });
}

window.onload = startQuiz;
