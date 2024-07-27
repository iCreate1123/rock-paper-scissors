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
    let rockUrl = 'images/rock-png.png'
    let paperUrl  = 'images/paper-png.png'
    let scissorUrl = 'images/scaiars.png'
    let playerChoiceUrlSource
    //removes unselected elements
    const removeElements = function(rockSelected, paperSelected, scissorSelected) {
        if(rockSelected) {
            vanishElement(paper, scissor) 
           localStorage.setItem("playerChoiceUrlSource", rockUrl); 
    
        } else if(paperSelected) {
            vanishElement(rock, scissor)
            localStorage.setItem("playerChoiceUrlSource", paperUrl)
        } else if(scissorSelected) {
        vanishElement(paper, rock)
        localStorage.setItem("playerChoiceUrlSource", scissorUrl)
        }
    }

   

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

