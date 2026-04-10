// add javascript here
//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];
let range = 3;
let startTime;
let totalTime = 0;
let fastestTime = null;
let roundsPlayed = 0;

//player name
let playerName = prompt("Enter your name:");
playerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();

//play


//get level
document.getElementById("playBtn").addEventListener("click", function() {
    let radios = document.getElementsByName("level");
    range = 3;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked) {
            range  = parseInt(radios[i].value);
        }
    }

//pick answer
answer = Math.floor(Math.random() * range) + 1;
guessCount = 0;

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
startTimer();

});


//guessing
document.getElementById("guessBtn").addEventListener("click", function() {
let input = Number(document.getElementById("guess").value);
let num = parseInt(input);
if (isNaN(num)) {
    document.getElementById("msg").textContent = "Please enter a valid number!";
    return;
}
guessCount++;
let diff = Math.abs(num - answer);

if (num === answer){
    document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses!";
    updateScore(guessCount);
    resetButtons(); //stop buttons
    stopTimer();
}
else if (num > answer) {
    let temp = "";
    if (diff <= 2) {
            temp = "Hot!"; 
}       else if (diff <= 5) {
                    temp = "Warm!";
             } else {
                    temp = "Cold!";
             }

    document.getElementById("msg").textContent = "Too high. " + temp;
    
} else {
      if (diff <= 2) {
            temp = "Hot!"; 
}       else if (diff <= 5) {
                    temp = "Warm!";
             } else {
                    temp = "Cold!";
             }
        document.getElementById("msg").textContent = "Too low. " + temp;
        }
        
    });

//update score when win
function updateScore(score) {
    totalWins++;
    totalGuesses += score;
    //score for round & average
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses / totalWins).toFixed(2);

    //update leader game
    scores.push(score);
    scores.sort(function(a,b){return a-b;});

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i = 0; i < leaderboard.length; i++) {
        if (i < scores.length) {
            leaderboard[i].textContent = scores[i];
        } else {
            leaderboard[i].textContent = "--";
        }
    }
}

function resetButtons() {
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    let levelRadios = document.getElementsByName("level");
    for (let i = 0; i < levelRadios.length; i++) {
    levelRadios[i].disabled = false;
}

}

//give up
document.getElementById("giveUpBtn").addEventListener("click", function() {
    document.getElementById("msg").textContent = "The correct answer was " + answer + ". Better luck next time, " + playerName + "!";
    resetButtons();
    updateScore(range);
    stopTimer();
});

//date
setInterval(function() {
let now = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];
let day = now.getDate();
let year = now.getFullYear();
let suffix = "";
if (day % 10 === 1 && day !== 11) {
    suffix = "st";
} else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
} else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
}   else {
    suffix = "th";  
    }
  let time = now.toLocaleTimeString();

    let formattedDate = month + " " + day + suffix + ", " + year;

    document.getElementById("date").textContent =
        "Date: " + formattedDate + " | Time: " + time;


}, 1000);



// //timer
 function startTimer() {
    startTime = new Date().getTime(); 
}


let running = true
function stopTimer() {
    let endTime = new Date().getTime();
    let elapsed = (endTime - startTime) / 1000;

    totalTime += elapsed;
    roundsPlayed++;

    if (fastestTime === null || elapsed < fastestTime) {
        fastestTime = elapsed;
    }
    document.getElementById("fastest").textContent = "Fastest Game: " + fastestTime.toFixed(2) + " seconds";

    document.getElementById("avgTime").textContent = "Average Time: " + (totalTime / roundsPlayed).toFixed(2) + " seconds";
}


    







