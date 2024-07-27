document.addEventListener("DOMContentLoaded", () => {
    const computerChoiceImage = document.querySelector('#computer-choice');
    const playerChoiceImage = document.querySelector('#player-choice');
    const roundHeading = document.querySelector('#round-heading');
    const humanRounds = document.querySelector("#human-rounds"); 
    const computerRounds = document.querySelector("#computer-rounds");
    const roundWinner = document.querySelector("#round-winner");

    // Retrieve or initialize rounds won counts from sessionStorage
    let humanRoundsWon = sessionStorage.getItem('humanRoundsWon') ? parseInt(sessionStorage.getItem('humanRoundsWon')) : 0;
    let computerRoundsWon = sessionStorage.getItem('computerRoundsWon') ? parseInt(sessionStorage.getItem('computerRoundsWon')) : 0;

    // Update round counters in the UI
    humanRounds.textContent = `Rounds won: ${humanRoundsWon}`;
    computerRounds.textContent = `Rounds won: ${computerRoundsWon}`;

    let roundCount = sessionStorage.getItem('roundCount') ? parseInt(sessionStorage.getItem('roundCount')) : 0;
    roundCount++;
    sessionStorage.setItem('roundCount', roundCount);
    roundHeading.textContent = `Round: ${roundCount}`;
   
    function computerChoiceFunc() {
        const choices = ["images/paper-png.png", "images/rock-png.png", "images/scaiars.png"];
        let randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function updateComputerChoice() {
        computerChoiceImage.src = computerChoiceFunc();
    }
    updateComputerChoice();

    // Helper function to extract the filename from a URL
    function getFilenameFromUrl(url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }

    // Set player choice from previous script
    let playerChoiceUrl = localStorage.getItem('playerChoiceUrlSource');
    if (playerChoiceUrl && playerChoiceImage) {
        playerChoiceImage.src = playerChoiceUrl;
    }

    const playerChoiceRelativePath = getFilenameFromUrl(playerChoiceImage.src);
    const computerChoiceRelativePath = getFilenameFromUrl(computerChoiceImage.src);


    // Game logic to determine round winner
    if (playerChoiceRelativePath === computerChoiceRelativePath) {
        roundWinner.textContent = "DRAW";
    } else if (computerChoiceRelativePath === "rock-png.png") {
        if (playerChoiceRelativePath === "paper-png.png") {
            roundWinner.textContent = "Player Wins";
            humanRoundsWon++;
            console.log(humanRoundsWon);
        } else {
            roundWinner.textContent = "Computer Wins";
            computerRoundsWon++;
            console.log(computerRoundsWon)
        }
    } else if (computerChoiceRelativePath === "scaiars.png") {
        if (playerChoiceRelativePath === "rock-png.png") {
            roundWinner.textContent = "Player Wins";
            humanRoundsWon++;
            console.log(humanRoundsWon);
        } else {
            roundWinner.textContent = "Computer Wins";
            computerRoundsWon++;
            console.log(computerRoundsWon)

        }
    } else if (computerChoiceRelativePath === "paper-png.png") {
        if (playerChoiceRelativePath === "rock-png.png") {
            roundWinner.textContent = "Computer Wins";
            computerRoundsWon++;
            console.log(computerRoundsWon)
        } else {
            roundWinner.textContent = "Player Wins";
            humanRoundsWon++;
            console.log(humanRoundsWon);

        }
    }
      // Save the updated scores to sessionStorage
      sessionStorage.setItem('humanRoundsWon', humanRoundsWon);
      sessionStorage.setItem('computerRoundsWon', computerRoundsWon);

    // Update the rounds won in the UI
    humanRounds.textContent = `Rounds won: ${humanRoundsWon}`;
    computerRounds.textContent = `Rounds won: ${computerRoundsWon}`;

// Check for a game winner and redirect accordingly
    if(humanRoundsWon === 3 || computerRoundsWon === 3) {
        setTimeout(() => {
        window.location.href = "winner-page.html";
        }, 2500);   
    } else {
        setTimeout(() => {
            window.location.href = "game-page.html"
        }, 2500)
    }

});
 