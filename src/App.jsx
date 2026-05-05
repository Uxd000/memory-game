import { useState, useEffect } from "react";

function App() {
  // Game states:
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null);
  const [gameStatus, setGameStatus] = useState("idle");

  // Card data:
  const [allCards, setAllCards] = useState([]);
  const [gameCards, setGameCards] = useState([]);

  // Fetching API data from pokeapi.co
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        const data = await response.json()

        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const pokeData = await res.json();

            return{
              id: pokeData.id,
              name: pokeData.name,
              image: pokeData.sprites.front_default,
            };

          })
        );

        setAllCards(detailedData);
      } catch (error) {
        console.error("Error fetching cards:",error);
      }
    }
    fetchCards();
  },[])


  return (
    <div>
      <h1>Memory Game</h1>

      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
      <p>Status: {gameStatus}</p>

      {!difficulty && (
        <div>
          <button onClick={() => setDifficulty("easy")}>Easy</button>
          <button onClick={() => setDifficulty("medium")}>Medium</button>
          <button onClick={() => setDifficulty("hard")}>Hard</button>
        </div>
      )}
    </div>
  );
}

export default App;