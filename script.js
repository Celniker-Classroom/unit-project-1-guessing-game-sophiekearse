// add javascript here
//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = 0;

//player name
let playerName = prompt("Enter your name:");

//play


//get level
document.getElementById("playBtn").addEventListener("click", function() {
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked) {
            range  = parseInt(radios[i].value);
        }
    }

//pick answer
let answer = Math.floor(Math.random() * range) + 1;

//disable and enable buttons and radio choices
document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
document.getElementById("guess").value="";
document.getElementById("guessBtn").disabled = false;
document.getElementById("giveUpBtn").disabled = false;
document.getElementById("playBtn").disabled = true;

let levelRadios = document.getElementsByName("level");
for (let i = 0; i < levelRadios.length; i++) {
    levelRadios[i].disabled = true;
}

});


//guessing
document.getElementById("guessBtn").addEventListener("click", function() {
let guess = Number(document.getElementById("guess").value);
let temp = "";

if (Math.abs(guess - answer) <= 2) {
            temp = "hot"; 
}       else if (Math.abs(guess - answer) <= 5) {
                    temp = "warm";
             } else {
                    temp = "cold";
             }

if (guess > answer) {
    document.getElementById("msg").innerText = "Too high, " + temp;
    
} else if (guess < answer) {
        document.getElementById("msg").innerText = "Too low, " + temp;
        }
        else {
            document.getElementById("msg").innerText = "Correct! The answer was " + answer;
            totalWins++;
            totalGuesses += guessCount + 1;
            scores = totalWins / totalGuesses;
            document.getElementById("score").innerText = "Score: " + scores.toFixed(2);
            document.getElementById("guessBtn").disabled = true;
            document.getElementById("giveUpBtn").disabled = true;
            document.getElementById("playBtn").disabled = false;

            let levelRadios = document.getElementsByName("level");
            for (let i = 0; i < levelRadios.length; i++) {
                levelRadios[i].disabled = false;
            }
        }

    });
