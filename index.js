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
    var findNum;

    var setupEventListeners = function() {
        document.addEventListener('click', ctrlSelect);
        document.addEventListener('dblclick', e => e.preventDefault());
        document.getElementById("clear-btn").addEventListener('click', clearAll);
    };

    var setupGameElements = function() {
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
                    if(targetElement.textContent == 0) {
                        document.getElementById(targetElement.id).textContent = "";
                    }
                    document.getElementById(previousNumId).textContent = "";
                    previousNum.style.backgroundColor = "#d8d8d8";
                    previousOp.style.backgroundColor = "#d8d8d8";
                    pos = 0;
                } if(targetElement.id.includes("operation")) {
                    operationSelect = targetElement.textContent;
                    previousOp.style.backgroundColor = "#d8d8d8";
                    previousOp = targetElement;
                    targetElement.style.backgroundColor = "#727272";
                    console.log(operationSelect + " is selected.")
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
            setupGameElements();
            document.getElementById("clear-btn").style.display = "none";
            console.log('Game has started.');
        },

        
    }

})(numberController, UIController);

controller.init();