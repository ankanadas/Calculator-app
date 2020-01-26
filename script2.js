class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.current.includes(".") || this.number === ".") return;
    this.current = this.current.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.previous != "") {
      this.compute;
    }
    this.operation = operation;
    //this.previousOperandTextElement.innerText = this.current + operation;
    this.previous = this.current;
    console.log(this.previous);
    //this.currentOperandTextElement.innerText = "";
    this.current = "";
  }

  compute() {
    // if (this.op === "*") {
    //   var result = parseInt(this.previous, 10) * parseInt(this.current, 10);
    // }
    // this.previousOperandTextElement.innerText =
    //   this.previousOperandTextElement.innerText + this.current;
    // this.currentOperandTextElement.innerText = result;
    let computation;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  getDisplay(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplay(this.current);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplay(
        this.previous
      )}${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach(b => {
  b.addEventListener("click", () => {
    calculator.appendNumber(b.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(o => {
  o.addEventListener("click", () => {
    calculator.chooseOperation(o.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
