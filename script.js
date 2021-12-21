const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    calculatorDisplay.textContent =
      calculatorDisplay.textContent == 0
        ? number
        : (calculatorDisplay.textContent += number);
  }
}

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = 0;
}

function addDecimal() {
  if (awaitingNextValue) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent += ".";
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);

  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }

  awaitingNextValue = true;
  operatorValue = operator;
}

const calculate = {
  "÷": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "×": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};
clearBtn.addEventListener("click", resetAll);

inputBtns.forEach((button) => {
  if (button.classList.length === 0) {
    button.addEventListener("click", () => sendNumberValue(button.value));
  } else if (button.classList.contains("operator")) {
    button.addEventListener("click", () => useOperator(button.value));
  } else if (button.classList.contains("decimal")) {
    button.addEventListener("click", addDecimal);
  }
});
