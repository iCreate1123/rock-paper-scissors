let gameLoop = true; 
let userRoundsWon = 0
let computerRoundsWon = 0;

 while (gameLoop) {
    if (userRoundsWon === 2) {
        console.log("HUMAN WON GAME!")
        // gameLoop = false;
        break;
    } else if (computerRoundsWon === 2) {
        console.log("COMPUTER WON GAME!");
        // gameLoop = false;
        break;
    }

    function computerChoiceFunc () {
        let randomNumber = Math.floor(Math.random() * 3) + 1;
        let rock = "rock";
        let paper = "paper";
        let scissors = "scissors";
    
        if (randomNumber === 1) {
            return rock;
        } else if (randomNumber === 2) {
            return paper 
        } 
        return scissors
    }   

    let computerChoice = computerChoiceFunc()
    let userChoice = prompt("Choose your weapon");
    userChoice = userChoice.toLocaleLowerCase();
    let notValidChoice = true;
    
    if (userChoice === "rock" | userChoice === "paper" | userChoice === "scissors") {
        notValidChoice = false; 
    } else {
        while (notValidChoice) {
            userChoice = prompt("Please choose a valid weapon");
            if (userChoice === 'paper' | userChoice === 'rock' | userChoice === 'scissors') {
                notValidChoice = false;
            }
        } 
    }

    console.log(`computer choose ${computerChoice}`);
    console.log(`user chose ${userChoice}`); //debugging purpose
    console.log("BATTLE");

    if (computerChoice === userChoice) {
        console.log("DRAW");
        continue;
    }
    if (computerChoice === "rock") {
        if (userChoice === "paper") {
            userRoundsWon ++;
            console.log("USER WINS")
        } else {
            computerRoundsWon++
            console.log("COMPUTER WINS")
        }
    }

    if (computerChoice === "scissors") {
        if (userChoice === "rock") {
            userRoundsWon++;
            console.log("USER WINS")
        } else {
            computerRoundsWon++;
            console.log("COMPUTER WINS")
        }
    }

    if (computerChoice === "paper") {
        if (userChoice === "scissors") {
            userRoundsWon++;
            console.log("USER WINS")
        } else {
            computerRoundsWon++
            console.log("COMPUTER WINS")
        }
    }



}