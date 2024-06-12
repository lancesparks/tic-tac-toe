const GameOver = ({ winner, isDraw, handleRestart }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {isDraw && <p>It's a draw!</p>}

      <p>
        <button onClick={() => handleRestart()}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
