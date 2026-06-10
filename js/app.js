let allQuestions = [];

const startBtn = document.getElementById('start-btn');

startBtn.disabled = true;
startBtn.textContent = 'Đang tải câu hỏi...';

import('./questions.js').then(module => {
  allQuestions = module.allQuestions;
  console.log("Questions loaded:", allQuestions.length);
  startBtn.disabled = false;
  startBtn.textContent = 'BẮT ĐẦU THỰC HIỆN';
}).catch(err => {
  console.error("Failed to load questions:", err);
  startBtn.disabled = false;
  startBtn.textContent = 'Tải câu hỏi thất bại';
  alert('Không thể tải dữ liệu câu hỏi. Vui lòng tải lại trang.');
});

import {
  shuffleArray,
  getFeedbackByScore,
  showScreen
} from './utils.js';

import {
  generateQuizSet,
  renderQuestion,
  updateProgress
} from './quiz.js';

import {
  exportCertificatePNG
} from './certificate.js';

import {
  sendResultToSheet
} from './sheets.js';

const PASS_PERCENTAGE = 75;
const TOTAL_QUESTIONS = 30;

let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let user = {
  name: '',
  email: ''
};

const nextBtn = document.getElementById('next-btn');
const retryBtn = document.getElementById('retry-btn');
const downloadBtn = document.getElementById('download-certificate-btn');

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', resetQuiz);
downloadBtn.addEventListener('click', () => {
  exportCertificatePNG(user, score, TOTAL_QUESTIONS);
});

function startQuiz() {

  if (!allQuestions || allQuestions.length === 0) {
    alert('Dữ liệu câu hỏi đang tải. Vui lòng thử lại sau giây lát.');
    return;
  }

  const name = document.getElementById('username').value.trim();
  const email = document.getElementById('useremail').value.trim();

  if (!name || !email) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  user.name = name;
  user.email = email;

  initializeQuiz();

  showScreen('quiz-screen');

  loadQuestion();
}

function initializeQuiz() {

  score = 0;
  currentQuestionIndex = 0;

  quizData = generateQuizSet(allQuestions);

  console.log("ALL QUESTIONS:", allQuestions);
  console.log("ALL QUESTIONS LENGTH:", allQuestions.length);
  console.log("QUIZ DATA:", quizData);
  console.log("QUIZ DATA LENGTH:", quizData.length);
}

function loadQuestion() {

  const currentQuestion = quizData[currentQuestionIndex];

  renderQuestion(
    currentQuestion,
    currentQuestionIndex,
    TOTAL_QUESTIONS,
    handleAnswerSelection
  );

  updateProgress(currentQuestionIndex, TOTAL_QUESTIONS);
}

function handleAnswerSelection(isCorrect) {

  if (isCorrect) {
    score++;
  }

  nextBtn.classList.remove('hidden');
}

function nextQuestion() {

  currentQuestionIndex++;

  if (currentQuestionIndex >= quizData.length) {
    finishQuiz();
    return;
  }

  nextBtn.classList.add('hidden');

  loadQuestion();
}

function finishQuiz() {

  const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);

  const passed = percentage >= PASS_PERCENTAGE;

  const feedback = getFeedbackByScore(percentage);

  document.getElementById('score-display').innerText = `${score}/${TOTAL_QUESTIONS}`;

  document.getElementById('percentage-display').innerText = `${percentage}% chính xác`;

  document.getElementById('feedback-title').innerText = feedback.title;

  document.getElementById('feedback-message').innerText = feedback.message;

  document.getElementById('encouragement-message').innerText = feedback.encouragement;

  const statusBadge = document.getElementById('status-badge');

  statusBadge.innerText = passed ? 'PASSED' : 'NOT YET';

  statusBadge.className = `status-badge ${passed ? 'pass' : 'fail'}`;

  if (passed) {
    document.getElementById('certificate-actions').classList.remove('hidden');
  }

  document.getElementById('cert-name').innerText = user.name;

  document.getElementById('cert-score').innerText = `${score}/${TOTAL_QUESTIONS} (${percentage}%)`;

  // document.getElementById('cert-feedback').innerText = feedback.title;

  const certDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  document.getElementById('cert-date').innerText = certDate;

  sendResultToSheet({
    name: user.name,
    email: user.email,
    score,
    percentage,
    passed, 
  });

  showScreen('result-screen');
}

function resetQuiz() {

  document.getElementById('certificate-actions').classList.add('hidden');

  showScreen('login-screen');
}
