import React, { useState } from "react";
import "./App.css";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [isValid, setIsValid] = useState(false);
  const [pendingOperation, setPendingOperation] = useState(null);
  const [storedValue, setStoredValue] = useState(0);
  const [isOperationOn, setIsOperationOn] = useState(false);

  console.log(
    displayValue,
    pendingOperation,
    storedValue,
    isOperationOn,
    isValid,
    /^([^.\n]*)(\.[^.\n]*)?$/.test(displayValue)
  );

  const digitCheck = (value) => {
    const pattern = /^([^.\n]*)(\.[^.\n]*)?$/;
    return pattern.test(value);
  };

  const handleDigitClick = (digit) => {
    if (!digitCheck(displayValue + digit)) {
      return;
    }
    if (displayValue === "0") {
      setDisplayValue(digit === "." ? "0" : "");
      setDisplayValue((displayValue) => displayValue + String(digit));
    } else if (isOperationOn) {
      setDisplayValue("");
      setDisplayValue((displayValue) => displayValue + String(digit));
      setIsValid(true);
      setIsOperationOn(false);
    } else {
      setDisplayValue((displayValue) => displayValue + String(digit));
    }
  };

  const handleOperatorClick = (operator) => {
    if (storedValue === 0) {
      setStoredValue(parseFloat(displayValue));
    } else if (pendingOperation && isValid && operator === "=") {
      const newValue = performOperation(
        storedValue,
        parseFloat(displayValue),
        pendingOperation
      );
      setDisplayValue(String(newValue));
      setStoredValue(newValue);
      setIsValid(false);
    }
    if (operator == "+/-" || operator == "%") {
      const newValue = performOperation(0, parseFloat(displayValue), operator);
      setDisplayValue(String(newValue));
      setStoredValue(newValue);
    }
    setIsOperationOn(true);
    setPendingOperation(operator);
  };

  const performOperation = (a, b, operation) => {
    switch (operation) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return a / b;
      case "+/-":
        return -b;
      case "%":
        return 0.01 * b;
      default:
        return b;
    }
  };

  const handleClick = (value) => {
    switch (typeof value) {
      case "number":
        handleDigitClick(value);
        break;
      case "string":
        handleOperatorClick(value);
        break;
      default:
        break;
    }
  };

  const onClearClick = () => {
    setDisplayValue("0");
    setPendingOperation(null);
    setStoredValue(0);
    setIsOperationOn(false);
    setIsValid(false);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="button-grid">
          <button className="method" onClick={onClearClick}>
            AC
          </button>
          <button className="method" onClick={() => handleClick("+/-")}>
            +/-
          </button>
          <button className="method" onClick={() => handleClick("%")}>
            %
          </button>
          <button className="operator" onClick={() => handleClick("÷")}>
            ÷
          </button>
          <button onClick={() => handleClick(7)}>7</button>
          <button onClick={() => handleClick(8)}>8</button>
          <button onClick={() => handleClick(9)}>9</button>
          <button className="operator" onClick={() => handleClick("×")}>
            ×
          </button>
          <button onClick={() => handleClick(4)}>4</button>
          <button onClick={() => handleClick(5)}>5</button>
          <button onClick={() => handleClick(6)}>6</button>
          <button className="operator" onClick={() => handleClick("-")}>
            -
          </button>
          <button onClick={() => handleClick(1)}>1</button>
          <button onClick={() => handleClick(2)}>2</button>
          <button onClick={() => handleClick(3)}>3</button>
          <button className="operator" onClick={() => handleClick("+")}>
            +
          </button>
          <button className="zero" onClick={() => handleClick(0)}>
            0
          </button>
          <button onClick={() => handleDigitClick(".")}>.</button>
          <button className="equals" onClick={() => handleClick("=")}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
