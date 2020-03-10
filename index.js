var controller = (function() {

    var pos = 0;
    var firstNum, secondNum, operationSelect, previousNum, previousOp, previousNumId;
    var solutionNum1, solutionNum2, solutionNum3, solutionNum4;
    var findNum;
    var endBoolean = 0; //0 - Game Standby, 1 - Game Begin (No Solution), 2 - Game Begin (Done), 3 - Game Begin (Timeout)
    var id;
    var score = 0;
    var index = 3;

    var setupEventListeners = function() {
        document.addEventListener('dblclick', e => e.preventDefault());
        document.getElementById("clear-btn").addEventListener('click', clearAll);
        document.getElementById("submit-btn").addEventListener('click', endRound)
        document.getElementById("new-btn").addEventListener('click', newRound);
    };

    var setupGameElements = function() {
        endBoolean = 0;
        index = 3;
        pos = 0;

        document.addEventListener('click', ctrlSelect);

        createQuestion();

        document.getElementById("solution-1").textContent = solutionNum1;
        document.getElementById("solution-2").textContent = solutionNum2;
        document.getElementById("solution-3").textContent = solutionNum3;
        document.getElementById("solution-4").textContent = solutionNum4;

        document.getElementById("target-number").textContent = findNum;

        document.getElementById("submit-btn").textContent = "NO SOLUTION";
        document.getElementById("submit-btn").style.backgroundColor = "#E63946";
        document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
        document.getElementById("submit-btn").style.color = "#ffffff";
        document.getElementById("clear-btn").style.display = "none";
        document.getElementById("new-btn").style.display = "none";

        startTimer();
    }

    var createQuestion = function() {
        findNum = Math.floor((Math.random() * 10) + 1);

        solutionNum1 = Math.floor((Math.random() * 10) + 1);
        solutionNum2 = Math.floor((Math.random() * 10) + 1);

        var firstMath = calculation(solutionNum1, solutionNum2, findNum, 0);
        console.log(firstMath);
        
        solutionNum3 = Math.floor((Math.random() * 10) + 1);

        var secondMath = calculation(firstMath, solutionNum3, findNum, 0);
        console.log(secondMath);

        solutionNum4 = Math.floor((Math.random() * 10) + 1);

        var lastMath = calculation(secondMath, solutionNum4, findNum, 1);
    }

    var startTimer = function() {
        var i = 0;

        if (i == 0) {
            i = 1;
            var elem = document.getElementById("progress-bar");
            var width = 100;
            id = setInterval(frame, 300);
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

    var endRound = function() {
        if(endBoolean == 0) {
            setupEventListeners();
            setupGameElements();
            endBoolean = 1;
        } else if(endBoolean == 1) {
            console.log("Game End - No Solution");
            clearInterval(id);
            document.getElementById("submit-btn").textContent = "NO SOLUTION";
            document.getElementById("clear-btn").style.display = "none";
            document.getElementById("submit-btn").style.backgroundColor = "#E63946";
            document.getElementById("submit-btn").style.color = "#ffffff";
            document.getElementById("new-btn").style.display = "block";

            document.getElementById("solution-1").style.backgroundColor = "#457B9D";
            document.getElementById("solution-2").style.backgroundColor = "#457B9D";
            document.getElementById("solution-3").style.backgroundColor = "#457B9D";
            document.getElementById("solution-4").style.backgroundColor = "#457B9D";

            document.removeEventListener('click', ctrlSelect);
            document.getElementById("clear-btn").removeEventListener('click', clearAll);
            document.getElementById("submit-btn").removeEventListener('click', endRound)
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
                    score++;
                    // console.log("Score is: " + score);
                    document.getElementById("score-number").textContent = "Score: " + score;
                    document.getElementById("submit-btn").textContent = "CORRECT";
                    document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
                    document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #176538";
                    document.getElementById("submit-btn").style.color = "#ffffff";
                    document.getElementById("new-btn").style.display = "block";
                    document.getElementById("clear-btn").style.display = "none";
                } else {
                    document.getElementById("score-number").textContent = "Score: " + score;
                    document.getElementById("submit-btn").textContent = "WRONG";
                    document.getElementById("submit-btn").style.backgroundColor = "#E63946";
                    document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
                    document.getElementById("submit-btn").style.color = "#ffffff";
                    document.getElementById("new-btn").style.display = "block";
                    document.getElementById("clear-btn").style.display = "none";
                }
            } else {
                document.getElementById("score-number").textContent = "Score: " + score;
                document.getElementById("submit-btn").textContent = "WRONG";
                document.getElementById("submit-btn").style.backgroundColor = "#E63946";
                document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";
                document.getElementById("submit-btn").style.color = "#ffffff";
                document.getElementById("new-btn").style.display = "block";
                document.getElementById("clear-btn").style.display = "none";
            }

            document.getElementById("solution-1").style.backgroundColor = "#457B9D";
            document.getElementById("solution-2").style.backgroundColor = "#457B9D";
            document.getElementById("solution-3").style.backgroundColor = "#457B9D";
            document.getElementById("solution-4").style.backgroundColor = "#457B9D";

            document.getElementById("clear-btn").removeEventListener('click', clearAll);
            document.getElementById("submit-btn").removeEventListener('click', endRound);

            document.removeEventListener('click', ctrlSelect);
        } else if(endBoolean == 3) {
            console.log("Game End - Time's Up");
            clearInterval(id);
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
        }
    }

    var newRound = function() {
        setupEventListeners();
        setupGameElements();
        endBoolean = 1;
    }
    var ctrlSelect = function(event) {
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
                    console.log(index);
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
    };

    var clearAll = function() {
        firstNum = "";
        secondNum = "";
        operationSelect = "";
        previousNum = "";
        previousOp = "";
        previousNumId = "";
        pos = 0;
        endBoolean = 1;
        index = 3;

        document.getElementById("solution-1").style.backgroundColor = "#457B9D";
        document.getElementById("solution-2").style.backgroundColor = "#457B9D";
        document.getElementById("solution-3").style.backgroundColor = "#457B9D";
        document.getElementById("solution-4").style.backgroundColor = "#457B9D";

        document.getElementById("operation-1").style.backgroundColor = "#A8DADC";
        document.getElementById("operation-2").style.backgroundColor = "#A8DADC";
        document.getElementById("operation-3").style.backgroundColor = "#A8DADC";
        document.getElementById("operation-4").style.backgroundColor = "#A8DADC";

        document.getElementById("solution-1").textContent = solutionNum1;
        document.getElementById("solution-2").textContent = solutionNum2;
        document.getElementById("solution-3").textContent = solutionNum3;
        document.getElementById("solution-4").textContent = solutionNum4;

        document.getElementById("clear-btn").style.display = "none";
        document.getElementById("submit-btn").textContent = "NO SOLUTION";
        document.getElementById("submit-btn").style.backgroundColor = "#E63946";
        document.getElementById("submit-btn").style.boxShadow = "0px 8px 0px 0px #9C031E";

        console.log("Clear all");
    }

    var calculateResult = function() {
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
    
    return {
        init: function() {
            setupEventListeners();
            document.getElementById("clear-btn").style.display = "none";
            console.log('Game has started.');
        },

        
    }

})();

function calculation(a, b, finalResult, last) {
    var opArray = ['+', '-', '*', '/'];
    var numberArray = [1,2,3,4,5,6,7,8,9,10];

    var result = 0;

    var math_it_up = {
        '+' : function(x,y) {return x + y},
        '-' : function(x,y) {return x - y},
        '*' : function(x,y) {return x * y},
        '/' : function(x,y) {return x / y}
    };

    if(last) {
        while(result != finalResult) {
            var randomOp = opArray[Math.floor(Math.random() * opArray.length)];

            result = math_it_up[randomOp](a, b);

            if(result != finalResult) {
                var index = opArray.indexOf(randomOp);

                opArray.splice(index, 1)

                if(opArray.length == 0) {
                    opArray = ['+', '-', '*', '/'];

                    var numberIndex = numberArray.indexOf(b);

                    numberArray.splice(numberIndex, 1);

                    b = numberArray[Math.floor(Math.random() * numberArray.length)];
                }
            }
        }
    } else {
        while(result == 0 || result < 0 || result % 1 != 0) {
            var randomOp = opArray[Math.floor(Math.random() * 4)];
    
            result = math_it_up[randomOp](a, b);
        }
    }

    return result;
}

controller.init();