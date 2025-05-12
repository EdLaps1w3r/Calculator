let calcElementList = [];
let displayingResults = false;
let num1 = 0;
let num2 = 0;
let lastHistoryObj = {};
let currentNum = "";
let deciPointAlreadyExits = false;

function add(num1, num2) {
    return num1 + num2;
};

function sub(num1, num2) {
    return num1 - num2;
};

function mult(num1, num2) {
    return num1 * num2;
};

function div(num1, num2) {
    return num1 / num2;
};


function calcInterface(button) {
    let displayContent = document.getElementById("calcDisplay");
    let displayContentBig = document.getElementById("calcBigDisplay");
    let historyDisplay = document.getElementById("history");
    if (button != "=" && button != "+" && button != "-" && button != "C" && button != "x" && button != "/" && button != "." && button != "AC") {
        if (displayingResults == false) {
            displayContentBig.innerHTML += String(button);
            currentNum += String(button);
        } else {
            displayContentBig.innerHTML = "";
            displayingResults = false;
            calcElementList = [];
            displayContentBig.innerHTML += String(button);
            currentNum += String(button);
        };
    } else if (button == ".") {
        if (displayContentBig.innerHTML.length != 0 && deciPointAlreadyExits == false) {
            if (displayingResults == false) {
                displayContentBig.innerHTML += String(button);
                currentNum += String(button);
                deciPointAlreadyExits = true;
            } else {
                displayContentBig.innerHTML = "";
                displayingResults = false;
                calcElementList = [];
                displayContentBig.innerHTML += String(button);
                currentNum += String(button);
                deciPointAlreadyExits = true;
            };
        };        
    } else if (button == "+" || button == "-") {
        displayingResults = false;
        if (displayContentBig.innerHTML.length != 0) {
            calcElementList.push(currentNum);
            currentNum = "";
            displayContent.innerHTML += " " + displayContentBig.innerHTML + " " + String(button);
            displayContentBig.innerHTML = "";
            calcElementList.push(button);
            deciPointAlreadyExits = false;
        };     
    } else if (button == "x" || button == "/") {
        displayingResults = false;
        if (displayContentBig.innerHTML.length != 0) {
            calcElementList.push(currentNum);
            currentNum = "";
            displayContent.innerHTML += " " + displayContentBig.innerHTML + " " + String(button);
            displayContentBig.innerHTML = "";
            calcElementList.push(button);
            deciPointAlreadyExits = false;
        };
    } else if (button == "C") {
        if (displayContentBig.innerHTML.length != 0) {
            currentNum = "";
            displayContentBig.innerHTML = "";
            deciPointAlreadyExits = false;
        };        
    } else if (button == "AC") {
        currentNum = "";
        calcElementList = [];
        displayContentBig.innerHTML = "";
        displayContent.innerHTML = "";
        deciPointAlreadyExits = false;        
    } else if (isNaN(parseFloat(calcElementList[(calcElementList.length - 1)])) == true) {
        deciPointAlreadyExits = false;
        calcElementList.push(currentNum);
        Total = operate(calcElementList)
        currentNum = "";
        displayContent.innerHTML = "";
        displayContentBig.innerHTML = String(Total);
        displayingResults = true;
        lastHistoryObj = {operation: OperationStringGen(calcElementList), result: String(Total)};
        historyDisplay.innerHTML += "<br />" + lastHistoryObj.operation + " = " + lastHistoryObj.result;
        calcElementList = [];
        calcElementList.push(Total);
    };
};

function operate(calcElementList) {
    let workingCalcElemntList = calcElementList.slice();
    console.log(workingCalcElemntList);
    let currentTotal = 0;
    let priorityCalcs = workingCalcElemntList.filter(checkOperator);
    for (let i = 0; i < priorityCalcs.length; i++) {
        let currentOperation = workingCalcElemntList.findIndex((operator) => operator == priorityCalcs[i]);
        num1 = parseFloat(workingCalcElemntList[(currentOperation - 1)]);
        num2 = parseFloat(workingCalcElemntList[(currentOperation + 1)]);
        if (priorityCalcs[i] == "x") {
            currentTotal = mult(num1, num2);
        } else {
            currentTotal = div(num1, num2);
        };
        let finishedOperations = workingCalcElemntList.splice((currentOperation - 1), (currentOperation));
        console.log(finishedOperations);
        workingCalcElemntList = [...workingCalcElemntList.slice(0, (currentOperation - 1)), String(currentTotal), ...workingCalcElemntList.slice((currentOperation - 1))];
        console.log(workingCalcElemntList);
    };
    for (let i = 0; i < workingCalcElemntList.length; i++) {
        if (isNaN(parseFloat(workingCalcElemntList[i])) == false) {
            num1 = parseFloat(workingCalcElemntList[i]);
        } else if (workingCalcElemntList[i] == "+") {
            num2 = parseFloat(workingCalcElemntList[(i + 1)]);
            currentTotal = add(num1, num2);
            num1 = currentTotal;
            i++;
        } else if (workingCalcElemntList[i] == "-") {
            num2 = parseFloat(workingCalcElemntList[(i + 1)]);
            currentTotal = sub(num1, num2);
            num1 = currentTotal;
            i++;
        };                   
    };
    console.log(calcElementList);
    return currentTotal;
};

function OperationStringGen(operation) {
    let finalString = "";
    for (element of operation) {
        finalString = finalString + " " + String(element);
    };
    return finalString;
};

function checkOperator(calcElement, operator) {
        return calcElement == "x" || calcElement == "/";    
};
