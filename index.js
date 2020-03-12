// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDd9oX6brOzmnlTVtjK5yW1ISzCnpk8tkU',
    authDomain: 'i-got-it-game.firebaseapp.com',
    projectId: 'i-got-it-game'
  });
  
var db = firebase.firestore();

var highScoreRef = db.collection("highscore").doc("B2UE3aOlL8Dn7inesBCW");
var highScoreDoc = db.collection("highscore");

var pos = 0;
var firstNum, secondNum, operationSelect, previousNum, previousOp, previousNumId;
var solutionNum1, solutionNum2, solutionNum3, solutionNum4;
var findNum;
var endBoolean = 0; //0 - Game Standby, 1 - Game Begin (No Solution), 2 - Game Begin (Done), 3 - Game Begin (Timeout)
var id;
var currentScore = 0;
var trueScore = 0;
var highScore;
var gameRound = 0;
var index;
var width = 100;
var solutionPosition = [];

highScoreRef.get().then(function(doc) {
    if (doc.exists) {
        const { score } = doc.data();
        console.log(score);
        console.log("Retrieved current High Score");
        highScore = score;
        document.getElementById("score-number").textContent = "Global High Score: " + highScore;
    } else {
        document.getElementById("score-number").textContent = "Unable to load High Score";
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

function setupEventListeners() {
    document.addEventListener('dblclick', e => e.preventDefault());
    document.getElementById("clear-btn").addEventListener('click', clearAll);
    document.getElementById("submit-btn").addEventListener('click', endRound)
    document.getElementById("new-btn").addEventListener('click', newRound);
}

function setupGameElements() {
    endBoolean = 0;
    pos = 0;

    document.addEventListener('click', ctrlSelect);

    document.getElementById("score-number").textContent = "Score: " + currentScore;

    createQuestion();

    var solutionNumbers = [solutionNum1, solutionNum2, solutionNum3, solutionNum4];
    var solutionBoxIndex = ["solution-1", "solution-2", "solution-3", "solution-4"];
    
    var i;

    for (i = 0; i < 4; i++) {
        var randomSolution = solutionNumbers[Math.floor(Math.random() * solutionNumbers.length)];
        var solutionIndex = solutionNumbers.indexOf(randomSolution);
        
        solutionNumbers.splice(solutionIndex, 1);

        var randomBox = solutionBoxIndex[Math.floor(Math.random() * solutionBoxIndex.length)];
        var boxIndex = solutionBoxIndex.indexOf(randomBox);
        
        solutionBoxIndex.splice(boxIndex, 1);

        document.getElementById(randomBox).textContent = randomSolution;

        randomBox = randomBox.replace('solution-', '');
        // console.log(randomBox);

        solutionPosition[randomBox-1] = randomSolution;
        // console.log(solutionPosition);
    }

    document.getElementById("target-number").textContent = findNum;

    document.getElementById("submit-btn").textContent = "DONE";
    document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
    document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
    document.getElementById("submit-btn").style.color = "#ffffff";
    document.getElementById("clear-btn").style.display = "flex";
    document.getElementById("new-btn").style.display = "none";

    startTimer();
}

function createQuestion() {
    var loopCount = 0;
    gameRound++;
    findNum = 0;

    if(gameRound > 0 && gameRound <= 5) {
        index = 1;
        solutionNum1 = Math.floor((Math.random() * 10) + 1);
        solutionNum2 = Math.floor((Math.random() * 10) + 1);

        while(findNum == 0 || findNum < 0 || findNum % 1 != 0 || findNum > 10) {
            firstMath = calculation(solutionNum1, solutionNum2);
            console.log(solutionNum1);
            console.log(solutionNum2);
            console.log("firstMath " + firstMath);

            findNum = firstMath;
    
            loopCount++;
            console.log("Loop Count: " + loopCount);
    
            if(loopCount > 20) {
                console.log("Rerolling numbers")
                solutionNum1 = Math.floor((Math.random() * 10) + 1);
                solutionNum2 = Math.floor((Math.random() * 10) + 1);

                loopCount = 0;
            }
    
            console.log("Generating question.");
        }
    } else if(gameRound > 5 && gameRound <= 10) {
        index = 3;
        solutionNum1 = Math.floor((Math.random() * 10) + 1);
        solutionNum2 = Math.floor((Math.random() * 10) + 1);
        solutionNum3 = Math.floor((Math.random() * 10) + 1);
        solutionNum4 = Math.floor((Math.random() * 10) + 1);
    
        while(findNum == 0 || findNum < 0 || findNum % 1 != 0 || findNum > 10) {
            firstMath = calculation(solutionNum1, solutionNum2);
            console.log(solutionNum1);
            console.log(solutionNum2);
            console.log("firstMath " + firstMath);
        
            secondMath = calculation(firstMath, solutionNum3);
            console.log(firstMath);
            console.log(solutionNum3);
            console.log("secondMath " + secondMath);
        
            findNum = calculation(secondMath, solutionNum4);
            console.log(secondMath);
            console.log(solutionNum4);
            console.log("findNum " + findNum);
    
            loopCount++;
            console.log("Loop Count: " + loopCount);
    
            if(loopCount > 20) {
                console.log("Rerolling numbers")
                solutionNum1 = Math.floor((Math.random() * 10) + 1);
                solutionNum2 = Math.floor((Math.random() * 10) + 1);
                solutionNum3 = Math.floor((Math.random() * 10) + 1);
                solutionNum4 = Math.floor((Math.random() * 10) + 1);
                loopCount = 0;
            }
    
            console.log("Generating question.");
        }
    } else if(gameRound > 10) {
        index = 3;
        solutionNum1 = Math.floor((Math.random() * 15) + 1);
        solutionNum2 = Math.floor((Math.random() * 15) + 1);
        solutionNum3 = Math.floor((Math.random() * 15) + 1);
        solutionNum4 = Math.floor((Math.random() * 15) + 1);
    
        while(findNum == 0 || findNum < 0 || findNum % 1 != 0 || findNum > 50) {
            firstMath = calculation(solutionNum1, solutionNum2);
            console.log(solutionNum1);
            console.log(solutionNum2);
            console.log("firstMath " + firstMath);
        
            secondMath = calculation(firstMath, solutionNum3);
            console.log(firstMath);
            console.log(solutionNum3);
            console.log("secondMath " + secondMath);
        
            findNum = calculation(secondMath, solutionNum4);
            console.log(secondMath);
            console.log(solutionNum4);
            console.log("findNum " + findNum);
    
            loopCount++;
            console.log("Loop Count: " + loopCount);
    
            if(loopCount > 20) {
                console.log("Rerolling numbers")
                solutionNum1 = Math.floor((Math.random() * 15) + 1);
                solutionNum2 = Math.floor((Math.random() * 15) + 1);
                solutionNum3 = Math.floor((Math.random() * 15) + 1);
                solutionNum4 = Math.floor((Math.random() * 15) + 1);
                loopCount = 0;
            }
    
            console.log("Generating question.");
        }
    }

    console.log("Question generated.");
    console.log("Begin Round: " + gameRound);
}

function calculation(a, b) {
    var opArray = ['+', '-', '*', '/'];
    var result = 0;
    var math_it_up = {
        '+' : function(x,y) {return x + y},
        '-' : function(x,y) {return x - y},
        '*' : function(x,y) {return x * y},
        '/' : function(x,y) {return x / y}
    };

    while(result == 0 || result < 0 || result % 1 != 0) {
        var randomOp = opArray[Math.floor(Math.random() * 4)];

        result = math_it_up[randomOp](a, b);
        console.log("Calculating");
    }
    console.log("Done calculating")

    return result;
}

function startTimer() {
    var i = 0;

    if (i == 0) {
        i = 1;
        var elem = document.getElementById("progress-bar");
        id = setInterval(frame, 600);
        function frame() {
            if (width <= 0) {
            clearInterval(id);
            i = 0;
            endBoolean = 3;
            endRound();
            } else {
            width--;
            elem.style.width = width + "%";
            }
        }
    }
}

function endRound() {
    if(endBoolean == 0) {
        setupEventListeners();
        setupGameElements();
        endBoolean = 2;
    } else if(endBoolean == 2) {
        console.log("Game End - Done");
        clearInterval(id);
        // console.log("The index is: " + index);

        if(index == 0) {
            var ans1 = document.getElementById("solution-1").textContent;
            var ans2 = document.getElementById("solution-2").textContent;
            var ans3 = document.getElementById("solution-3").textContent;
            var ans4 = document.getElementById("solution-4").textContent;

            if(ans1 == findNum || ans2 == findNum || ans3 == findNum || ans4 == findNum) {
                currentScore++;
                trueScore++;
                currentScore = trueScore;
                width += 20;

                if(width > 100) {
                    width = 100;
                }

                document.getElementById("progress-bar").style.width = width + "%";
                // console.log("Score is: " + score);
                document.getElementById("score-number").textContent = "Score: " + currentScore;
                document.getElementById("submit-btn").textContent = "CORRECT";
                document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
                document.getElementById("submit-btn").style.color = "#ffffff";
                document.getElementById("new-btn").style.display = "block";
                document.getElementById("clear-btn").style.display = "none";
            } else {
                width -= 15;
                if(width <= 0) {
                    width = 0;
                    document.getElementById("progress-bar").style.width = width + "%";
                    gameOver();
                } else {
                    document.getElementById("progress-bar").style.width = width + "%";
                    document.getElementById("score-number").textContent = "Score: " + currentScore;
                    document.getElementById("submit-btn").textContent = "WRONG";
                    document.getElementById("submit-btn").style.backgroundColor = "#E63946";
                    document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
                    document.getElementById("submit-btn").style.color = "#ffffff";
                    document.getElementById("new-btn").style.display = "block";
                    document.getElementById("clear-btn").style.display = "none";
                }
            }
        } else {
            width -= 15;
            if(width <= 0) {
                width = 0;
                document.getElementById("progress-bar").style.width = width + "%";
                gameOver();
            } else {
                document.getElementById("progress-bar").style.width = width + "%";
                document.getElementById("score-number").textContent = "Score: " + currentScore;
                document.getElementById("submit-btn").textContent = "WRONG";
                document.getElementById("submit-btn").style.backgroundColor = "#E63946";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
                document.getElementById("submit-btn").style.color = "#ffffff";
                document.getElementById("new-btn").style.display = "block";
                document.getElementById("clear-btn").style.display = "none";
            }
        }

        document.getElementById("solution-1").style.backgroundColor = "#457B9D";
        document.getElementById("solution-2").style.backgroundColor = "#457B9D";
        document.getElementById("solution-3").style.backgroundColor = "#457B9D";
        document.getElementById("solution-4").style.backgroundColor = "#457B9D";

        document.getElementById("clear-btn").removeEventListener('click', clearAll);
        document.getElementById("submit-btn").removeEventListener('click', endRound);

        document.removeEventListener('click', ctrlSelect);
    } else if(endBoolean == 3) {
        gameOver();
    }
}

function gameOver() {
    console.log("Game End - Time's Up");
    clearInterval(id);
    currentScore = trueScore;

    if(currentScore > highScore) {
        document.getElementById("score-number").textContent = "New Global High Score: " + currentScore;
        highScoreDoc.doc("B2UE3aOlL8Dn7inesBCW").set({
            score: currentScore });

        highScoreRef.get().then(function(doc) {
            if (doc.exists) {
                const { score } = doc.data();
                console.log("Retrieved new High Score: " + score);
            } else {
                console.log("Unable to retrieve new High Score!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } else {
        document.getElementById("score-number").textContent = "Final Score: " + currentScore;
    }

    document.getElementById("submit-btn").textContent = "GAME OVER";
    document.getElementById("clear-btn").style.display = "none";
    document.getElementById("submit-btn").style.backgroundColor = "#2c3e50";
    document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #242424";
    document.getElementById("submit-btn").style.color = "#ffffff";

    document.getElementById("solution-1").style.backgroundColor = "#457B9D";
    document.getElementById("solution-2").style.backgroundColor = "#457B9D";
    document.getElementById("solution-3").style.backgroundColor = "#457B9D";
    document.getElementById("solution-4").style.backgroundColor = "#457B9D";

    document.removeEventListener('click', ctrlSelect);
    document.getElementById("clear-btn").removeEventListener('click', clearAll);
    document.getElementById("submit-btn").removeEventListener('click', endRound);
    document.getElementById("new-btn").removeEventListener('click', newRound);

    document.getElementById("new-btn").addEventListener('click', newGame);
    document.getElementById("new-btn").textContent = "NEW GAME";
    document.getElementById("new-btn").style.display = "block";

    gameRound = 0;
}

function newGame() {
    currentScore = 0;
    width = 100;
    document.getElementById("new-btn").textContent = "NEXT QUESTION";
    document.getElementById("new-btn").removeEventListener('click', newGame);
    document.getElementById("score-number").textContent = "Score: " + currentScore;
    setupEventListeners();
    setupGameElements();
    endBoolean = 2;
}

function newRound() {
    setupEventListeners();
    setupGameElements();
    endBoolean = 2;
}

function ctrlSelect(event) {
    var targetElement = event.target || event.srcElement;

    if(targetElement.textContent == "") {
        return;
    }

    switch(pos) {
        case 0:
            if(targetElement.id.includes("solution")) {
                document.getElementById("clear-btn").style.display = "flex";
                document.getElementById("clear-btn").style.boxShadow = "0px 8px 0px 0px #1D3557";
                document.getElementById("submit-btn").textContent = "DONE";
                document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
                document.getElementById("submit-btn").style.color = "#ffffff";
                firstNum = parseInt(targetElement.textContent);
                previousNum = targetElement;
                previousNumId = targetElement.id;
                targetElement.style.backgroundColor = "#274A60";
                console.log(firstNum + " is selected.")
                pos++;
                endBoolean = 2;
            }
            break;

        case 1:
            if(targetElement.id.includes("solution")) {
                if(previousNum == targetElement) {
                    firstNum = "";
                    previousNum = "";
                    previousNumId = "";
                    targetElement.style.backgroundColor = "#457B9D";
                    console.log("Number deselected");
                    pos--;
                } else {
                    firstNum = parseInt(targetElement.textContent);
                    if(previousNum !== "") {
                        previousNum.style.backgroundColor = "#457B9D";
                    }
                    previousNum = targetElement;
                    previousNumId = targetElement.id;
                    targetElement.style.backgroundColor = "#274A60";
                    console.log(firstNum + " is selected.")
                }

            } if(targetElement.id.includes("operation")) {
                operationSelect = targetElement.textContent;
                previousOp = targetElement;
                targetElement.style.backgroundColor = "#79B5B7";
                console.log(operationSelect + " is selected.")
                pos++;
            }
            break;

        case 2:
            if(targetElement.id.includes("solution") && targetElement.id != previousNumId) {
                secondNum = parseInt(targetElement.textContent);
                targetElement.textContent = (Math.round( calculateResult() * 10 ) / 10);
                index--;
                if(targetElement.textContent == 0) {
                    index--;
                    document.getElementById(targetElement.id).textContent = "";
                }
                document.getElementById(previousNumId).textContent = "";
                previousNum.style.backgroundColor = "#457B9D";
                previousOp.style.backgroundColor = "#A8DADC";
                pos = 0;
            } if(targetElement.id.includes("operation")) {
                if(previousOp == targetElement) {
                    previousOp = "";
                    targetElement.style.backgroundColor = "#A8DADC";
                    console.log("Operator deselected");
                    pos--;  
                } else {
                    operationSelect = targetElement.textContent;
                    if(previousOp !== "") {
                        previousOp.style.backgroundColor = "#A8DADC";
                    }
                    previousOp = targetElement;
                    targetElement.style.backgroundColor = "#79B5B7";
                    console.log(operationSelect + " is selected.")
                }
            }
    }
}

function clearAll() {
    firstNum = "";
    secondNum = "";
    operationSelect = "";
    previousNum = "";
    previousOp = "";
    previousNumId = "";
    pos = 0;
    endBoolean = 2;
    index = 3;

    document.getElementById("solution-1").style.backgroundColor = "#457B9D";
    document.getElementById("solution-2").style.backgroundColor = "#457B9D";
    document.getElementById("solution-3").style.backgroundColor = "#457B9D";
    document.getElementById("solution-4").style.backgroundColor = "#457B9D";

    document.getElementById("operation-1").style.backgroundColor = "#A8DADC";
    document.getElementById("operation-2").style.backgroundColor = "#A8DADC";
    document.getElementById("operation-3").style.backgroundColor = "#A8DADC";
    document.getElementById("operation-4").style.backgroundColor = "#A8DADC";

    var i;

    for(i = 0; i < solutionPosition.length; i++) {
        document.getElementById("solution-" + (i+1)).textContent = solutionPosition[i];
    }

    console.log("Clear all");
}

function calculateResult() {
    switch(operationSelect) {
        case "+":
            return firstNum + secondNum;
        
        case "-":
            return firstNum - secondNum;

        case "x":
            return firstNum * secondNum;

        case "/":
            return firstNum / secondNum;
    }
}

function init() {
    setupEventListeners();
    document.getElementById("clear-btn").style.display = "none";
    console.log('Game has started.');
}

init();