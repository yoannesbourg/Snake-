//Points
let points = 1
const counter = document.getElementById('counter')
counter.innerHTML = `${points} points`
//Set grid size
const grid = document.getElementById('grid')
const gridColumnsMax = 32
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

//snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowStart + 1} / ${columnStart + 1}`)
let stopSetTimeOut 
//History snake positions
let keyHistory = []
let lastDirection = 40
let history = [[2,2]]
//Button replay
const replay = document.getElementById('start-play')

//Set grid template
const setGridTemplate = ()  => {
    grid.style.setProperty('grid-template-columns',`repeat(${gridColumnsMax}, 1fr)`)
    grid.style.setProperty('grid-template-rows',`repeat(${gridColumnsMax}, 1fr)`)
}
setGridTemplate()

//Set grid position
const setGridArea = (element, row, col)  => {
    element.style.setProperty(`grid-area`,`${row} / ${col} / ${row + 1} / ${col + 1}`)
}
setGridArea(snake, rowStart, columnStart)

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
    setGridArea(snake, rowStart, columnStart)
}

const moveDown = () => {
    rowStart += 1
    setGridArea(snake, rowStart, columnStart)
}

const moveUp = () => {
    rowStart -= 1
    setGridArea(snake, rowStart, columnStart)
}

const moveLeft = () => {
    columnStart -= 1
    setGridArea(snake, rowStart, columnStart)
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
    setGridArea(food, foodRowStart, foodColumnStart)
}
generateRandomFoodCoordonates()

//Add 1 point when snake eats meat
const raiseCounter = () =>{
        counter.innerHTML = `${points += 1} points`
}

const startPlaying = () => {
    points = 0
    rowStart = 2
    columnStart = 2
    keyHistory = []
    history = []
    lastDirection = 40
    gameOver.style.setProperty('z-index','-1')
    snake.style.setProperty('background-color','#CD4631')
    setGridArea(snake, rowStart, columnStart)
    play()
    // setNewSnakePosition()
    }

//Create new snake element
// const newSnakeElement = document.createElement('div')
// newSnakeElement.setAttribute("id", "snake-test")
// grid.append(newSnakeElement)
// const newSnake = document.getElementById('snake-test')
// newSnake.style.backgroundColor = 'red'
// let newDiv
const createSnakeBody = (num) => {
    newDiv = document.createElement('div')
    newDiv.setAttribute('id', `snake-body-${num}`)
    grid.append(newDiv)
    newDiv.style.backgroundColor = 'red'
    // setNewSnakePosition(newDiv)
}


const snakeOne = document.getElementById('snake-body-1')
const snakeTwo = document.getElementById('snake-body-2')
const snakeThree = document.getElementById('snake-body-3')



const move = () =>{
    setDirectionFromKeyTouch(lastDirection)
}
const setNewSnakePosition = (div, index) => {
    setGridArea(div, history[history.length - index][0], history[history.length - index][1])
    }

const play = (event) => {
    //Stop timeout for no cumulating movements
    clearTimeout(stopSetTimeOut)
    //If event push keycode (for calling setdirection function) if not mantain last direction
    if (event) {
        keyHistory.push(event.keyCode)
        
    } else {
        keyHistory.push(lastDirection)
    }
    history.push([rowStart,columnStart])

    //Get last direction from history
    lastDirection = keyHistory[keyHistory.length - 1]
    move()
    //If exciding the limit
    rowStart === 0 || columnStart === 0 || rowStart === gridColumnsMax + 1 || columnStart === gridColumnsMax + 1?  gameOverFunction() : stopSetTimeOut = setTimeout(play, 500)
    //Eat food
    if (rowStart === foodRowStart && columnStart === foodColumnStart) {
        generateRandomFoodCoordonates()
        raiseCounter()
        createSnakeBody(points)
    }
}




//Create new snake element
// const newSnakeElement = document.createElement('div')
// newSnakeElement.setAttribute("id", "snake-test")
// grid.append(newSnakeElement)
// const newSnake = document.getElementById('snake-test')
// newSnake.style.backgroundColor = 'red'
document.addEventListener('keydown', play)
replay.addEventListener('click', startPlaying) 

