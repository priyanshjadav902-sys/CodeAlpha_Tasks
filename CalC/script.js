let currentInput = "";
let operator = "";
let previousInput = "";

const resultField = document.getElementById("result");
const historyField = document.getElementById("history");

// Update display
function updateDisplay() {
  resultField.value = currentInput || "0";
  historyField.innerHTML = previousInput + " " + operator;
}

// Append numbers
function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;

  currentInput += number;
  updateDisplay();
}

// Set operator
function setOperator(op) {
  if (currentInput === "") return;

  if (previousInput !== "") {
    calculateResult();
  }

  operator = op;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

// Calculate result
function calculateResult() {
  if (previousInput === "" || currentInput === "" || operator === "") return;

  let result;
  let prev = parseFloat(previousInput);
  let curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr === 0 ? "Error" : prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = "";
  operator = "";
  updateDisplay();
}

// Clear All
function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay();
}

// Clear Entry (CE)
function clearEntry() {
  currentInput = "";
  updateDisplay();
}

// Percentage
function percentage() {
  if (currentInput === "") return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

// Square Root
function squareRoot() {
  if (currentInput === "") return;
  currentInput = Math.sqrt(parseFloat(currentInput)).toString();
  updateDisplay();
}

// Keyboard Support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    appendNumber(e.key);
  }

  if (e.key === ".") {
    appendNumber(".");
  }

  if (e.key === "+") setOperator("+");
  if (e.key === "-") setOperator("-");
  if (e.key === "*") setOperator("*");
  if (e.key === "/") setOperator("/");

  if (e.key === "Enter") calculateResult();

  if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }

  if (e.key === "Escape") clearAll();
});

// First load
updateDisplay();
