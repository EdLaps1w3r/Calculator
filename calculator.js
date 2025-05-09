let calcElementList = [];
let displayingResults = false;
let num1 = 0;
let num2 = 0;
let lastHistoryObj = {};
let currentNum = "";

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
    if (button != "=" && button != "+" && button != "-" && button != "C") {
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
    } else if (button == "+" || button == "-") {
        displayingResults = false;
        if (displayContentBig.innerHTML.length != 0) {
            calcElementList.push(currentNum);
            currentNum = "";
            displayContent.innerHTML += " " + displayContentBig.innerHTML + " " + String(button);
            displayContentBig.innerHTML = "";
            calcElementList.push(button);
        };     
    } else if (button == "x" || button == "/") {

    } else if (button == "C") {
        if (displayContentBig.innerHTML.length != 0) {
            currentNum = "";
            displayContentBig.innerHTML = "";
        };        
    } else if (calcElementList[(calcElementList.length - 1)] == "+" || calcElementList[(calcElementList.length - 1)] == "-") {
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
    let currentTotal = 0;
    for (let i =0; i < calcElementList.length; i++) {
        if (isNaN(parseFloat(calcElementList[i])) == false) {
            num1 = parseFloat(calcElementList[i]);
        } else if (calcElementList[i] == "+") {
            num2 = parseFloat(calcElementList[(i + 1)]);
            currentTotal = add(num1, num2);
            num1 = currentTotal;
            i++;
        } else if (calcElementList[i] == "-") {
            num2 = parseFloat(calcElementList[(i + 1)]);
            currentTotal = sub(num1, num2);
            num1 = currentTotal;
            i++;
        };                   
    };
    return currentTotal;
}
function OperationStringGen(operation) {
    let finalString = "";
    for (element of operation) {
        finalString = finalString + " " + String(element);
    };
    return finalString;
}