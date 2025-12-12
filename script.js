function triger(keyPressed) {
    const display = document.getElementById("data");
    const errorBox = document.getElementById("errorbox");
    
    // Clear error message when user clicks a button
    if (errorBox.style.display !== 'none') {
        errorBox.style.display = 'none';
        errorBox.innerHTML = '';
    }

    if (keyPressed === 'reset') {
        fullClear();
    } 
    else if (typeof keyPressed === 'number') {
        // If it's a number
        printValue(keyPressed);
    } 
    else if (keyPressed === '=') {
        if (display.value === '') {
            errorCall("Enter calculation");
        } else {
            try {
                // Warning: eval is dangerous in real apps, but okay for a simple calculator
                let result = eval(display.value);
                
                // Fix long decimals (e.g. 0.1 + 0.2)
                if(!Number.isInteger(result)){
                    result = result.toFixed(2);
                }
                
                fullClear();
                printValue(result);
            } catch (e) {
                errorCall("Invalid Format");
            }
        }
    } 
    else if (keyPressed === 'del') {
        if (display.value === '') {
            // Do nothing if empty
        } else {
            let AfterSlice = display.value.slice(0, -1);
            fullClear();
            printValue(AfterSlice);
        }
    } 
    else {
        // Handle Operators (+ - * / .)
        let PresentData = display.value;
        const lastChar = PresentData.slice(-1);
        const operators = ['+', '-', '/', '*', '.'];

        // Prevent double operators (e.g., ++ or /+)
        if (operators.includes(lastChar)) {
            // If last char is operator, replace it with new one
            let fixedData = PresentData.slice(0, -1) + keyPressed;
            fullClear();
            printValue(fixedData);
        } else {
            // If empty, prevent starting with * or /
            if(PresentData === '' && (keyPressed === '*' || keyPressed === '/')) {
                errorCall("Start with number");
            } else {
                printValue(keyPressed);
            }
        }
    }
}

function printValue(val) {
    document.getElementById("data").value += val;
}

function fullClear() {
    document.getElementById("data").value = '';
}

function errorCall(err) {
    const errorBox = document.getElementById("errorbox");
    errorBox.innerHTML = err;
    errorBox.style.display = 'block';
    
    // Auto hide error after 2 seconds
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 2000);
}