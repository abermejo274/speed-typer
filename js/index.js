const settingsBtn = document.getElementById('settingsBtn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settingsForm')
const difficultySelect = document.getElementById('difficulty')
const word = document.getElementById('word')
const text = document.getElementById('text')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const endGameEl = document.getElementById('endGame')

// list of words to be used in the game
const words = [
    'horn',
    'mental',
    'child',
    'committee',
    'blubber',
    'extreme',
    'computer',
    'omnivore',
    'phone',
    'blow',
    'bright',
    'system',
    'description',
    'super',
    'breath',
    'reversal',
    'audio',
    'production',
    'discipline',
    'charger',
    'ranch',
    'happiness',
    'beacon',
    'extension',
    'sadness',
    'sparrow',
    'parasitic',
    'business',
    'accuracy',
    'effective',
    'monitor',
    'captive',
    'complicated',
    'heaving',
    'blanket',
    'weapon',
    'fruits',
    'available',
    'healer',
    'swindler',
    'adult',
    'approaching',
    'drench',
    'pillow',
    'elephant',
    'vegetable',
    'equivalent',
    'tragic',
    'absence',
    'begin'
]

// Focus on text on start
text.focus();

// initialize word, score, time and difficulty
let randomWord
let score = 0
let time = 10
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'normal'

// set difficulty select value 
difficultySelect.value = difficulty

// random word generator from words array
function randomWordGen() {
    return words[Math.floor(Math.random() * words.length)]
}

// reflect the word generated to the page
function wordReflect() {
    randomWord = randomWordGen()
    word.innerHTML = randomWord
}
wordReflect()

// score update function
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// setting the timeInterval
const timeInterval = setInterval(updateTime, 1000)

// time decrement
function updateTime() {
    time--
    timeEl.innerHTML = `${time}s`
    if (time === 0) {
        clearInterval(timeInterval)

        // end game
        difficultySelect.disabled = false
        gameOver()
    }
}

// end game, show end screen
function gameOver() {
    endGameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again?</button>
    `
    endGameEl.style.display = 'flex'
}

// event listener
// typing
text.addEventListener('input', e => {
    const textInserted = e.target.value
    // console.log(textInserted)
    if (textInserted === randomWord) {
        wordReflect()
        updateScore()

        // clear text inserted
        e.target.value = ''

        // time increment
        if (difficulty === 'normal') {
            time += 3
        } else {
            time += 2
        }

        updateTime()
    }
})

// settings
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

// settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    // console.log(difficulty)
    localStorage.setItem('difficulty', difficulty)
})