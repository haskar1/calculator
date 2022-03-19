const clearBtn = document.querySelector('.clearBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const addBtn = document.querySelector('.addBtn');
const subtractBtn = document.querySelector('.subtractBtn');
const multiplyBtn = document.querySelector('.multiplyBtn');
const divideBtn = document.querySelector('.divideBtn');
const operatorBtn = document.querySelectorAll('.operatorBtn');
const equalBtn = document.querySelector('.equalBtn');
const decimalBtn = document.querySelector('.decimalBtn');
const button = document.querySelectorAll('button');

const numberBtn = document.querySelectorAll('.numberBtn');
const zeroBtn = document.querySelector('#zeroBtn');
const oneBtn = document.querySelector('#oneBtn');
const twoBtn = document.querySelector('#twoBtn');
const threeBtn = document.querySelector('#threeBtn');
const fourBtn = document.querySelector('#fourBtn');
const fiveBtn = document.querySelector('#fiveBtn');
const sixBtn = document.querySelector('#sixBtn');
const sevenBtn = document.querySelector('#sevenBtn');
const eightBtn = document.querySelector('#eightBtn');
const nineBtn = document.querySelector('#nineBtn');

let topDisplay = document.querySelector('.topDisplay');
let bottomDisplay = document.querySelector('.bottomDisplay');
let firstNum;
let secondNum;
let operator;

// Allow new number to be entered after an operator is pressed
let secondNumCheck = 0; 


/* After equal is pressed, if an operator is pressed, assign bottomDisplay to firstNum, not secondNum. 
 * Also, prevent deleteBtn from being pressed right after equalBtn. 
 */
let equalPressCheckOne = 0; 


/* When equal is pressed, use bottomDisplay as secondNum. Consecutive presses of equal use the same secondNum until
 * an operator is pressed, then bottomDisplay becomes new firstNum. 
 */
let equalPressCheckTwo = 0; 


// Allow only one decimal to be entered, and display "0." if decimal is pressed before number
let decimalCheck = 0; 


//Switch operators before selecting another number
let operatorCheck = 0;

/* If equal button or operator button is pressed followed by delete button, prevent bottomDisplay from being deleted.
 * However, if equal or operator is pressed, followed by a number and then delete, allow bottomDisplay to be deleted.
 */
let deleteCheck = 0;


function precisionRound(number, decimals) {
    let factor = Math.pow(10, decimals);
    let n = decimals < 0 ? number : 0.01 / factor + number;
    return Math.round( n * factor) / factor;
}

//Needed globally for precisionRound(), but declared in precisionRoundPartTwo()
let z;

function precisionRoundPartTwo() {
    let x;
    let y;
    if (bottomDisplay.textContent.includes(".")) {
        x = bottomDisplay.textContent.indexOf(".");
        y = bottomDisplay.textContent.slice(x + 1);
        z = (y.lastIndexOf(0)) + 2;
        bottomDisplay.textContent = precisionRound(Number(bottomDisplay.textContent), z);
    }
}

function add(firstNum, secondNum) {
    bottomDisplay.textContent = (Number(firstNum) * 100000000000000 + Number(secondNum) * 100000000000000) / 100000000000000;
}

function subtract(firstNum, secondNum) {
    bottomDisplay.textContent = firstNum - secondNum;
    precisionRoundPartTwo();
}

function multiply(firstNum, secondNum) {
    bottomDisplay.textContent = (firstNum * 1000000 * secondNum * 1000000) / 1e+12;
}

function divide(firstNum, secondNum) {
    if (secondNum == 0) {
        bottomDisplay.textContent = "Cannot divide by zero";
        equalBtn.classList.add('disableBtn');
        operatorBtn.forEach(element => element.classList.add('disableBtn'));
    }
    else {
        bottomDisplay.textContent = firstNum / secondNum;
        precisionRoundPartTwo();
    }
}

function operate() {    
    if (operator === '+') add(firstNum, secondNum);
    if (operator === '-') subtract(firstNum, secondNum);
    if (operator === 'x') multiply(firstNum, secondNum);
    if (operator === '÷') divide(firstNum, secondNum);
}

for (let i = 0; i < numberBtn.length; i++) {
    numberBtn[i].addEventListener('click', (e) => {
        button.forEach(element => element.classList.remove('disableBtn'));
        if (bottomDisplay.textContent === "Cannot divide by zero") deleteBtn.click();
        if (bottomDisplay.textContent === '0') bottomDisplay.textContent = '';
        if (firstNum !== undefined && secondNumCheck == 0) {
            bottomDisplay.textContent = '';
            secondNumCheck = 1;
            decimalCheck = 0;
        }
        bottomDisplay.textContent += e.target.textContent;
        operatorCheck = 0;
        deleteCheck = 1;
    });
}

for (let i = 0; i < operatorBtn.length; i++) {
    operatorBtn[i].addEventListener('click', (e) => {
        if (topDisplay.style.visibility === 'hidden') topDisplay.style.visibility = 'visible';
        if (operatorCheck == 1) {
            topDisplay.textContent = `${firstNum} ${e.target.textContent}`;
            operator = e.target.textContent;
            return;
        }
        if (topDisplay.textContent !== '' && equalPressCheckOne == 0) {
            secondNum = bottomDisplay.textContent;
            operate();
        }
        if (bottomDisplay.textContent === "0.") {
            bottomDisplay.textContent = "0";
        } 
        if (bottomDisplay.textContent === "Cannot divide by zero") return;
        topDisplay.textContent = `${bottomDisplay.textContent} ${e.target.textContent}`;
        operator = e.target.textContent;
        firstNum = bottomDisplay.textContent;
        secondNumCheck = 0;
        equalPressCheckOne = 0;
        equalPressCheckTwo = 1;
        decimalCheck = 1;
        operatorCheck = 1;
        deleteCheck = 0;
    });
}

equalBtn.addEventListener('click', () => {
    if (topDisplay.style.visibility === 'hidden') topDisplay.style.visibility = 'visible';
    
    if (topDisplay.textContent.includes('÷ 0')) {
        firstNum = undefined;
        operator = undefined;
    }
    
    if (bottomDisplay.textContent === "0.") {
            bottomDisplay.textContent = "0";
    } 
    
    if (secondNum == undefined || equalPressCheckTwo == 1) {
        secondNum = bottomDisplay.textContent;
    }
    
    //if equal is pressed, followed by a number, then equal again without selecting an operator 
    if (equalPressCheckOne == 1) { 
        firstNum = bottomDisplay.textContent;
    }

    operate();
    
    if (firstNum == undefined || operator == undefined) {
        topDisplay.textContent = `${bottomDisplay.textContent} =`;
    } else topDisplay.textContent = `${firstNum} ${operator} ${secondNum} =`;
    
    secondNumCheck = 0;
    equalPressCheckOne = 1;
    equalPressCheckTwo = 0;
    decimalCheck = 1;
    operatorCheck = 0;
    deleteCheck = 0;

    firstNum = bottomDisplay.textContent;
});

decimalBtn.addEventListener('click', (e) => {
    button.forEach(element => element.classList.remove('disableBtn'));
    if (bottomDisplay.textContent === "Cannot divide by zero") deleteBtn.click();
    if (bottomDisplay.textContent.includes('.') && decimalCheck == 0) return
    if (decimalCheck == 1) {
        bottomDisplay.textContent = '0';
        decimalCheck = 0;
        secondNumCheck = 1;
    }
    bottomDisplay.textContent += e.target.textContent;
    operatorCheck = 0;
});

deleteBtn.addEventListener('click', () => {
    button.forEach(element => element.classList.remove('disableBtn'));
    if (bottomDisplay.textContent === "Cannot divide by zero") {
        bottomDisplay.textContent = '0';
    }
    if ((equalPressCheckOne == 1 && deleteCheck == 0) || (operatorCheck == 1 && deleteCheck == 0) || bottomDisplay.textContent === "Cannot divide by zero") {
        topDisplay.style.visibility = 'hidden';
        return;
    }
    if (bottomDisplay.textContent.length == 1) {
        bottomDisplay.textContent = '0';
        return;
    }
    let Arr = bottomDisplay.textContent.split("");
    Arr.pop();
    bottomDisplay.textContent = Arr.join("");
});

clearBtn.addEventListener('click', () => {
    bottomDisplay.textContent = '0';
    topDisplay.textContent = '';
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    secondNumCheck = 0;
    equalPressCheckOne = 0;
    equalPressCheckTwo = 0;
    decimalCheck = 0;
    operatorCheck = 0;
    equalBtn.classList.remove('disableBtn');
    operatorBtn.forEach(element => element.classList.remove('disableBtn'));
});
