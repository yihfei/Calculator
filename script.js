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
    if (display.textContent.length == 9) {
        return;
    }

    if (clearOperator()) {
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

    formatSize()
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

    display.textContent = '';
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

function formatSize() {
    if (display.textContent.length > 7) {
        // Get the current font size in vh units
        let currentFontSize = parseFloat(window.getComputedStyle(display).fontSize); // Get computed font size in px
        let currentFontSizeVh = (currentFontSize / window.innerHeight) * 100; // Convert px to vh
    
        // Multiply the current font size in vh by 0.8
        let newFontSizeVh = currentFontSizeVh * 0.86;
    
        // Apply the new font size to the display element
        display.style.fontSize = newFontSizeVh + 'vh';
    }
}

function formatNumber(number) {
    // Check if the input is a valid number
    if (typeof number !== 'number' || isNaN(number)) {
      console.error('Invalid number format:', number);
      return;
    }
    
    // Check if the number is very small and needs scientific notation
    if (Math.abs(number) < 1e-6 && Math.abs(number) !== 0) {
      return number.toExponential(2); // Return in scientific notation with six decimal places in the exponent
    } else {
      return number.toString(); // Return as regular number
    }
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
    display.textContent = formatNumber(Number(display.textContent) / 100);
    
})


numbers.forEach(number => number.addEventListener('click', inputNumber));
operators.forEach(operator => operator.addEventListener('click', inputOperator));