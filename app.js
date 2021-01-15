//Points
let points = 0
const counter = document.getElementById('counter')
counter.innerHTML = `${points} points`
//Set grid size
let gridColumnsMax = 32
let gridColumnsPercent = 3.125
const grid = document.getElementById('grid')
grid.style.setProperty('grid-template-columns',`repeat(${gridColumnsMax}, ${gridColumnsPercent}%)`)
grid.style.setProperty('grid-template-rows',`repeat(${gridColumnsMax}, ${gridColumnsPercent}%)`)
//Snake Initial position
let rowStart = 2
let columnStart = 2
//Food position
let foodRowStart 
let foodColumnStart
//General variables
const snake = document.getElementById('snake')
const food = document.getElementById('food')
const gameOver = document.getElementById('game-over')
snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
let stopSetTimeOut 
//History snake positions
let keyHistory = []
let lastDirection = 40
let history = [[2,2]]
//Button replay
const replay = document.getElementById('start-play')


//Get direction with keyCode and call moving functions
const setDirectionFromKeyTouch = (eventKeyCode) => {

    switch(eventKeyCode) {
        case 39:
            moveRight();
            break;
        
        case 40:
            moveDown();
            break;
        
        case 37:
            moveLeft();
            break;
        
        case 38:
            moveUp();
            break;
        
        default:
            
    }
}

//Moving functions
const moveRight = () => {
    columnStart += 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}

const moveDown = () => {
    rowStart += 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}

const moveUp = () => {
    rowStart -= 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}

const moveLeft = () => {
    columnStart -= 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
}

const play = (event) => {
    //Stop timeout for no cumulating movements
    clearTimeout(stopSetTimeOut)

    //If event push keycode (for calling setdirection function) if not mantain last direction
    if (event) {
        keyHistory.push(event.keyCode)
        
      } else {
        keyHistory.push(lastDirection)
        console.log([rowStart,columnStart])
      }
      history.push([rowStart,columnStart])
    //Get last direction from history
    lastDirection = keyHistory[keyHistory.length - 1]
    move()
    //Call setdirection function with 
    

    //If exciding the limit
    rowStart === 0 || columnStart === 0 || rowStart === gridColumnsMax + 1 || columnStart === gridColumnsMax + 1?  gameOverFunction() : stopSetTimeOut = setTimeout(play, 500)
    
    //Eat food
    if (rowStart === foodRowStart && columnStart === foodColumnStart) {
        generateRandomFoodCoordonates()
        raiseCounter()
    }
}

const move = () =>{
    setDirectionFromKeyTouch(lastDirection)
    setNewSnakePosition()
}

//Game over
const gameOverFunction = () => {
    snake.style.setProperty('background-color','yellow')
    document.removeEventListener('keydown', play)
    gameOver.style.setProperty('z-index','1')
}

//Generate food in random position
const generateRandomFoodCoordonates = () => {
    foodRowStart = Math.floor(Math.random() * gridColumnsMax + 1)
    foodColumnStart =  Math.floor(Math.random() * gridColumnsMax + 1)
    food.style.setProperty(`grid-area`,`${foodRowStart} / ${foodColumnStart} / ${foodRowStart + 1} / ${foodColumnStart + 1}`)
}
generateRandomFoodCoordonates()

//Add 1 point when snake eats meat
const raiseCounter = () =>{
        counter.innerHTML = `${points += 1} points`
}

//Create new snake element
    const newSnakeElement = document.createElement('div')
    newSnakeElement.setAttribute("id", "snake-test")
    grid.append(newSnakeElement)
    const newSnake = document.getElementById('snake-test')
    newSnake.style.backgroundColor = 'red'

// const create

const setNewSnakePosition = () => {
 newSnake.style.setProperty(`grid-area`,`${history[history.length - 1][0]} / ${history[history.length - 1][1]} / ${history[history.length - 1][0] + 1} / ${history[history.length - 1][1] + 1}`)
}

const startPlaying = () => {
    let points = 0
    let rowStart = 2
    let columnStart = 2
    let keyHistory = []
    let history = []
    gameOver.style.setProperty('z-index','-1')
    snake.style.setProperty('background-color','#CD4631')
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
    play()
    setNewSnakePosition()
}


document.addEventListener('keydown', play)
replay.addEventListener('click', startPlaying) 