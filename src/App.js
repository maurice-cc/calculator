import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [pendingOperation, setPendingOperation] = useState(null);
  const [storedValue, setStoredValue] = useState([null]);
  const [isOperationOn, setIsOperationOn] = useState(false);

  function onDigitClick(digit) {
    if (displayValue === '0') {
      setDisplayValue('');
      setDisplayValue(displayValue => displayValue + String(digit));
    } else if (isOperationOn) {
      setDisplayValue('');
      setDisplayValue(displayValue => displayValue + String(digit));
      setIsOperationOn(false);
    } else {
      setDisplayValue(displayValue => displayValue + String(digit));
    }
  }

  function onOperatorClick(operator) {
    if (storedValue === null) {
      setStoredValue(parseFloat(displayValue));
    } else if (pendingOperation && operator === '=') {
      const newValue = performOperation(storedValue, parseFloat(displayValue), pendingOperation);
      setDisplayValue(String(newValue));
      setStoredValue(newValue);
    } if (operator == '+/-' || operator == '%') {
      const newValue = performOperation(0, parseFloat(displayValue), operator);
      setDisplayValue(String(newValue));
      setStoredValue(newValue);
    }
    setIsOperationOn(true);
    setPendingOperation(operator);
  }

  function performOperation(a, b, operation) {
    switch (operation) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      case '+/-': return -b;
      case '%': return 0.01 * b;
      default: return b;
    }
  }

  function onClearClick() {
    setDisplayValue('0');
    setPendingOperation(null);
    setStoredValue(null);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="button-grid">
          <button onClick={onClearClick}>C</button>
          <button onClick={() => onOperatorClick('+/-')}>+/-</button>
          <button onClick={() => onOperatorClick('%')}>%</button>
          <button onClick={() => onOperatorClick('÷')}>÷</button>
          <button onClick={() => onDigitClick(7)}>7</button>
          <button onClick={() => onDigitClick(8)}>8</button>
          <button onClick={() => onDigitClick(9)}>9</button>
          <button onClick={() => onOperatorClick('×')}>×</button>
          <button onClick={() => onDigitClick(4)}>4</button>
          <button onClick={() => onDigitClick(5)}>5</button>
          <button onClick={() => onDigitClick(6)}>6</button>
          <button onClick={() => onOperatorClick('-')}>-</button> 
          <button onClick={() => onDigitClick(1)}>1</button>
          <button onClick={() => onDigitClick(2)}>2</button>
          <button onClick={() => onDigitClick(3)}>3</button>
          <button onClick={() => onOperatorClick('+')}>+</button>
          <button onClick={() => onDigitClick(0)} className="zero">0</button>
          <button onClick={() => onDigitClick('.')}>.</button>
          <button onClick={() => onOperatorClick('=')} className="equals">=</button>       
        </div>
      </div>
    </div>
  );
}

export default App;
