import { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import "./App.css";

function App() {
  // States:
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [gameStatus, setGameStatus] = useState("idle");

  // Card Data:
  const [allCards, setAllCards] = useState([]);
  const [gameCards, setGameCards] = useState([]);

  // Fetching game cards from pokeapi.co
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );
        const data = await response.json();

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const pokeData = await res.json();

            return {
              id: pokeData.id,
              name: pokeData.name,
              image: pokeData.sprites.front_default,
            };
          })
        );

        setAllCards(detailedData);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
  }, []);

  // Generating game cards
  useEffect(() => {
    if (!difficulty || allCards.length === 0) return;

    let count = 0;

    if (difficulty === "easy") count = 5;
    else if (difficulty === "medium") count = 8;
    else if (difficulty === "hard") count = 12;

    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    const selectedCards = shuffled.slice(0, count);

    setGameCards(selectedCards);
    setScore(0);
    setClickedCards([]);
    setGameStatus("playing");
  }, [difficulty, allCards]);

  // handling clicks
  function handleCardClick(id) {
    if (gameStatus !== "playing") return;

    if (clickedCards.includes(id)) {
      if (score > bestScore) setBestScore(score);

      setScore(0);
      setClickedCards([]);

      const reshuffled = [...gameCards].sort(() => Math.random() - 0.5);
      setGameCards(reshuffled);

      return;
    }

    const newClicked = [...clickedCards, id];
    setClickedCards(newClicked);

    const newScore = score + 1;
    setScore(newScore);

    if (newClicked.length === gameCards.length) {
      setGameStatus("won");
      if (newScore > bestScore) setBestScore(newScore);
      return;
    }

    const shuffled = [...gameCards].sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
  }

  // Reseting game
  function resetGame() {
    setScore(0);
    setClickedCards([]);
    setGameStatus("idle");
    setDifficulty(null);
  }

  return (
    <div className="app">
      <div className="container">

        {/* Primary landing screen */}
        {!difficulty && (
          <div className="menu">
            <h1>PokéMemory</h1>

            <p className="subtitle">
              Select a difficulty level
            </p>

            <div className="menu-buttons">
              <button onClick={() => setDifficulty("easy")}>Easy</button>
              <button onClick={() => setDifficulty("medium")}>Medium</button>
              <button onClick={() => setDifficulty("hard")}>Hard</button>
            </div>

            <a
              href="https://github.com/Uxd000/memory-game"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              GitHub Repo
            </a>
          </div>
        )}

        {/* GAME SCREEN */}
        {difficulty && gameStatus !== "won" && (
          <>
            <div className="header">
              <h1>PokéMemory</h1>

              <div className="scoreboard">
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
              </div>
            </div>

            <CardGrid
              gameCards={gameCards}
              onCardClick={handleCardClick}
            />
          </>
        )}

        {/* Win prompt*/}
        {gameStatus === "won" && (
          <div className="menu">
            <h2>🎉 You Win!</h2>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;