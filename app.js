
let rowStart = 2
let columnStart = 2
let rowEnd = 3
let columnEnd = 3
const snake = document.getElementById('snake')
const gameOver = document.getElementById('game-over')
snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)

let keyHistory = []
let lastDirection = 40

const getKeyCodeFromKeyTouch = (event) => {
    keyHistory.push(event.keyCode)
    let eventLastHistoryCode = keyHistory[keyHistory.length - 1]
    lastDirection = eventLastHistoryCode
    setDirectionFromKeyTouch(lastDirection)
    console.log({rowStart, columnStart, rowEnd, columnEnd})
    if (rowStart === 1 || columnStart === 1 || rowStart === 10 || columnStart === 10) {
        snake.style.setProperty('background-color','yellow')
        document.removeEventListener('keydown', getKeyCodeFromKeyTouch)
        gameOver.style.setProperty('z-index','1')

    } 
}

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

const moveRight = () => {
    columnStart += 1
    columnEnd += 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
    console.log('right!')
}

const moveDown = () => {
    rowStart += 1
    rowEnd += 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
    console.log('down!')
}

const moveUp = () => {
    rowStart -= 1
    rowEnd -= 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
    console.log('up!')
}

const moveLeft = () => {
    columnStart -= 1
    columnEnd -= 1
    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
    console.log('left!')
}

let stopSetTimeOut 

const play = (event) => {
    clearTimeout(stopSetTimeOut)
    if(event) {
        keyHistory.push(event.keyCode)
    } else {
        keyHistory.push(lastDirection)
    }

    

    let eventLastHistoryCode = keyHistory[keyHistory.length - 1]
    lastDirection = eventLastHistoryCode
    setDirectionFromKeyTouch(lastDirection)
    console.log({rowStart, columnStart, rowEnd, columnEnd})

    if (rowStart === 0 || columnStart === 0 || rowStart === 11 || columnStart === 11) {
        gameOverFunction()
    } else {
        stopSetTimeOut = setTimeout(play, 1000)
    }
  
}

const gameOverFunction = () => {
    snake.style.setProperty('background-color','yellow')
    document.removeEventListener('keydown', play)
    gameOver.style.setProperty('z-index','1')
}


//setInterval(setDirectionFromKeyTouch(lastDirection), 1000) 

document.addEventListener('keydown', play);
