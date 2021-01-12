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
let isAte = false

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
            console.log('not this key')
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
    event? keyHistory.push(event.keyCode) : keyHistory.push(lastDirection)

    
    //Get last direction from history
    lastDirection = keyHistory[keyHistory.length - 1]
    
    //Call setdirection function with 
    setDirectionFromKeyTouch(lastDirection)

    //If exciding the limit
    rowStart === 0 || columnStart === 0 || rowStart === gridColumnsMax + 1 || columnStart === gridColumnsMax + 1?  gameOverFunction() : stopSetTimeOut = setTimeout(play, 500)

    if (rowStart === foodRowStart && columnStart === foodColumnStart) {
        generateRandomFoodCoordonates()
        raiseCounter()
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
generateRandomFoodCoordonates()

//Add 1 point when snake eats meat
const raiseCounter = () =>{
        counter.innerHTML = `${points += 1} points`
}



document.addEventListener('keydown', play);

//Create new element

const newSnake = document.createElement('div')
newSnake.setAttribute("class", "snake-test")
grid.append(newSnake)
newSnake.style.
