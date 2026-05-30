import {
  shuffleArray
} from './utils.js';

const MUSIC_CATEGORIES = [
  'Diction',
  'Dynamics & Tempo',
  'Ear Training',
  'Harmony',
  'Note Reading',
  'Rhythm & Meter',
  'Sight-reading'
];

const LITURGICAL_CATEGORY = 'Liturgical Literacy';

export function generateQuizSet(allQuestions) {

  const musicQuestions = allQuestions.filter(q =>
    MUSIC_CATEGORIES.includes(q.category)
  );

  const liturgicalQuestions = allQuestions.filter(q =>
    q.category === LITURGICAL_CATEGORY
  );

  const selectedMusic = shuffleArray(musicQuestions).slice(0, 22);

  const selectedLiturgical = shuffleArray(liturgicalQuestions).slice(0, 8);

  return shuffleArray([
    ...selectedMusic,
    ...selectedLiturgical
  ]);
}

export function renderQuestion(
  question,
  index,
  total,
  callback
) {

  document.getElementById('progress-text').innerText =
    `Câu hỏi ${index + 1}/${total}`;

  document.getElementById('category-text').innerText =
    question.category;

  document.getElementById('question-text').innerText =
    question.question;

  const answersContainer = document.getElementById('answers-container');

  answersContainer.innerHTML = '';

  const shuffledAnswers = shuffleArray([...question.answers]);

  shuffledAnswers.forEach(answer => {

    const button = document.createElement('button');

    button.className = 'answer-btn';

    button.innerText = answer;

    button.addEventListener('click', () => {

      const buttons = document.querySelectorAll('.answer-btn');

      buttons.forEach(btn => btn.disabled = true);

      const isCorrect = answer === question.correctAnswer;

      if (isCorrect) {
        button.classList.add('correct');
      } else {
        button.classList.add('wrong');

        buttons.forEach(btn => {
          if (btn.innerText === question.correctAnswer) {
            btn.classList.add('correct');
          }
        });
      }

      document.getElementById('explanation-text').innerText =
        question.explanation;

      document.getElementById('explanation-box').classList.remove('hidden');

      callback(isCorrect);
    });

    answersContainer.appendChild(button);
  });
}

export function updateProgress(index, total) {

  const percentage = ((index) / total) * 100;

  document.getElementById('progress-fill').style.width = `${percentage}%`;

  document.getElementById('explanation-box').classList.add('hidden');
}
