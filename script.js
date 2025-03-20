const wordList = [
  "Neo",
  "luck",
  "DejaVu",
  "rain",
  "Dream",
  "RedPill",
  "BluePill",
  "Illusion",
  "celebration",
  "Morpheus",
  "TheKeymaker",
  "tradition",
];

// Setting Game Variables
let selectWord = "";
let displayWord = "";
let wrongGuess = 0;
let guessedLetters = [];
const maxMistakes = 6;

function startGame(level) {
  selectWord = getRandomWord(level);


  // Hide Difficulty Selection and Show Game Area & Difficulty Box

  // Add d-block to the difficultySlection list
  document.getElementById('difficultySelection').classList.add('d-none')

  // remove d-none from dissicultyBox & #gameArea
  document.getElementById('gameArea').classList.remove('d-none')
  document.getElementById('difficultyBox').classList.remove('d-none')

  // Add d-block to difficultyBox & #gameArea
  document.getElementById('gameArea').classList.add('d-block')
  document.getElementById('difficultyBox').classList.remove('d-block')
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length <= 4;
    if (level === "medium") return word.length >= 5 && word.length <= 7;
    if (level === "hard") return word.length >= 8;
  });

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}
