const operate = function(number1, number2, operator) {
    switch(operator) {
        case '+':
            add(number1, number2);
            break;
        case '-':
            subtract(number1, number2);
            break;
        case '*':
            multiply(number1, number2);
            break;
        case '/':
            divide(number1, number2);
            break;
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