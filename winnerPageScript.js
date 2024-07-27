const playAgainButton = document.querySelector("#playAgainButton");
const winner = document.querySelector("#winner");   

playAgainButton.addEventListener("click", () => {
    window.location.href = "game-page.html";
    humanRoundsWon = 0; 
    computerRoundsWon = 0;
    roundCount = 0;
    sessionStorage.setItem('roundCount', roundCount);
    sessionStorage.setItem('humanRoundsWon', humanRoundsWon);
    sessionStorage.setItem('computerRoundsWon', computerRoundsWon);
   
});

if (parseInt(sessionStorage.getItem('humanRoundsWon')) === 3) {
    winner.textContent = "Human";
} else if (parseInt(sessionStorage.getItem('computerRoundsWon')) === 3)  {
    winner.textContent = "Computer";
}


