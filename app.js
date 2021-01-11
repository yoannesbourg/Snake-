let points = 0
const counter = document.getElementById('counter')


//Set grid size
let gridColumnsMax = 32
let gridColumnsPercent = 3.125
const grid = document.getElementById('grid')
grid.style.setProperty('grid-template-columns',`repeat(${gridColumnsMax}, ${gridColumnsPercent}%)`)
grid.style.setProperty('grid-template-rows',`repeat(${gridColumnsMax}, ${gridColumnsPercent}%)`)

//Snake Initial position
let rowStart = 2
let columnStart = 2
let rowEnd = 3
let columnEnd = 3

//Food position
let foodRowStart 
let foodColumnStart
let foodRowEnd 
let foodColumnEnd 


//General variables
const snake = document.getElementById('snake')
const food = document.getElementById('food')
const gameOver = document.getElementById('game-over')
snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)

let stopSetTimeOut 

//History snake positions
let keyHistory = []
let lastDirection = 40

//Get direction with keyCode and call moving functions
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


//Moving functions
const moveRight = () => {
    columnStart += 1
    columnEnd += 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
}

const moveDown = () => {
    rowStart += 1
    rowEnd += 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
}

const moveUp = () => {
    rowStart -= 1
    rowEnd -= 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
}

const moveLeft = () => {
    columnStart -= 1
    columnEnd -= 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
}



const play = (event) => {
    //Stop timeout for no cumulating movements
    clearTimeout(stopSetTimeOut)

    //If event push keycode (for calling setdirection function) if not mantain last direction
    if(event) {
        keyHistory.push(event.keyCode)
    } else {
        keyHistory.push(lastDirection)
    }
    
    //Get last direction from history
    lastDirection = keyHistory[keyHistory.length - 1]
    
    //Call setdirection function with 
    setDirectionFromKeyTouch(lastDirection)

    //If exciding the limit
    if (rowStart === 0 || columnStart === 0 || rowStart === gridColumnsMax + 1 || columnStart === gridColumnsMax + 1) {
        gameOverFunction()
    } else {
        stopSetTimeOut = setTimeout(play, 500)
    }
  
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
    foodRowEnd =  foodRowStart + 1
    foodColumnEnd =  foodColumnStart + 1
    food.style.setProperty(`grid-area`,`${foodRowStart} / ${foodColumnStart} / ${foodRowEnd} / ${foodColumnEnd}`)
}

//Snake eats food
const raiseCounter = () =>{
        counter.innerHTML = points += 1
}

document.addEventListener('keydown', play);
document.addEventListener('click', raiseCounter);

const generateFood = () => {
    generateRandomFoodCoordonates()
    
    if (rowStart === foodRowStart && columnStart === foodColumnStart) {
        console.log('ate')
    }
}
generateFood()