document.addEventListener("DOMContentLoaded", () => {
    const landingPageButton = document.querySelector("#landing-page-button");
    const rulesPageButton = document.querySelector("#game-rules-button");

    if (landingPageButton) {
        landingPageButton.addEventListener("click", () => {
            window.location.href = "game-rules.html";
        });
    }

    if (rulesPageButton) {
        rulesPageButton.addEventListener("click", () => {
            window.location.href = "game-page.html";
        });
    }


    const rock = document.querySelector("#rock");
    const paper = document.querySelector("#paper");
    const scissor = document.querySelector("#scissor");
    let selected = false;

    const rockSelected = false;
    const paperSelected = false;
    const scissorSelected = false;

    // animation for opacity and scale selection
    const opacityReduction = (a, b) => {
        a.style.animation = "fadeIn 0.8s forwards";
        b.style.animation = "fadeIn 0.8s forwards";
    }
    const scaleElement = (a) => {
        a.style.transform = "scale(1.1)";
    }
    const vanishElement = (a, b) => {
        a.style.animation = "vanish 0.4s forwards";
        b.style.animation = "vanish 0.4s forwards";

        a.addEventListener("animationed", ()=> a.remove())
        b.addEventListener("animationed", ()=> b.remove())
    } 
    //selection event listeners
    rock.addEventListener("click", () => {
        opacityReduction(paper, scissor);
        scaleElement(rock);
        rock.style.animation = "none";
        selected = true;
        rockSelected = true;
        paperSelected = false;
        scissorSelected= false;
    })
    
    paper.addEventListener("click", () => {
        opacityReduction(rock, scissor);
        scaleElement(paper) ;
        paper.style.animation = "none";
        selected = true;
        rockSelected = false;
        paperSelected = true;
        scissorSelected= false;
    })

    scissor.addEventListener("click", () => {
        opacityReduction(paper, rock);
        scaleElement(scissor);
        scissor.style.animation = "none";
        selected = true;
        rockSelected = false;
        paperSelected = false;
        scissorSelected= true;
    })
    


    //start game button logic
    const startGameButton = document.querySelector("#start-game-button")
    
    const startGame = function(selected) {
        if(!selected) {
           const warning = document.createElement('p');
           warning.setAttribute("id", "warning")
           warning.innerText = "Please select a weapon to proceed";
           startGameButton.insertAdjacentElement("beforebegin", warning)
        } 
        
    }

    startGameButton.addEventListener('click', () =>{
        startGame(selected) 
        if (selected) {
            document.body.removeChild(warning)
        }
        if (rockSelected) {
            //call vanish
            // call move
            vanishElement(paper, scissor)
         } //else if (paperSelected) {

        // } else {

        // }
    })
});




//game logic 
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
    // let userChoice = prompt("Choose your weapon"); //console prompt, delete comment to ask user 
    //for input
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