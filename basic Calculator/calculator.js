// Global variables to store calculator state
let display = document.getElementById('display');
let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

// Function to update the display
function updateDisplay() {
    display.value = currentInput;
}

// Function to append number to display
function appendNumber(number) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    // If current input is '0', replace it; otherwise append
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    
    updateDisplay();
}

// Function to append decimal point
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    // Check if decimal already exists in current input
    if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
        updateDisplay();
    }
}

// Function to handle operator input
function appendOperator(op) {
    const inputValue = parseFloat(currentInput);
    
    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        // If operator already exists, calculate previous operation first
        const result = calculateResult();
        previousInput = result;
        currentInput = String(result);
        updateDisplay();
    }
    
    shouldResetDisplay = true;
    operator = op;
}

// Function to perform calculation
function calculate() {
    if (operator && previousInput !== '') {
        const result = calculateResult();
        currentInput = String(result);
        previousInput = '';
        operator = '';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// Function to calculate result based on operator
function calculateResult() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;
    
    // Use if-else statements to determine which operation to perform
    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '*') {
        result = prev * current;
    } else if (operator === '/') {
        // Check for division by zero
        if (current === 0) {
            alert('Cannot divide by zero!');
            return prev;
        }
        result = prev / current;
    } else {
        return current;
    }
    
    // Round result to avoid floating point precision issues
    return Math.round(result * 100000000) / 100000000;
}

// Function to clear all (C button)
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Function to clear entry (CE button)
function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

// Keyboard event listeners
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Check if key is a number (0-9)
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    // Check for operators
    else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendOperator('/');
    }
    // Check for equals or Enter
    else if (key === '=' || key === 'Enter') {
        calculate();
    }
    // Check for decimal point
    else if (key === '.') {
        appendDecimal();
    }
    // Check for Escape (clear all)
    else if (key === 'Escape') {
        clearDisplay();
    }
    // Check for Backspace (clear entry)
    else if (key === 'Backspace') {
        event.preventDefault();
        clearEntry();
    }
});

// Initialize display
updateDisplay();

// Function to validate and format input (using loop for processing)
function formatNumber(num) {
    // Convert to string and process each character
    let numStr = String(num);
    let formatted = '';
    
    // Loop through characters to format
    for (let i = 0; i < numStr.length; i++) {
        formatted += numStr[i];
        // Add thousand separators (optional enhancement)
        // This is a simple example - you can enhance this further
    }
    
    return formatted;
}

