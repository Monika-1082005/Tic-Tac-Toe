let music = new Audio("Game start.wav");
let gameover = new Audio("Game over.wav");
let click = new Audio("click.wav");
let click2 = new Audio("click2.wav");
let turn = "X";
let isGameover = false;

const changeTurn = () => {
    return turn === "X" ? "O" : "X"
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won the Match !"
            isGameover = true
            gameover.play();
            disableEmptyBoxes(); // Disable empty boxes when a winner is declared
        }
    })
}

const disableEmptyBoxes = () => {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach(element => {
        let boxtext = element.querySelector('.boxtext');
        if (boxtext.innerText === '') {
            element.removeEventListener('click', boxClick);
        }
    });
}

const boxClick = (event) => {
    let box = event.currentTarget;
    let boxtext = box.querySelector('.boxtext');
    if (boxtext.innerText === '') {
        boxtext.innerText = turn;
        turn = changeTurn();
        if (turn === 'X') {
            click.play();
        } else {
            click2.play();
        }

        checkWin();
        if (!isGameover) {
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    }
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    element.addEventListener('click', boxClick);
});

reset.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = '';
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    });
    isGameover = false; // Reset gameover flag
    Array.from(boxes).forEach(element => {
        element.addEventListener('click', boxClick);
    });
});

