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

       //computer choice generator function
     
    let rockSelected = false;
    let paperSelected = false;
    let scissorSelected = false;
    
    // animation for opacity and scale selection
    const opacityReduction = (a, b) => {
        a.style.animation = "fadeIn 0.8s linear forwards";
        b.style.animation = "fadeIn 0.8s linear forwards";
    }

    const vanishElement = (a, b) => {
        a.style.animation = "vanish 1.1s forwards";
        b.style.animation = "vanish 1.1s forwards";

        a.addEventListener("animationend", () => a.remove())
        b.addEventListener("animationend", () => b.remove())
    } 

    //selection event listeners
    rock.addEventListener("click", () => {
        opacityReduction(paper, scissor);
        rock.style.animation = "none";
        rockSelected = true;
        paperSelected = false;
        scissorSelected= false;
    })
    
    paper.addEventListener("click", () => {
        opacityReduction(rock, scissor);
        paper.style.animation = "none";
        rockSelected = false;
        paperSelected = true;
        scissorSelected= false;
    })

    scissor.addEventListener("click", () => {
        opacityReduction(paper, rock);
        scissor.style.animation = "none";
        rockSelected = false;
        paperSelected = false;
        scissorSelected= true;
    })
    


    //start game button logic
    //

    const startGameButton = document.querySelector("#start-game-button")

    //removes the warning paragraphs
    const removeWarning = () => {
        const existingWarning = document.querySelector("#warning");
        if (existingWarning) {
            existingWarning.remove();
        }
    };

    let playerChoiceUrlSource
    //removes unselected elements
    const removeElements = function(rockSelected, paperSelected, scissorSelected) {
        if(rockSelected) {
            vanishElement(paper, scissor) 
            playerChoiceUrlSource = rock.src; 
        } else if(paperSelected) {
            vanishElement(rock, scissor)
            playerChoiceUrlSource = paper.src;
        } else if(scissorSelected) {
        vanishElement(paper, rock)
        playerChoiceUrlSource = scissor.src;
        }
    }

    window.playerChoiceUrlSource = playerChoiceUrlSource;

    const heading = document.querySelector("h1")

    startGameButton.addEventListener('click', () => {
        removeElements(rockSelected, paperSelected, scissorSelected);   
        if (!rockSelected && !paperSelected && !scissorSelected) {
            const warning = document.createElement('p');
            warning.setAttribute("id", "warning")
           warning.innerText = "Please select a weapon to proceed";
           startGameButton.insertAdjacentElement("beforebegin", warning)
        }  else {
            removeWarning();
            heading.style.animation = "flyUp 1.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
            startGameButton.style.animation = "flyDown 1.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";

            setTimeout(() => {
                    document.body.innerHTML = "";
                window.location.href = "game-pageTwo.html"
            }, 1300)
        }
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
       
    
        if (randomNumber === 1) {
            return rock;
        } else if (randomNumber === 2) {
            return paper 
        } 
        return scissors
    }   

    // let computerChoice = computerChoiceFunc()
    // let userChoice = prompt("Choose your weapon"); //console prompt, delete comment to ask user 
    // for input
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