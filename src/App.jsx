import Player from "./components/Player/Player";
import GameBoard from "./components/Player/GameBoard/GameBoard";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName={"Player 1"} symbol={"X"}></Player>
          <Player initialName={"Player 2"} symbol={"O"}></Player>
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
