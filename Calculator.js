import startExpressionTreeGeneration from './ExpressionTreeGenerator.js';
import calculateExpression from './ExpressionTree.js';

function calculate(exp) {
    let expressionTree = startExpressionTreeGeneration(exp);
    let result = calculateExpression(expressionTree);

    return result;
}

export default calculate;