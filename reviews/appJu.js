/****************************************************\
// Les variables globales sont bien pratiques, mais c'est considéré comme une mauvaise pratique
// Essaye de faire autrement (une Class es6 ? Un function principale ?)
\****************************************************/
let points = 0
const counter = document.getElementById('counter')
// Set grid size
const gridColumnsMax = 32
const gridColumnsPercent = 3.125
const grid = document.getElementById('grid')
grid.style.setProperty('grid-template-columns', `repeat(${gridColumnsMax}, ${gridColumnsPercent}%)`)
grid.style.setProperty('grid-template-rows', `repeat(${gridColumnsMax}, ${gridColumnsPercent}%)`)
// Snake Initial position
let rowStart = 2
let columnStart = 2
let isAte = false
// Food position
let foodRowStart
let foodColumnStart
// General variables
const snake = document.getElementById('snake')
const food = document.getElementById('food')
const gameOver = document.getElementById('game-over')
snake.style.setProperty('grid-area', `${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
let stopSetTimeOut
/****************************************************\
// Pourquoi l'historiques des keys ? Tu peux juste retenir la derniere pour changer la direction.
// En revanche tu as besoin besoin d'un historique, des positions, pour dessiner ton snqke... complet ;)
\****************************************************/
// History snake positions
const keyHistory = []
let lastDirection = 40
/****************************************************\
// Ici tu peux
// - transformer le if en switch,
// - Modifier tes vars directement dans le switch
// - Puis definir la nouvelle position avec les variables modifiées juste apres le switch (snale.style.setProperty())
// - Tu peux aussi des noms au keyCode pour rendre le code un poil plus visible, genre arrowKey = { left: 37, top: 38 ... } puis arrowKey.top
\****************************************************/
// Get direction with keyCode and call moving functions
const setDirectionFromKeyTouch = (eventKeyCode) => {
  if (eventKeyCode === 39) {
    moveRight()
  } else if (eventKeyCode === 40) {
    moveDown()
  } else if (eventKeyCode === 37) {
    moveLeft()
  } else if (eventKeyCode === 38) {
    moveUp()
  }
}
// Moving functions
const moveRight = () => {
  columnStart += 1
  snake.style.setProperty('grid-area', `${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}
const moveDown = () => {
  rowStart += 1
  snake.style.setProperty('grid-area', `${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}
const moveUp = () => {
  rowStart -= 1
  snake.style.setProperty('grid-area', `${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}
const moveLeft = () => {
  columnStart -= 1
  snake.style.setProperty('grid-area', `${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}
/****************************************************\
// La function Play est un element central du programme, essaye de ne pas mettre d'implementation dedans
// Vois la juste comme sommaire qui appele des functions pour verifier ou faire des choses
\****************************************************/
const play = (event) => {
  // Stop timeout for no cumulating movements
  clearTimeout(stopSetTimeOut)
  // If event push keycode (for calling setdirection function) if not mantain last direction
/****************************************************\
// Une petite function ou un ternaire pour juste donner l'intention de ce qui doit etre fait en une ligne
\****************************************************/
  if (event) {
    keyHistory.push(event.keyCode)
  } else {
    keyHistory.push(lastDirection)
  }
  // Get last direction from history
  lastDirection = keyHistory[keyHistory.length - 1]
  // Call setdirection function with
  setDirectionFromKeyTouch(lastDirection)
/****************************************************\
// Une petite function ou un ternaire pour juste donner l'intention de ce qui doit etre fait en une ligne
\****************************************************/
  // If exciding the limit
  if (rowStart === 0 || columnStart === 0 || rowStart === gridColumnsMax + 1 || columnStart === gridColumnsMax + 1) {
    gameOverFunction()
  } else {
    stopSetTimeOut = setTimeout(play, 500)
  }
/****************************************************\
// Une petite function ou un ternaire pour juste donner l'intention de ce qui doit etre fait en une ligne
\****************************************************/
  if (isAte) {
    generateRandomFoodCoordinates()
  }
  isAte = checkIfFoodAte()
}
// Game over
const gameOverFunction = () => {
  snake.style.setProperty('background-color', 'yellow')
  document.removeEventListener('keydown', play)
  gameOver.style.setProperty('z-index', '1')
}
// Generate food in random position
const generateRandomFoodCoordinates = () => {
  foodRowStart = Math.floor(Math.random() * gridColumnsMax + 1)
  foodColumnStart = Math.floor(Math.random() * gridColumnsMax + 1)
  food.style.setProperty('grid-area', `${foodRowStart} / ${foodColumnStart} / ${foodRowStart + 1} / ${foodColumnStart + 1}`)
}
function checkIfFoodAte () {
  return rowStart === foodRowStart && columnStart === foodColumnStart
}
/****************************************************\
// Tu pourrais faire une petite function init() qui declarerait les variables globales,
// allumerait play() (les setTimout et addEventListener), seterait le random food etc
// Le jeu en sera d'autant plus facile a arreter/demarer avec ton button Play() et ton "game over"
\****************************************************/
// Initial load
generateRandomFoodCoordinates()
document.addEventListener('keydown', play)