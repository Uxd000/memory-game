# Memory Card Game

A simple memory game built with React. The goal is to click each card only once — if you click the same card twice, the game resets.

A small React project focused on state management and game logic.

---

## How it works

* Choose a difficulty level
* A set of cards is displayed
* Each time you click a card:

  * If it hasn’t been clicked before → score increases
  * If it has → score resets
* Cards shuffle after every correct click
* The game ends when all cards are clicked without repeating

---

## Features

* Difficulty selection (different number of cards)
* Score and best score tracking
* Card shuffling on every move
* Win state with restart option
* Data fetched from an external API

---

## Tech used

* React (useState, useEffect)
* JavaScript
* CSS

---

## Project structure

```
src/
  components/
    Card.jsx
    CardGrid.jsx
    Scoreboard.jsx
    DifficultySelector.jsx
  App.jsx
```

---

## Running locally

```bash
git clone https://github.com/Uxd000/memory-game.git
cd memory-game
npm install
npm run dev
```

---

## Notes

This project was built to practice:

* managing state in React
* handling user interaction
* working with external APIs
* structuring a small app cleanly

---

## Author

Usaid Ahmed
GitHub: https://github.com/Uxd000
