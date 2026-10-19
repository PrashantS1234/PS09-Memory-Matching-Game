# PS09 — Memory Matching Game

A small browser-based memory game built with HTML, CSS, and vanilla JavaScript. The player reveals two cards at a time and tries to find all eight pairs.

## Included features
- A 4×4 board with eight matching pairs
- Move counter and elapsed-time display
- Basic match and mismatch handling
- Restart button
- A small set of Node.js tests for the deck and time formatter

## Run the game
Open this folder in VS Code and use the Live Server extension to launch `index.html` in a browser. A modern browser is required.

## Run tests
Install Node.js, open a terminal in this folder, and run:

```bash
npm test
```

On Windows PowerShell, if script execution blocks `npm`, use:

```powershell
npm.cmd test
```

## Project structure
- `index.html` — page layout
- `styles.css` — visual styling
- `src/game.js` — card deck creation and time formatting
- `src/main.js` — game interactions
- `tests/game.test.js` — basic automated tests

## Scope and limitations
This is a basic prototype. It does not include adaptive difficulty, saved game history, user accounts, a backend, or deployment to Azure. The project should be presented accurately, and any AI assistance should be disclosed if required by the assessment rules.
