import { useState, useEffect } from "react";
import CardGrid from "./components/CardGrid";
import Card from "./components/Card";

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

  // Generating gameCards when difficulty is selected

  useEffect(() => {
  if (!difficulty || allCards.length === 0) return;

    let count=0;

    if (difficulty==="easy") count=5;
    else if (difficulty==="medium") count=8;
    else if (difficulty==="hard") count=12;

    // shuffling cards:
    const shuffled = [...allCards].sort(()=>Math.random()-0.5);

    //picking required number of cards:
    const selectedCards = shuffled.slice(0,count);
    console.log(gameCards);

    setGameCards(selectedCards);
    setScore(0);
    setClickedCards([]);
    setGameStatus("playing");
  }, [difficulty, allCards]);

  // Handling logic for when user clicks a card

  function handleCardClick(id){
    if (gameStatus !== "playing") return;

    if (clickedCards.includes(id)){
      if (score > bestScore){
        setBestScore(score);
      }
      setScore(0);
      setClickedCards([]);

      const reshuffled = [...gameCards].sort(() => Math.random - 0.5);
      setGameCards(reshuffled);
      return;
    }

    const newClickedCards = [...clickedCards,id];
    setClickedCards(newClickedCards);

    const newScore = score + 1;
    setScore(newScore);

    if (newClickedCards.length === gameCards.length){
      setGameStatus("won");

      if (newScore > bestScore){
        setBestScore(newScore);
      }

      return;
    }

    const shuffled = [...gameCards].sort(() => Math.random()-0.5);
    setGameCards(shuffled);
  }

  
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

      {gameStatus === "playing" && (
        <CardGrid gameCards={gameCards} onCardClick={handleCardClick} />
      )}

      {gameStatus === "won" && (
        <div>
          <h2>🎉 You Win!</h2>
          <button onClick={() => setDifficulty(null)}>Play Again</button>
        </div>
      )}

    </div>
  );
}

export default App;