const questions = [
  {
    category: "GEOGRAPHY",
    prompt: "What is the largest ocean on Earth?",
    answer: "pacific ocean",
    correctAnswer: "Pacific Ocean",
    note: "A good place to begin."
  },
  {
    category: "PLACES",
    prompt: "What is the capital of France?",
    answer: "paris",
    correctAnswer: "Paris",
    note: "Let's take a little trip."
  },
  {
    category: "SPACE",
    prompt: "Which planet is known as the Red Planet?",
    answer: "mars",
    correctAnswer: "Mars",
    note: "One last stop, way out there."
  }
];

const feedbackByScore = {
  0: "Try Again",
  1: "Keep Practicing",
  2: "Good Job",
  3: "Excellent"
};

const form = document.querySelector("#answer-form");
const answerInput = document.querySelector("#answer-input");
const answerFeedback = document.querySelector("#answer-feedback");
const nextButton = document.querySelector("#next-button");
const questionPanel = document.querySelector("#question-panel");
const completionPanel = document.querySelector("#completion-panel");
const progressSegments = [...document.querySelectorAll(".progress-segment")];

let questionIndex = 0;
let score = 0;

function renderQuestion() {
  const question = questions[questionIndex];

  document.querySelector("#question-index").textContent = String(questionIndex + 1).padStart(2, "0");
  document.querySelector("#question-category").textContent = question.category;
  document.querySelector("#question-text").textContent = question.prompt;
  document.querySelector("#progress-label").innerHTML = `QUESTION ${String(questionIndex + 1).padStart(2, "0")} <span class="muted">/ 03</span>`;
  document.querySelector("#progress-caption").textContent = question.note;
  document.querySelector("#progress-bar").setAttribute("aria-valuenow", String(questionIndex));
  document.querySelector("#score-count").textContent = String(score);

  progressSegments.forEach((segment, index) => {
    segment.classList.toggle("is-current", index === questionIndex);
    segment.classList.toggle("is-complete", index < questionIndex);
  });

  form.reset();
  form.hidden = false;
  answerInput.disabled = false;
  answerFeedback.hidden = true;
  answerFeedback.textContent = "";
  nextButton.hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = questions[questionIndex];
  const answer = answerInput.value.trim().toLowerCase();
  const isCorrect = answer === question.answer;

  if (isCorrect) {
    score += 1;
    answerFeedback.textContent = "Correct! Nicely done.";
    answerFeedback.dataset.result = "correct";
  } else {
    answerFeedback.textContent = `Not quite. The answer is ${question.correctAnswer}.`;
    answerFeedback.dataset.result = "incorrect";
  }

  document.querySelector("#score-count").textContent = String(score);
  answerFeedback.hidden = false;
  form.hidden = true;
  answerInput.disabled = true;
  nextButton.querySelector("span").textContent = questionIndex === questions.length - 1 ? "See your results" : "Next question";
  nextButton.hidden = false;
  nextButton.focus();
});

nextButton.addEventListener("click", () => {
  questionIndex += 1;

  if (questionIndex === questions.length) {
    showResults();
    return;
  }

  renderQuestion();
  answerInput.focus();
});

function showResults() {
  questionPanel.hidden = true;
  completionPanel.hidden = false;
  document.querySelector("#progress-label").textContent = "ROUND COMPLETE";
  document.querySelector("#progress-caption").textContent = "Every answer is a new thing learned.";
  document.querySelector("#progress-bar").setAttribute("aria-valuenow", String(questions.length));
  document.querySelector("#score-count").textContent = String(score);
  document.querySelector("#completion-title").textContent = `${feedbackByScore[score]}.`;
  document.querySelector("#completion-copy").textContent = `You got ${score} out of ${questions.length} questions right. Thanks for taking the scenic route through the facts.`;

  progressSegments.forEach((segment) => {
    segment.classList.remove("is-current");
    segment.classList.add("is-complete");
  });

  document.querySelector("#restart-button").focus();
}

document.querySelector("#restart-button").addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  questionPanel.hidden = false;
  completionPanel.hidden = true;
  renderQuestion();
  answerInput.focus();
});

renderQuestion();