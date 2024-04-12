const themeToggleFirst = document.querySelector('#first');
const themeToggleSecond = document.querySelector('#second');
const themeToggleThird = document.querySelector('#third');



function changeTheme(themeName) {
    const themeStylesheets = document.querySelectorAll('link[data-theme]');
    themeStylesheets.forEach((stylesheet) => {
        stylesheet.remove();
    });


    const linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('href', themeName);
    linkElement.setAttribute('data-theme', 'true');
    document.head.appendChild(linkElement);
}

changeTheme("colortheme1.css");


themeToggleFirst.addEventListener("click", () => {
    changeTheme("colortheme1.css");
});


themeToggleSecond.addEventListener("click", () => {
    changeTheme("colortheme2.css");
});


themeToggleThird.addEventListener("click", () => {
    changeTheme("colortheme3.css");
});


//spent 4 days trying to make it save the theme to localstorage. If I continue ill either have a stroke, or go on a rampage.  
// I do not care enough to continue trying to save it to localstorage or cookies or anything else. It is for my own wellbeing and everyone elses that they just act like its here.

// build calculator
document.addEventListener('DOMContentLoaded', function () {
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const keyButtons = document.querySelectorAll('[data-number]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const deleteButton = document.querySelector('[data-delete]');
    const resetButton = document.querySelector('[data-reset]');
    const equalButton = document.querySelector('[data-equals]');
  
    let currentOperand = '';
    let previousOperand = '';
    let operation = undefined;
  
    function clear() {
      currentOperand = '';
      previousOperand = '';
      operation = undefined;
    }
  
    function deleteLast() {
      currentOperand = currentOperand.toString().slice(0, -1);
    }
  
    function appendNumber(number) {
      if (number === '.' && currentOperand.includes('.')) return;
      currentOperand = currentOperand.toString() + number.toString();
    }
  
    function chooseOperation(selectedOperation) {
      if (currentOperand === '') return;
      if (previousOperand !== '') {
        compute();
      }
      operation = selectedOperation;
      previousOperand = currentOperand;
      currentOperand = '';
    }
  
    function compute() {
      let computation;
      const prev = parseFloat(previousOperand);
      const current = parseFloat(currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case 'x':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      currentOperand = computation;
      operation = undefined;
      previousOperand = '';
    }
  
    function updateDisplay() {
      currentOperandTextElement.innerText = currentOperand;
      if (operation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
      } else {
        previousOperandTextElement.innerText = '';
      }
    }
  
    keyButtons.forEach(button => {
      button.addEventListener('click', () => {
        appendNumber(button.innerText);
        updateDisplay();
      });
    });
  
    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        chooseOperation(button.innerText);
        updateDisplay();
      });
    });
  
    equalButton.addEventListener('click', () => {
      compute();
      updateDisplay();
    });
  
    resetButton.addEventListener('click', () => {
      clear();
      updateDisplay();
    });
  
    deleteButton.addEventListener('click', () => {
      deleteLast();
      updateDisplay();
    });
  });
