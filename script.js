const wordList = [
  "neo",
  "dejavu",
  "theone",
  "redpill",
  "bluepill",
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

function startGame(level) {
  selectedWord = getRandomWord(level);

  updateDifficultyDisplay(level)

  // Hide Difficulty Selection and Show Game Area & Difficulty Box
  displayedWord = '_'.repeat(selectedWord.length)
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

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
  })

  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')

  // remove any pevious difficulty classes 
  difficultyBox.classList.remove('easy', 'medium', 'hard')

  // set text & apply class dynamically using template literals
  difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

  // only the appropriate CSS style for chosen difficulty
  difficultyBox.classList.add(level)
}

function guessLetter() {
  let inputField = document.getElementById('letterInput') //Get input field
  let guessedLetter = inputField.value.toLowerCase() //Convert input to Lowercase

  // Check if input is a valid letter (a-z)
  if (!guessedLetter.match(/^[a-z]$/)) {
    alert()
    inputField.value = '' //Clear input field
    return //Exit function

  }

  // Check if letter was already guessed using .includes()
  if (guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
    inputField.value = '' //Clear input field
    return //Exit function
  } else {
    guessedLetters.push(guessedLetter)
  }

  if (selectedWord.includes(guessedLetter)) {
    console.log(guessedLetter);
    correctGuess(guessedLetter)
  } else {
    wrongGuess(guessedLetter)
  }

  inputField.value = '' //Clear input field
  inputField.focus() //Refocus input field for the next guess
}

function wrongGuess(guessedLetter) {
  wrongGuesses++ // incrament the number of wrong guesses

  document.getElementById('wrongLetters').textContent += ` ${guessedLetter}` //  add the guessed letter to HTML div

  document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuess}`.jpg

  if (wrongGuesses === maxMistakes) {
    endGame(false); // Check to see if the number of wrong guesses === the maxMistakes if it is , call endgame(false)
  }
}

function correctGuess(guessedLetter) {
  let newDisplayedWord = ''

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter
    } else {
      newDisplayedWord += displayedWord[i]
    }
  }

  displayedWord = newDisplayedWord
  document.getElementById('wordDisplay').textConent = displayedWord

    .split('')
    .join('')

  if (!displayedWord.includes('_')) {
    endGame(true);
  }

  displayedWord = newDisplayedWord
  document.getElementById('wordDisplay').textContent = displayedWord
    .split("")
    .join(" ")

  if (!displayedWord.includes("_")) {
    endGame(true);
  }
}
function endGame(won) {
  if (won === true) {
    setTimeout(() => alert('Yay you won!'), 100)
  } else if (won === false) {
    setTimeout(() => alert('Aww you lost'), 100)
  }

}
function restartGame() {
  location.reload()
}
window.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    guessLetter(); // Calls the guessLetter function when Enter is pressed
  }
})
