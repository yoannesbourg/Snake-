
    let rowStart = 1
    let columnStart = 1
    let rowEnd = 2
    let columnEnd = 2

    const history = [{rowStart: 1, columnStart: 1, rowEnd: 2, columnEnd: 2}]

    console.log(history)
    
const moveSnake = (event) => {

    const snake = document.getElementById('snake')

    let direction = []
    if (event.keyCode === 38) {
        rowStart -= 1
        rowEnd -= 1
        return 'top'
    } else if (event.keyCode === 39) {
        columnStart += 1
        columnEnd += 1
        return 'right'
    }  else if (event.keyCode === 40) {
        rowStart += 1
        rowEnd += 1
        return 'down'
    } else if (event.keyCode === 37) {
        columnStart -= 1
        columnEnd -= 1
        return 'left'
    } else if (rowEnd === 11) {
        return 'game over'
    }


    snake.style.setProperty(`grid-area`,`${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd}`)
    
}


// setInterval(moveSnake, 1000)


document.addEventListener('keydown', moveSnake);
//setInterval(function(){ alert("Hello"); }, 1000);




