import { useState } from "react";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function getWinner(gameBoard, players) {
  let winner = null;

  for (const combo of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combo[0].row][combo[0].column];
    const secondSymbol = gameBoard[combo[1].row][combo[1].column];
    const thirdSymbol = gameBoard[combo[2].row][combo[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }

  return winner;
}

function getGameBoard(gameTurns, initialGameBoard) {
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const isDraw = gameTurns.length === 9 && !winner;

  const activePlayer = getActivePlayer(gameTurns);
  let gameBoard = getGameBoard(gameTurns, INITIAL_GAME_BOARD);
  const winner = getWinner(gameBoard, players);

  let handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = getActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  };

  let handleRestart = () => {
    setGameTurns([]);
  };

  let handlePlayerNameChange = (symbol, name) => {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || isDraw) && (
          <GameOver
            winner={winner}
            isDraw={isDraw}
            handleRestart={handleRestart}
          ></GameOver>
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
