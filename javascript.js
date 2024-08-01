const buttons = document.querySelectorAll(".flex-cell");
const nrButtons = document.querySelectorAll(".number");
const opButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const mainDisplay = document.querySelector("#main-display");
const secondaryDisplay = document.querySelector("#secondary-display");

let number1 = '';
let number2 = '';
let operator = '';

const operate = function(number1, number2, operator) {
    number1 = parseInt(number1);
    number2 = parseInt(number2);
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
    return number1 / number2;
}

const addToDisplay = function (element) {
    mainDisplay.textContent += element.textContent;
}

const clearDisplay = function () {
    mainDisplay.textContent = '';
    number1 = '';
    number2 = '';
    operator = '';
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

const addSelectedClass = function (button) {
    button.classList.add("selected");
}

const removeSelectedClass = function () {
    opButtons.forEach((button) => {
        button.classList.remove("selected");
    });
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
    if (number1 === '' || operator === '' || number2 === '')
        return;

    let result = operate(number1, number2, operator);
    clearDisplay();
    number1 = result;
    mainDisplay.textContent = number1;
    enableOpButtons();
}

nrButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addToDisplay(button);
        handleNumber(button);
    });
});

opButtons.forEach((button) => {
    button.addEventListener("click", () => {
        disableOpButtons();
        addToDisplay(button);
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

