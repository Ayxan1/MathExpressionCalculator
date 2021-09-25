import calculate from './Calculator.js';

let exp = '30/3+(10/2/5-1)';
let result = calculate(exp);
console.log(`${exp} = ${result}`);