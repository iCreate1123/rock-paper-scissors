document.addEventListener("DOMContentLoaded", () => {
   
    const computerChoiceImage = document.querySelector('#computer-choice')
    const playerChoiceImage = document.querySelector('#player-choice')

    function computerChoiceFunc () {
        let randomIndex = Math.floor(Math.random() * 3);
        const choices = ["images/paper-png.png", "images/rock-png.png", "images/scaiars.png"];
        return choices[randomIndex];
    }

    function updateComputerChoice() {
        computerChoiceImage.src = computerChoiceFunc();
    }
    updateComputerChoice();

    // add playerChoice from previous script 

})