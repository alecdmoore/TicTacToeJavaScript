const squares = document.getElementsByClassName("square");
const resetBtn = document.getElementById("reset");
const message = document.getElementById("message");
const startBtn = document.getElementById("start");
const playerOneForm = document.getElementById("player1");
const playerTwoForm = document.getElementById("player2");

const Player = (n, m) => {
  const name = n;
  const mark = m;

  return { name, mark };
};

//model
const gameboard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const sayHello = () => console.log("hello");
  reset = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = "";
      }
    }
  };
  return { board, sayHello, reset };
})();

//Controller
const Controller = (() => {
  let gameStarted = false;
  startBtn.addEventListener("click", () => {
    gameStarted = true;
    startGame();
  });

  const startGame = () => {
    const playerOne = Player(document.getElementById("player1Name").value, "X");
    const playerTwo = Player(document.getElementById("player2Name").value, "O");
    const players = [playerOne, playerTwo];
    let turnIndex = 0;
    let x = null;
    let y = null;
    let gameOver = false;

    for (let i = 0; i < squares.length; i++) {
      message.textContent = `Player ${players[turnIndex].name} Turn`;

      squares[i].addEventListener("click", () => {
        //logic for square taken
        //check if the square is taken in the model, if not then we good
        let index = parseInt(squares[i].id, 10);
        index < 10 ? (x = 0) : index < 20 ? (x = 1) : (x = 2);
        y = index % 10;

        if (gameboard.board[x][y] != "") return;

        console.log("clicked");
        squares[i].textContent = players[turnIndex].mark;
        console.log(parseInt(squares[i].id, 10));

        gameboard.board[x][y] = players[turnIndex].mark;
        console.log(gameboard.board);

        //logic for win
        //diagonal
        if (x == y || (x == 0 && y == 2) || (y == 0 && x == 2)) {
          console.log("diag");
          let diag1 = [
            gameboard.board[0][0],
            gameboard.board[1][1],
            gameboard.board[2][2],
          ];
          let diag2 = [
            gameboard.board[0][2],
            gameboard.board[1][1],
            gameboard.board[2][0],
          ];
          if (
            diag1.every((x) => x == players[turnIndex].mark) ||
            diag2.every((x) => x == players[turnIndex].mark)
          ) {
            announceWinner();
            gameOver = true;
          }
        }
        //rows
        let rowCheck = [
          gameboard.board[x][0],
          gameboard.board[x][1],
          gameboard.board[x][2],
        ];
        if (rowCheck.every((e) => e == players[turnIndex].mark)) {
          announceWinner();
          gameOver = true;
        }
        // columns
        let colCheck = [
          gameboard.board[0][y],
          gameboard.board[1][y],
          gameboard.board[2][y],
        ];
        if (colCheck.every((e) => e == players[turnIndex].mark)) {
          announceWinner();
          gameOver = true;
        }

        //toggle between players turns
        turnIndex == 1 ? (turnIndex = 0) : (turnIndex = 1);
        !gameOver
          ? (message.textContent = `Player ${players[turnIndex].name} Turn`)
          : null;
        if (squaresFilled()) {
          message.textContent = `Tie Game`;
          gameOver = true;
        }
      });

      announceWinner = () => {
        message.textContent = `Player ${players[turnIndex].name} Wins!`;
      };

      squaresFilled = () => {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (gameboard.board[i][j] == "") return false;
          }
        }
        return true;
      };
    }

    //TODO Button to reset board
    resetBtn.addEventListener("click", () => {
      gameboard.reset();
      console.log("resetting");
      for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
      }
      message.textContent = `Enter Names to Begin`;
      gameOver = false;
    });
  };
})();

gameboard.sayHello();
