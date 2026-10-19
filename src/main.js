import { createDeck, formatTime } from "./game.js";

const $ = id => document.getElementById(id);
let cards = [];
let revealed = [];
let moves = 0;
let matchedPairs = 0;
let seconds = 0;
let timerId = null;
let mismatchTimeout = null;
let locked = false;
let finished = false;

function updateStats() {
  $("moves-value").textContent = moves;
  $("pairs-value").textContent = `${matchedPairs} / 8`;
  $("time-value").textContent = formatTime(seconds);
}

function startTimer() {
  if (timerId !== null || finished) return;
  timerId = setInterval(() => {
    if (!finished) {
      seconds++;
      $("time-value").textContent = formatTime(seconds);
    }
  }, 1000);
}

function stopTimer() {
  if (timerId !== null) clearInterval(timerId);
  timerId = null;
}

function renderBoard() {
  const board = $("board");
  board.replaceChildren();
  cards.forEach((card, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card";
    button.textContent = card.matched || revealed.includes(i) ? card.symbol : "?";
    button.setAttribute("aria-label", card.matched ? `Matched card ${card.symbol}` : "Hidden card");
    if (card.matched) button.classList.add("matched");
    else if (revealed.includes(i)) button.classList.add("revealed");
    button.disabled = finished || locked || card.matched || revealed.includes(i);
    button.addEventListener("click", () => chooseCard(i));
    board.appendChild(button);
  });
}

function chooseCard(i) {
  if (finished || locked || cards[i].matched || revealed.includes(i)) return;
  startTimer();
  revealed.push(i);
  if (revealed.length === 1) {
    $("message").textContent = "Choose one more card.";
    renderBoard();
    return;
  }

  moves++;
  const [a, b] = revealed;
  if (cards[a].symbol === cards[b].symbol) {
    cards[a].matched = true;
    cards[b].matched = true;
    matchedPairs++;
    revealed = [];
    $("message").textContent = "Match found!";
    if (matchedPairs === 8) {
      finished = true;
      stopTimer();
      $("message").textContent = `You found every pair in ${moves} moves and ${formatTime(seconds)}.`;
    }
    updateStats();
    renderBoard();
  } else {
    locked = true;
    $("message").textContent = "Not a match. Try another pair.";
    renderBoard();
    mismatchTimeout = setTimeout(() => {
      revealed = [];
      locked = false;
      mismatchTimeout = null;
      renderBoard();
      $("message").textContent = "Choose two cards to find a pair.";
    }, 850);
  }
  updateStats();
}

function restartGame() {
  if (mismatchTimeout !== null) clearTimeout(mismatchTimeout);
  mismatchTimeout = null;
  stopTimer();
  cards = createDeck();
  revealed = [];
  moves = 0;
  matchedPairs = 0;
  seconds = 0;
  locked = false;
  finished = false;
  $("message").textContent = "Select any card to begin.";
  updateStats();
  renderBoard();
}

$("restart-button").addEventListener("click", restartGame);
restartGame();
