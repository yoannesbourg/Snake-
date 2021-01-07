
let rowStart = 1
let columnStart = 1
let rowEnd = 2
let columnEnd = 2
const snake = document.getElementById('snake')

const setDirectionFromKeyTouch = (event) => {
    
    if (event.keyCode === 39) {
        moveRight()
    } else if (event.keyCode === 40) {
        moveDown()
    } else if (event.keyCode === 37) {
        moveLeft()
    } else if (event.keyCode === 38) {
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



document.addEventListener('keydown', setDirectionFromKeyTouch);
