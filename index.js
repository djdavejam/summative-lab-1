const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let history = [];

function addToHistory(num1, num2, operator, result) {
  history.push({ num1, num2, operator, result });
}

function displayHistory() {
  if (history.length === 0) {
    console.log('No stored calculations.');
  } else {
    console.log('Calculation History:');
    history.forEach((calc, index) => {
      console.log(`${index + 1}. ${calc.num1} ${calc.operator} ${calc.num2} = ${calc.result}`);
    });
  }
}

function add(num1, num2) {
  const result = num1 + num2;
  addToHistory(num1, num2, '+', result);
  return result;
}

function subtract(num1, num2) {
  const result = num1 - num2;
  addToHistory(num1, num2, '-', result);
  return result;
}

function multiply(num1, num2) {
  const result = num1 * num2;
  addToHistory(num1, num2, '*', result);
  return result;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return 'Error: Division by zero';
  }
  const result = num1 / num2;
  addToHistory(num1, num2, '/', result);
  return result;
}

function performCalculation(num1, operator, num2) {
  let result;
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default:
      return 'Error: Invalid operator';
  }
  return result;
}

function showMenu() {
  console.log('\nCalculator Menu:');
  console.log('1. Perform calculation');
  console.log('2. View history');
  console.log('3. Exit');
  rl.question('Choose an option: ', (option) => {
    if (option === '1') {
      rl.question('Enter first number: ', (num1Str) => {
        const num1 = parseFloat(num1Str);
        if (isNaN(num1)) {
          console.log('Invalid number.');
          showMenu();
          return;
        }
        rl.question('Enter operator (+, -, *, /): ', (operator) => {
          rl.question('Enter second number: ', (num2Str) => {
            const num2 = parseFloat(num2Str);
            if (isNaN(num2)) {
              console.log('Invalid number.');
              showMenu();
              return;
            }
            const result = performCalculation(num1, operator, num2);
            if (typeof result === 'string') {
              console.log(result);
            } else {
              console.log(`${num1} ${operator} ${num2} = ${result}`);
            }
            showMenu();
          });
        });
      });
    } else if (option === '2') {
      displayHistory();
      showMenu();
    } else if (option === '3') {
      console.log('Exiting calculator.');
      rl.close();
    } else {
      console.log('Invalid option.');
      showMenu();
    }
  });
}

console.log('Welcome to the JavaScript Calculator!');
showMenu();

rl.on('close', () => {
  process.exit(0);
});