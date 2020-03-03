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

    var setupEventListeners = function() {

        document.addEventListener('click', ctrlSelect)
    };

    var ctrlSelect = function(event) {
        var targetElement = event.target || event.srcElement;

        document.getElementById("clear-btn").style.display = "flex";

        document.getElementById("submit-btn").textContent = "DONE";

        if(targetElement.textContent == "") {
            return;
        }

        switch(pos) {
            case 0:
                if(targetElement.id.includes("solution")) {
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
                    document.getElementById(previousNumId).textContent = null;
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
            console.log('Game has started.');
        },

        
    }

})(numberController, UIController);

controller.init();