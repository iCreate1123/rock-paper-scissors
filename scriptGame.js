// Constants
const CHOICES = {
    PAPER: "paper-png.png",
    ROCK: "rock-png.png",
    SCISSORS: "scaiars.png"
};

const WINNING_COMBINATIONS = {
    [CHOICES.ROCK]: CHOICES.SCISSORS,
    [CHOICES.SCISSORS]: CHOICES.PAPER,
    [CHOICES.PAPER]: CHOICES.ROCK
};

const ROUNDS_TO_WIN = 3;
const REDIRECT_DELAY = 2500;

// Game state management
class GameState {
    constructor() {
        this.humanRoundsWon = parseInt(sessionStorage.getItem('humanRoundsWon') || '0');
        this.computerRoundsWon = parseInt(sessionStorage.getItem('computerRoundsWon') || '0');
        this.roundCount = parseInt(sessionStorage.getItem('roundCount') || '0') + 1;
    }

    save() {
        sessionStorage.setItem('humanRoundsWon', this.humanRoundsWon);
        sessionStorage.setItem('computerRoundsWon', this.computerRoundsWon);
        sessionStorage.setItem('roundCount', this.roundCount);
    }
}

// Helper functions
function getFilenameFromUrl(url) {
    return url.substring(url.lastIndexOf('/') + 1);
}

function getComputerChoice() {
    const choices = Object.values(CHOICES);
    const randomIndex = Math.floor(Math.random() * choices.length);
    return `images/${choices[randomIndex]}`;
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "DRAW";
    return WINNING_COMBINATIONS[playerChoice] === computerChoice ? "Player Wins" : "Computer Wins";
}

function updateScore(winner, gameState) {
    if (winner === "Player Wins") {
        gameState.humanRoundsWon++;
    } else if (winner === "Computer Wins") {
        gameState.computerRoundsWon++;
    }
}

function redirectToNextPage(gameState) {
    const nextPage = (gameState.humanRoundsWon === ROUNDS_TO_WIN || gameState.computerRoundsWon === ROUNDS_TO_WIN)
        ? "winner-page.html"
        : "game-page.html";

    setTimeout(() => {
        window.location.href = nextPage;
    }, REDIRECT_DELAY);
}

// Main game initialization
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const elements = {
        computerChoiceImage: document.querySelector('#computer-choice'),
        playerChoiceImage: document.querySelector('#player-choice'),
        roundHeading: document.querySelector('#round-heading'),
        humanRounds: document.querySelector("#human-rounds"),
        computerRounds: document.querySelector("#computer-rounds"),
        roundWinner: document.querySelector("#round-winner")
    };

    // Initialize game state
    const gameState = new GameState();

    // Update UI with current state
    elements.roundHeading.textContent = `Round: ${gameState.roundCount}`;
    elements.humanRounds.textContent = `Rounds won: ${gameState.humanRoundsWon}`;
    elements.computerRounds.textContent = `Rounds won: ${gameState.computerRoundsWon}`;

    // Set computer choice
    elements.computerChoiceImage.src = getComputerChoice();

    // Set player choice from previous script
    const playerChoiceUrl = localStorage.getItem('playerChoiceUrlSource');
    if (playerChoiceUrl && elements.playerChoiceImage) {
        elements.playerChoiceImage.src = playerChoiceUrl;
    }

    // Get relative paths for comparison
    const playerChoice = getFilenameFromUrl(elements.playerChoiceImage.src);
    const computerChoice = getFilenameFromUrl(elements.computerChoiceImage.src);

    // Determine round winner and update scores
    const winner = determineWinner(playerChoice, computerChoice);
    elements.roundWinner.textContent = winner;
    updateScore(winner, gameState);

    // Save updated state and update UI
    gameState.save();
    elements.humanRounds.textContent = `Rounds won: ${gameState.humanRoundsWon}`;
    elements.computerRounds.textContent = `Rounds won: ${gameState.computerRoundsWon}`;

    // Redirect to next page
    redirectToNextPage(gameState);
});
