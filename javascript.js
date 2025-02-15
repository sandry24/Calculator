const buttons = document.querySelectorAll(".flex-cell");
const nrButtons = document.querySelectorAll(".number");
const opButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const dotButton = document.querySelector(".dot");
const mainDisplay = document.querySelector("#main-display");
const secondaryDisplay = document.querySelector("#secondary-display");

let number1 = '';
let number2 = '';
let operator = '';

const eval = function(number1, number2, operator) {
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return subtract(number1, number2);
        case '*':
            return multiply(number1, number2);
        case '/':
            return divide(number1, number2);
    }
}

const operate = function (number1, number2, operator) {
    if (operator === '')
        return number1;

    if (number1 === '')
        number1 = '0';

    if (number2 === '')
        number2 = number1;

    let result = eval(number1, number2, operator);
    if (result === 0)
        return '';
    return String(result);
}

const add = function(number1, number2) {
    return number1 + number2;
}

const subtract = function(number1, number2) {
    return number1 - number2;
}

const multiply = function(number1, number2) {
    return number1 * number2;
}

const divide = function(number1, number2) {
    if (number1 === 0 && number2 === 0) {
        alert("Undefined");
        return 0;
    }
    return number1 / number2;
}

const addToDisplay = function (element) {
    mainDisplay.textContent += element.textContent;
}

const updateSecondaryDisplay = function () {
    if (operator === '') {
        secondaryDisplay.textContent = '';
        return;
    }
    
    let text = convertNumber(operate(number1, number2, operator));
    text = text.substring(0, 21);
    secondaryDisplay.textContent = text;
}

const convertNumber = function (number) {
    if (number === '')
        return '0';
    return number;
}

const clearDisplay = function () {
    mainDisplay.textContent = '';
    secondaryDisplay.textContent = '';
    number1 = '';
    number2 = '';
    operator = '';
    enableOpButtons();
}

const updateDisplay = function () {
    let text = convertNumber(number1) + operator + number2;
    text = text.substring(0, 21);
    mainDisplay.textContent = text;
}

const deleteDisplay = function () {
    if (mainDisplay.textContent.at(-1) === operator) {
        operator = '';
        enableOpButtons();
    } else {
        if (operator === '')
            number1 = number1.slice(0, -1);
        else 
            number2 = number2.slice(0, -1);
    }
    mainDisplay.textContent = mainDisplay.textContent.slice(0, -1);
}

const disableOpButtons = function () {
    opButtons.forEach((button) => {
        button.classList.add("disabled");
    });
}

const enableOpButtons = function () {
    opButtons.forEach((button) => {
        button.classList.remove("disabled");
    });
    removeSelectedClass();
}

const disableDotButton = function () {
    dotButton.classList.add("disabled");
}

const enableDotButton = function () {
    dotButton.classList.remove("disabled");
}

const addSelectedClass = function (button) {
    button.classList.add("selected");
}

const removeSelectedClass = function () {
    opButtons.forEach((button) => {
        button.classList.remove("selected");
    });
}

const currentNumberHasDot = function () {
    if (operator === '') 
        return number1.includes('.');
    return number2.includes('.');
}

const handleNumber = function (button) {
    if (operator === '') 
        number1 += button.textContent;
    else
        number2 += button.textContent;
}

const handleOperator = function (button) {
    operator = button.textContent;
}

const handleEqual = function () {
    let result = operate(number1, number2, operator);
    clearDisplay();
    number1 = result;
    if (number1 === "NaN")
        number1 = '';
    mainDisplay.textContent = convertNumber(number1);
    enableOpButtons();
}

nrButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleNumber(button);
    });
});

opButtons.forEach((button) => {
    button.addEventListener("click", () => {
        disableOpButtons();
        handleOperator(button);
        addSelectedClass(button);
    });
});

clearButton.addEventListener("click", () => {
    clearDisplay();
}); 

deleteButton.addEventListener("click", () => {
    deleteDisplay();
});

equalButton.addEventListener("click", () => {
    handleEqual();
});

document.addEventListener("click", () => {
    updateSecondaryDisplay();
    updateDisplay();
    currentNumberHasDot() ? disableDotButton() : enableDotButton();
});