const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");
const gameTheme = document.getElementById("theme");
let userScore = document.getElementById("user");
let computerScore = document.getElementById("computer");
const descriptionBox = document.querySelector("summary");

const gameBox = document.getElementById("game");

const playAgain = document.createElement("button");

const allImage = document.querySelectorAll("img");

const choices = ["rock", "paper", "scissor"];

let uScore = 0;
let cScore = 0;


descriptionBox.addEventListener("click", () => {
    gameBox.classList.toggle("hide");
    if (gameBox.classList.contains("hide")) {
        gameBox.style.display = "none";
    } else {
        gameBox.style.display = "flex";
    }
})

const disableClick = (event) => {
   event.target.removeEventListener("click", disableClick);
}

allImage.forEach((image) => {
    image.addEventListener("click", () => {
        const userChoice = image.getAttribute("id");
        console.log("cliked", userChoice);
        if (userChoice === "rock") {
            paper.style.display = "none";
            scissor.style.display = "none";
            console.log("hidden", paper, scissor);
        } else if (userChoice === "scissor") {
            rock.style.display = "none";
            paper.style.display = "none";
        } else if (userChoice === "paper") {
            rock.style.display = "none";
            scissor.style.display = "none";
        }
        image.classList.toggle("rotating"); // it is toggling the class for the animation which continuously rotate at 360deg

        // this time interval is set to make delay on result producing
        setTimeout(() => {
            image.classList.remove("rotating");
            playGame(userChoice); 
            rock.style.display = "flex";
            paper.style.display = "flex";
            scissor.style.display = "flex"; //all the game play will be played in this time interval
        }, 1000);                  // 1000 is passed for the delay
    })
})

const genComputerChoice = () => {
    randomIdx = Math.floor(Math.random() * choices.length);
    return choices[randomIdx];


    // using for loop

    // let randomIndex;
    // for(let i = 0; i < choices.length; i++) {
    //   randomIndex = Math.floor(Math.random() * choices.length);
    // }
    // return choices[randomIndex];
}



const draw = () => {
    gameTheme.textContent = "It's a draw."
    gameTheme.style.backgroundColor = "rgb(62, 100, 138)";
    console.log("Its Draw");
}

const reset = () => {
    playAgain.classList.add("button");
    playAgain.innerHTML = "Play Again";
    playAgain.style.backgroundColor = "rgb(62, 100, 138)";
    gameBox.after(playAgain);

    playAgain.addEventListener("click", () => {
        gameBox.style.display = "flex";
        playAgain.style.display = "none";
        uScore = 0;
        cScore = 0;
        userScore.innerText = uScore;
        computerScore.innerText = cScore;
        gameTheme.innerText = "Pick your move";
        gameTheme.style.backgroundColor = "rgb(62, 100, 138)";

       // after clicking playAgain button
        descriptionBox.addEventListener("click", () => {
            gameBox.classList.toggle("hide");
            if (gameBox.classList.contains("hide")) {
                gameBox.style.display = "none";
            } else {
                gameBox.style.display = "flex";
            }
        })

    })
    console.log(playAgain);
}

const gameRoundWin = () => {
    // when score reaches to 5
    if (uScore === 5 || cScore === 5) {
        gameTheme.innerText = `${cScore === 5 ? "Computer" : "Player"
            } has won the game!`;

        gameBox.style.display = "none";

        // after winning the round if we click on rules arrow
        descriptionBox.addEventListener("click", () => {
            playAgain.classList.toggle("hide");
            gameBox.classList.toggle("hide");
            console.log("gamebox", gameBox);
            console.log("hide button", playAgain)
        })
        reset();
    }
};

const showWinner = (userWin) => {
    if (userWin) {
        gameTheme.innerText = `You Won! Computer chose "${choices[randomIdx]}"`
        gameTheme.style.backgroundColor = "rgb(0, 150, 0)";
        gameTheme.style.color = "#fff";
        uScore++;
        userScore.innerText = uScore;
        console.log("User Score:", uScore);
    } else {
        gameTheme.innerText = `Computer won! Computer chose "${choices[randomIdx]}"`
        gameTheme.style.backgroundColor = "rgb(255, 0, 0, 0.9)";
        gameTheme.style.color = "#fff";
        cScore++;
        computerScore.innerText = cScore;
        console.log("Computer Score:", cScore);
    }

    gameRoundWin();
    console.log("win", userWin)
}

const playGame = (userChoice) => {
    const computerChoice = genComputerChoice();
    console.log("comp", computerChoice)

    let userWin = false;

    if (userChoice === computerChoice) {
        draw();
        return;
    }

    if (userChoice === "rock") {
        userWin = (computerChoice === "scissor");
    } else if (userChoice === "paper") {
        userWin = (computerChoice === "rock");
    } else if (userChoice === "scissor") {
        userWin = (computerChoice === "paper");
    }

    showWinner(userWin);
}

