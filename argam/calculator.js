let stack = [new BigNumber(0)];
let base = 60;
let decimalFlag = false;

function updateBase() {
    base = parseInt(document.getElementById('base').value);
    const precision = Math.floor(20 * (Math.log(10) / Math.log(base)));
    BigNumber.config({ DECIMAL_PLACES: precision });
    createButtons();
}

function getFactorPair(n, target) {
    const x = Math.floor(Math.sqrt(n));
    const factors = [];
    for (let i = 1; i <= x; i++) {
        if (n % i == 0) {
            factors.push(i);
        }
    }

    let minFactor = null;
    let minDistanceToTarget = 1e100;
    for (const i of factors) {
        const newDistance = Math.abs(((n / i) / i) - target);
        if (newDistance < minDistanceToTarget) {
            minDistanceToTarget = newDistance;
            minFactor = i;
        }
    }

    return [minFactor, n / minFactor];
}

function getGridSize(n, target) {
    const EPSILON = 0.2;
    while (true) {
        const factorPair = getFactorPair(n, target);
        const targetDistance = Math.abs(factorPair[1] / factorPair[0] - target);
        if (targetDistance < EPSILON) {
            return factorPair;
        }
        n += 1;
    }
}

function createButtons() {
    const numericalButtons = document.getElementById('numerical-buttons');
    numericalButtons.innerHTML = '';
    const dims = getGridSize(base, 1.6);
    for (let y = 0; y < dims[0]; y++) {
        const row = numericalButtons.insertRow();
        for (let x = 0; x < dims[1]; x++) {
            const val = (dims[0] - 1 - y) * dims[1] + x;
            if (val >= base) {
                continue;
            }
            const button = row.insertCell();
            const inputString = toArgamString(val, base);
            button.className = getCSSClass(val, base) + ' button';
            button.innerHTML = inputString;
            button.onclick = () => inputDigit(inputString);
            row.appendChild(button);
        }
    }
}

function renderStack() {
    const table = document.getElementById('stack');
    table.innerHTML = '';

    const thead = table.createTHead();
    const row = thead.insertRow();
    /*
    for (const i of ["Value","Index"]) {
      let th = document.createElement("th");
      let text = document.createTextNode(i);
      th.appendChild(text);
      row.appendChild(th);
  } */

    for (let i = 0; i < stack.length; i++) {
        index = stack.length - i - 1;
        const row = table.insertRow();
        if (i % 2 == 1) {
            row.style = 'background-color: #303030;';
        }
        const argamcell = row.insertCell();
        argamcell.style = 'font-size: 72; float: right';
        const val = stack[index];
        argamcell.className = getCSSClass(val, base);
        const argamtext = document.createTextNode(toArgamString(val, base));
        argamcell.appendChild(argamtext);

        const indexcell = row.insertCell();
        indexcell.style = 'font-size: 15;';
        const indextext = document.createTextNode(i);
        indexcell.appendChild(indextext);
    }
}

setInterval(renderStack, 10);

window.addEventListener('load', function() {
    updateBase();
});
// BUTTON OPERATIONS BEGIN HERE

function push() {
    stack.push(new BigNumber(0));
}

function drop() {
    if (stack.length == 1) {
        stack[0] = new BigNumber(0);
    } else {
        stack.pop();
    }
}

function swap() {
    if (stack.length != 1) {
        const a = stack.pop();
        const b = stack.pop();
        stack.push(a);
        stack.push(b);
    }
}
function inputDigit(digit) {
    if (digit == '.') {
        decimalFlag = !decimalFlag;
    } else if (digit == '-') {
        stack.push(stack.pop().negated());
    } else {
        let s = stack.pop().toString(base);
        if (decimalFlag) {
            s += '.';
            decimalFlag = false;
        }
        s += digit;
        stack.push(new BigNumber(s, base));
    }
}

function add() {
    const a = stack.pop();
    const b = stack.pop();
    stack.push(a.plus(b));
}

function subtract() {
    const a = stack.pop();
    const b = stack.pop();
    stack.push(b.subtract(a));
}

function multiply() {
    const a = stack.pop();
    const b = stack.pop();
    stack.push(a.times(b));
}

function divide() {
    const a = stack.pop();
    const b = stack.pop();
    stack.push(b.dividedBy(a));
}

function stackClear() {
    stack = [new BigNumber(0)];
}
