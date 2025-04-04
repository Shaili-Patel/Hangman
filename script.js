const wordList = [
  "neo",
  "dejavu",
  "theone",
  "redpill",
  "bluepill",
  "reality",
  "illusion",
  "simulation",
  "morpheus",
  "thekeymaker",
  "theoracle",
];

// Setting Game Variables
let selectedWord = "";
let displayedWord = "";
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;

let correctSound = new Audio('imgs/correct.mp3'); // Sound File (right)
let wrongSound = new Audio('imgs/incorrect.mp3'); // Sound File (wrong)

function startGame(level) {
  selectedWord = getRandomWord(level);

  updateDifficultyDisplay(level);

  // Hide Difficulty Selection and Show Game Area & Difficulty Box
  displayedWord = '_'.repeat(selectedWord.length);
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');

  // Add d-block to the difficultySlection list
  document.getElementById('difficultySelection').classList.add('d-none');
  document.getElementById('gameArea').classList.remove('d-none');
  document.getElementById('difficultyBox').classList.remove('d-none');
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4;
    if (level === "medium") return word.length >= 5 && word.length <= 7;
    if (level === "hard") return word.length >= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox');

  // Remove any previous difficulty classes 
  difficultyBox.classList.remove('easy', 'medium', 'hard');

  // Set text & apply class dynamically using template literals
  difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;

  // Apply the appropriate CSS style for the chosen difficulty
  difficultyBox.classList.add(level);
}

function guessLetter() {
  let inputField = document.getElementById('letterInput'); 
  let guessedLetter = inputField.value.toLowerCase();

  // Check if input is a valid letter (a-z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert('Please enter a valid letter from A to Z');
    inputField.value = ''; 
    return; 
  }

  // Check if letter was already guessed using .includes()
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`);
    inputField.value = ''; // Clear input field
    return; // Exit function
  } else {
    guessedLetters.push(guessedLetter);
  }

  if (selectedWord.includes(guessedLetter)) {
    correctGuess(guessedLetter);
  } else {
    wrongGuess(guessedLetter);
  }

  inputField.value = ''; // Clear input field
  inputField.focus(); // Refocus input field for the next guess
}

function wrongGuess(guessedLetter) {
  wrongGuesses++; 
  document.getElementById('wrongLetters').textContent += ` ${guessedLetter}`; 
  // Add the guessed letter to HTML div
  document.getElementById('shamrock').src = `imgs/${wrongGuesses + 1}wrong.png`; 
  

  if (wrongGuesses === maxMistakes) {
    // Player has lost, so show the game over image
    let gameOverImage = document.getElementById('gameOverImage');
    gameOverImage.classList.remove('d-none'); 
    // Make the "game over" image visible
    endGame(false); 
    // End the game if max mistakes (6) are reached
  }

  // Plays wrong sound
  wrongSound.play();
}

function correctGuess(guessedLetter) {
  let newDisplayedWord = '';

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter;
    } else {
      newDisplayedWord += displayedWord[i];
    }
  }

  displayedWord = newDisplayedWord;
  document.getElementById('wordDisplay').textContent = displayedWord.split("").join(" ");

  // If the word is done or complete, end the game entirely
  if (!displayedWord.includes('_')) {
    endGame(true);
  }

  // Plays correct sound
  correctSound.play();
}

function endGame(won) {
  if (won === true) {
    setTimeout(() => alert('Yay you won!'), 100);
  } else if (won === false) {
    setTimeout(() => alert('Aww you lost'), 100);
  }
}

function restartGame() {
  location.reload(); // Reload the page to restart the game
}

// 'Enter' key press to submit guesses
window.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    guessLetter(); 
  }
});

