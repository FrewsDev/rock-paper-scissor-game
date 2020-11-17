const ruleBtn = document.getElementById("rule_btn")
const ruleBtnClose = document.getElementById("rule_btn_close")
const firstStep = document.querySelector(".pick-turn")
const secondStep = document.querySelector(".picked-turn")
const thirdStep = document.querySelector("section.result-turn")

const player = Array.from(document.querySelectorAll(".you-pick"))
const house = Array.from(document.querySelectorAll(".house-pick"))

var game = { step: 1, score: 0, picked: '', housePicked: '' }

var choices = ["", "scissor", "paper", "rock"]

if (loadGame()) {
    game = loadGame()
}

ruleBtn.addEventListener("click", () => {
    setModalState("flex")
})

ruleBtnClose.addEventListener("click", () => {
    setModalState("none")
})

function setModalState(state) {
    document.querySelector(".modal").style.display = state
}

function pick(pick) {
    game.picked = pick
    game.step = 2
    saveGame()
    execute()
}

function execute() {
    if (loadGame()) {
        game = loadGame()
    }
    console.log(game)
    switch (game.step) {
        case 1:
            firstStep.style.display = "flex"
            secondStep.style.display = "none"
            thirdStep.style.display = "none"
            break
        case 2:
            setPicked()
            firstStep.style.display = "none"
            secondStep.style.display = "flex"
            thirdStep.style.display = "none"
            break
        case 3:
            firstStep.style.display = "none"
            secondStep.style.display = "none"
            thirdStep.style.display = "grid"
            break
    }


}

function setPicked() {
    setDesign()
    setTimeout(() => housePick(), 2000)
}

function housePick() {
    game.housePicked = choices[parseInt(Math.random() * (4 - 1) + 1)]
    saveGame()
    setDesign()
    setTimeout(() => setWinner(), 500)
}

function setDesign() {
    switch (game.picked) {
        case 'scissor':
            player.map(p => {
                p.classList.add("scissor")
                p.firstChild.src = "./images/icon-scissors.svg"
            })
            break
        case 'paper':
            player.map(p => {
                p.classList.add("paper")
                p.firstChild.src = "./images/icon-paper.svg"
            })
            break
        case 'rock':
            player.map(p => {
                p.classList.add("rock")
                p.firstChild.src = "./images/icon-rock.svg"
            })
            break
        default:
            player.map(p => {
                p.classList.remove("scissor")
                p.classList.remove("paper")
                p.classList.remove("rock")
                p.firstChild.src = ""
            })
            break
    }

    switch (game.housePicked) {
        case 'scissor':
            house.map(h => {
                h.classList.remove("none")
                h.classList.add("scissor")
                h.firstChild.src = "./images/icon-scissors.svg"
            })
            break
        case 'paper':
            house.map(h => {
                h.classList.remove("none")
                h.classList.add("paper")
                h.firstChild.src = "./images/icon-paper.svg"
            })
            break
        case 'rock':
            house.map(h => {
                h.classList.remove("none")
                h.classList.add("rock")
                h.firstChild.src = "./images/icon-rock.svg"
            })
            break
        default:
            house.map(h => {
                h.classList.remove("scissor")
                h.classList.remove("paper")
                h.classList.remove("rock")
                h.className = "game-btn none"
                h.firstChild.src = ""
            })
            break
    }
}

function setWinner() {

    if (
        game.picked == "scissor" && game.housePicked == "paper"
        || game.picked == "paper" && game.housePicked == "rock"
        || game.picked == "rock" && game.housePicked == "scissor"
    ) {
        thirdStep.querySelector('h3').innerHTML = "YOU WIN"
        game.score++
        player[1].classList.add("winner")
        house[1].classList.remove("winner")
    } else if (
        game.housePicked == "scissor" && game.picked == "paper"
        || game.housePicked == "paper" && game.picked == "rock"
        || game.housePicked == "rock" && game.picked == "scissor"
    ) {
        thirdStep.querySelector('h3').innerHTML = "YOU LOSE"
        game.score--
        house[1].classList.add("winner")
        player[1].classList.remove("winner")
    } else if (game.picked == game.housePicked) {
        thirdStep.querySelector('h3').innerHTML = "DRAW"
        player[1].classList.remove("winner")
        house[1].classList.remove("winner")
    }

    setScore()
    game.step = 3
    saveGame()
    execute()
}

function setScore() {
    document.querySelector(".number").innerHTML = game.score
}

function playAgain() {

    house.map(h => {
        h.className = "game-btn none"
        h.firstChild.src = ""
    })

    player.map(p => {
        p.className = "game-btn"
        p.firstChild.src = ""
    })

    game.step = 1
    game.picked = ''
    game.housePicked = ''

    setDesign()
    saveGame()
    execute()
}

function reset() {
    game = { step: 1, score: 0, picked: '', housePicked: '' }
    saveGame()
    setScore()
    setDesign()
    execute()
}

function saveGame() {
    localStorage.setItem("game", JSON.stringify(game))
}

function loadGame() {
    return JSON.parse(localStorage.getItem("game"))
}

setDesign()
setScore()
setWinner()
execute()