var numberController = (function () {
    
})();

var UIController = (function() {

    var DOMstrings = {
        input1: 'solution-1',
        input2: 'solution-2',
        input3: 'solution-3',
        input4: 'solution-4'
    }
    
    return {
        getInput: function() {
            return {
                number1: document.getElementById(DOMstrings.input1).textContent,
                number2: document.getElementById(DOMstrings.input2).textContent,
                number3: document.getElementById(DOMstrings.input3).textContent,
                number4: document.getElementById(DOMstrings.input4).textContent,
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

var controller = (function(numberCtrl, UICtrl) {

    var pos = 0;
    var firstNum, secondNum, operationSelect, previousNum, previousOp, previousNumId;
    var solutionNum1, solutionNum2, solutionNum3, solutionNum4;
    var operation1, operation2, operation3;
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

        document.addEventListener('click', ctrlSelect);

        findNum = Math.floor((Math.random() * 10) + 1);

        solutionNum1 = Math.floor((Math.random() * 10) + 1);
        solutionNum2 = Math.floor((Math.random() * 10) + 1);
        solutionNum3 = Math.floor((Math.random() * 10) + 1);
        solutionNum4 = Math.floor((Math.random() * 10) + 1);

        document.getElementById("solution-1").textContent = solutionNum1;
        document.getElementById("solution-2").textContent = solutionNum2;
        document.getElementById("solution-3").textContent = solutionNum3;
        document.getElementById("solution-4").textContent = solutionNum4;

        document.getElementById("target-number").textContent = findNum;

        document.getElementById("submit-btn").textContent = "NO SOLUTION";
        document.getElementById("submit-btn").style.backgroundColor = "#d8d8d8";
        document.getElementById("submit-btn").style.color = "#000000";
        document.getElementById("clear-btn").style.display = "none";
        document.getElementById("new-btn").style.display = "none";

        startTimer();
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
            document.getElementById("submit-btn").style.backgroundColor = "#e74c3c";
            document.getElementById("submit-btn").style.color = "#ffffff";
            document.getElementById("new-btn").style.display = "block";

            document.getElementById("solution-1").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-2").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-3").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-4").style.backgroundColor = "#d8d8d8";

            document.removeEventListener('click', ctrlSelect);
            document.getElementById("clear-btn").removeEventListener('click', clearAll);
            document.getElementById("submit-btn").removeEventListener('click', endRound)
        } else if(endBoolean == 2) {
            console.log("Game End - Done");
            clearInterval(id);
            console.log("The index is: " + index);

            if(index == 0) {
                var ans1 = document.getElementById("solution-1").textContent;
                var ans2 = document.getElementById("solution-2").textContent;
                var ans3 = document.getElementById("solution-3").textContent;
                var ans4 = document.getElementById("solution-4").textContent;

                if(ans1 == findNum || ans2 == findNum || ans3 == findNum || ans4 == findNum) {
                    score++;
                    console.log("Score is: " + score);
                    document.getElementById("score-number").textContent = "Score: " + score;
                }
            }

            document.getElementById("submit-btn").style.backgroundColor = "#27ae60";
            document.getElementById("submit-btn").style.color = "#ffffff";
            document.getElementById("new-btn").style.display = "block";

            document.getElementById("solution-1").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-2").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-3").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-4").style.backgroundColor = "#d8d8d8";

            document.getElementById("clear-btn").removeEventListener('click', clearAll);
            document.getElementById("submit-btn").removeEventListener('click', endRound);

            document.removeEventListener('click', ctrlSelect);
        } else if(endBoolean == 3) {
            console.log("Game End - Time's Up");
            clearInterval(id);
            document.getElementById("submit-btn").textContent = "GAME OVER";
            document.getElementById("clear-btn").style.display = "none";
            document.getElementById("submit-btn").style.backgroundColor = "#2c3e50";
            document.getElementById("submit-btn").style.color = "#ffffff";

            document.getElementById("solution-1").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-2").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-3").style.backgroundColor = "#d8d8d8";
            document.getElementById("solution-4").style.backgroundColor = "#d8d8d8";

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
                    document.getElementById("submit-btn").textContent = "DONE";
                    firstNum = parseInt(targetElement.textContent);
                    previousNum = targetElement;
                    previousNumId = targetElement.id;
                    targetElement.style.backgroundColor = "#727272";
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
                        targetElement.style.backgroundColor = "#d8d8d8";
                        console.log("Number deselected");
                        pos--;
                    } else {
                        firstNum = parseInt(targetElement.textContent);
                        if(previousNum !== "") {
                            previousNum.style.backgroundColor = "#d8d8d8";
                        }
                        previousNum = targetElement;
                        previousNumId = targetElement.id;
                        targetElement.style.backgroundColor = "#727272";
                        console.log(firstNum + " is selected.")
                    }

                } if(targetElement.id.includes("operation")) {
                    operationSelect = targetElement.textContent;
                    previousOp = targetElement;
                    targetElement.style.backgroundColor = "#727272";
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
                    previousNum.style.backgroundColor = "#d8d8d8";
                    previousOp.style.backgroundColor = "#d8d8d8";
                    pos = 0;
                } if(targetElement.id.includes("operation")) {
                    if(previousOp == targetElement) {
                        previousOp = "";
                        targetElement.style.backgroundColor = "#d8d8d8";
                        console.log("Operator deselected");
                        pos--;  
                    } else {
                        operationSelect = targetElement.textContent;
                        if(previousOp !== "") {
                            previousOp.style.backgroundColor = "#d8d8d8";
                        }
                        previousOp = targetElement;
                        targetElement.style.backgroundColor = "#727272";
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

        document.getElementById("solution-1").style.backgroundColor = "#d8d8d8";
        document.getElementById("solution-2").style.backgroundColor = "#d8d8d8";
        document.getElementById("solution-3").style.backgroundColor = "#d8d8d8";
        document.getElementById("solution-4").style.backgroundColor = "#d8d8d8";

        document.getElementById("operation-1").style.backgroundColor = "#d8d8d8";
        document.getElementById("operation-2").style.backgroundColor = "#d8d8d8";
        document.getElementById("operation-3").style.backgroundColor = "#d8d8d8";
        document.getElementById("operation-4").style.backgroundColor = "#d8d8d8";

        document.getElementById("solution-1").textContent = solutionNum1;
        document.getElementById("solution-2").textContent = solutionNum2;
        document.getElementById("solution-3").textContent = solutionNum3;
        document.getElementById("solution-4").textContent = solutionNum4;

        document.getElementById("clear-btn").style.display = "none";
        document.getElementById("submit-btn").textContent = "NO SOLUTION";

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

})(numberController, UIController);

controller.init();