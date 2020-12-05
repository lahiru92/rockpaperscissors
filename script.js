const resultdisplay = document.querySelector('#result');
const btncontainer = document.getElementById('buttons');
const btns = document.querySelectorAll('.rpcbtn');
let playerScore = 0, comScore = 0;
let matchscore = 3;
let newgame = false;



btns.forEach(button => {
    button.addEventListener('click', () => {
        let player = button.getAttribute('id');
        let computer = computerPlay()
        let playerchoice = document.querySelector('#playerchoice');
        let comchoice = document.querySelector('#comchoice');

        if(newgame) {
            document.querySelector('#comscore').innerHTML = 0;
            document.querySelector('#playerscore').innerHTML = 0;
        }
        btns.forEach(btn => {
            btn.setAttribute('disabled', 'true');
        });

        playerchoice.querySelector('img').setAttribute('src', 'rock.png');
        comchoice.querySelector('img').setAttribute('src', 'rock.png');
        playerchoice.classList.add('bounce-right');
        comchoice.classList.add('bounce-left');

        let timer = setTimeout(function(){
            playerchoice.querySelector('img').setAttribute('src', player+".png");
            comchoice.querySelector('img').setAttribute('src', computer+".png");
            playerchoice.classList.remove('bounce-right');
            comchoice.classList.remove('bounce-left');
            btns.forEach(btn => {
                btn.removeAttribute('disabled');
            });
            

            if(newgame) {
                resultdisplay.textContent = "New Game";
                newgame = false;
            }
    
            let result = playRound(player, computer);
    
    
    
            if (result === 'com') {
                comScore++;
            } else if (result ==='player') {
                playerScore++;
            }
    
            console.log(result,playerScore,comScore);
            document.querySelector('#comscore').innerHTML = comScore;
            document.querySelector('#playerscore').innerHTML = playerScore;
            if (playerScore >= matchscore || comScore >= matchscore) {
                win();  
            }
        },990);
        
    });
});

function win() {
    let winner = "";
    if (comScore > playerScore) {
        console.log("Player:",playerScore,"Com",comScore,"Computer Wins");
        winner = "Computer Wins";
    } else if (playerScore > comScore) {
        console.log("Player:",playerScore,"Com",comScore,"Player Wins");
        winner = "Player Wins";
    } else {
        console.log("Player:",playerScore,"Com",comScore,"Tie");
        winner = "Match Tied";
    }
    
    result.textContent = winner;
    playerScore = 0;
    comScore = 0;
    newgame = true;
}


function computerPlay() {
    const a = ['rock', 'paper', 'scissor'];
    num = Math.floor(Math.random()*3);
    return a[num];
    
}

function playRound(playerSelection, computerSelection) {
    console.log("play");

    console.log(`You: ${playerSelection}, Computer:${computerSelection}`)
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === 'rock' && computerSelection === 'scissor') {
        return 'player';

    } else if(playerSelection === 'paper' && computerSelection === 'rock') {
        return 'player';

    } else if(playerSelection === 'scissor' && computerSelection === 'paper') {
        return 'player';

    } else if(playerSelection === 'rock' && computerSelection === 'paper') {
        return 'com';
        
    } else if(playerSelection === 'paper' && computerSelection === 'scissor') {
        return 'com';
        
    } else if(playerSelection === 'scissor' && computerSelection === 'rock') {
        return 'com';
        
    } else {
        return 'tie';
    }
}

