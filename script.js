const clearButton = document.querySelector('.clear');
const negativeButton = document.querySelector('.negative');
const percentageButton = document.querySelector('.percentage');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const signs = document.querySelectorAll('.sign');
const display = document.querySelector('.display');

let evaluate;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



function operate(operator, a) {
    switch(operator) {
        case "+":
            return b => add(a, b);
        case "-":
            return b => subtract(a, b);
        case "X":
            return b => multiply(a, b);
        case "/":
            return b => divide(a, b);
        case "=":
            display.textContent = a;
            enableButtons(signs);
            return ;
        default:
            return "error";
    }
}

function inputNumber(e) {
    if (clearOperator() || evaluate) {
        display.textContent = '';
    }
    
    const input = e.target.textContent;
    const lastChar = display.textContent.charAt(display.textContent.length - 1);

    let isNegative = false;

    if (display.textContent.includes('-')) {
        isNegative = true;
        display.textContent = display.textContent.slice(1);
    }

    if (input == '.' && lastChar != '.') {
        display.textContent += input;
    } else if (input != '.' && display.textContent.includes('.')) {
        display.textContent += input;
    } else if (input != '.') {
        display.textContent = Number(display.textContent) * 10 + Number(input);
    }

    if (isNegative) {
        display.textContent = '-' + display.textContent;
    }

    // enable signs
    enableButtons(signs);

}

function inputOperator(e) {
    clearOperator()
    const operator = (e.target.textContent);
    currentNumber = Number(display.textContent);

    if (evaluate) {
        evaluate = evaluate(currentNumber);
    } else {
        evaluate = currentNumber
    }

    //display.textContent = '';
    e.target.classList.add('selected');
    
    // disable other operators except equals
    disableButtons(signs);

    evaluate = operate(operator, evaluate);


}

function clearOperator() {
    let isEqual = false;
    if (document.querySelector('.equal').classList.contains('selected')) {
        isEqual = true;
    }

    operators.forEach(operator => {
        operator.classList.remove('selected');
    })

    return isEqual;
}

function disableButtons(buttons) {
    buttons.forEach(button => button.disabled = true);
}

function enableButtons(buttons) {
    buttons.forEach(button => button.disabled = false);
}

clearButton.addEventListener('click', () => {
    display.textContent = '0';
});

negativeButton.addEventListener('click', () => {
    if (display.textContent.includes('-')) {
        display.textContent = display.textContent.slice(1);
        console.log('press')
    } else {
        display.textContent = '-' + display.textContent;
    }
    
})

percentageButton.addEventListener('click', () => {
    display.textContent = Number(display.textContent) / 100;
})


numbers.forEach(number => number.addEventListener('click', inputNumber));
operators.forEach(operator => operator.addEventListener('click', inputOperator));