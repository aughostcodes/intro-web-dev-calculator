// function addNumbersToFormula() {
//     let equation = '';

//     // CREATE AN ARRAY OF ALL THE ELEMENTS WITH CLASS KEY
//     const keys = document.querySelectorAll('.key');

//     // FOR EACH INDEX IN KEYS ARRAY, ADD AN EVENT LISTENER
//     keys.forEach(function (key) {
//         key.addEventListener('click', function () {
//             if (key.className.includes('num')) {
//                 console.log('You clicked a number');
//                 equation += Number(key.innerHTML);
//                 console.log(equation);
//             }
//             console.log(`You clicked on the ${key.innerHTML} key!`)
//         });
//     })
//     console.log(keys);
// }

// // RUN THE FUNCTIONS ON LOAD
// addNumbersToFormula();

let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
const screen = document.querySelector('.output-pane');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = '' + runningTotal;
            runningTotal = 0;
            break;
        case '⬅':
            if (buffer === buffer.length) {
                buffer = 0;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function rerender() {
    screen.innerText = buffer;

}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = value;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '/') {
        runningTotal /= intBuffer;
    } else {
        runningTotal *= intBuffer;
    }
}

document
    .querySelector('.calc-container')
    .addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })