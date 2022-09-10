'use strict';
//Players
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
//Players Initial Scores
let score0El = document.getElementById('score--0');
let score1El = document.getElementById('score--1');
//Players Current Score
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
//Buttons
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
//Set Initial Score to 0
score0El.textContent = 0;
score1El.textContent = 0;
//Show Total Score
let playing, scores, totalScore, activePlayer;
scores = [0, 0];
totalScore = 0;
activePlayer = 0;
//To have track of game
playing = true;
//Dice Img
let imgDice = document.querySelector('.dice');
imgDice.classList.add('hidden');

//Initialize everything to play again

const init = function () {
  scores = [0, 0];
  totalScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  imgDice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
//Switch Player Function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  totalScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Show Dice image
btnRoll.addEventListener('click', function () {
  if (playing) {
    imgDice.classList.remove('hidden');
    let diceVal = Math.trunc(Math.random() * 6) + 1;
    imgDice.src = `dice-${diceVal}.png`;

    if (diceVal !== 1) {
      totalScore = totalScore + diceVal;
      document.getElementById(`current--${activePlayer}`).textContent =
        totalScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += totalScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      imgDice.classList.add('hidden');
      document.querySelector(`#winner--${activePlayer}`).textContent =
        'Winner🥇';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
