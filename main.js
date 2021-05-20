let counter = 0;
board = document.querySelector(".board");
let stateOfGame = ["", "", "", "", "", "", "", "", ""];


const turn = function (element) {
  if (isGameOver() && flag) {
    restart()
    flag = false
  }
  else if (!isGameOver()) {
    fillTile(element);
    let result = checkGameWinner();
    if (result) {
      element.parentElement.classList.add("game-over");
      element.parentElement.classList.add("win-" + result.winner);
      element.parentElement.classList.add("line");
      element.parentElement.classList.add("line" + result.winStateLine);
    }
    if (!result && counter > 8) {
      board.classList.add("draw");
      board.classList.add("game-over");
    }
  }
  if (isGameOver()) {
    flag = true
  }
};




const fillTile = function (element) {
  if (counter < 9) {
    if (!element.classList.contains("fill")) {
      let index = +element.getAttribute("data-id");
      if (counter % 2 == 0) {
        element.className += " fill fill-o";
        stateOfGame[index] = "o";
      } else {
        element.className += " fill fill-x";
        stateOfGame[index] = "x";
      }
      counter++;
    }
  }
};


const checkGameWinner = function () {
  const winningIndexes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i <= 7; i++) {
    let winningIndex = winningIndexes[i];
    let a = stateOfGame[winningIndex[0]];
    let b = stateOfGame[winningIndex[1]];
    let c = stateOfGame[winningIndex[2]];
    if (a !== "" && b !== "" && c !== "" && a === b && b === c) {
      return { winner: a, winStateLine: i + 1 };
    }
  }
};

const restart = function () {
  let tiles = document.querySelectorAll(".tile");
  counter = 0;
  stateOfGame = ["", "", "", "", "", "", "", "", ""];
  board.className = "board";
  for (let item of tiles) {
    item.className = "tile";
  }
};

const isGameOver = function () {
  if (board.classList.contains('game-over')) return true
  else return false
}

