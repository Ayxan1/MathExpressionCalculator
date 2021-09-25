import Node from './Node.js';

function startExpressionTreeGeneration(exp) {
    let initialSplition = trySplit(exp);
    let expressionTree = generateTreeExpression(new Node(), initialSplition.splittedExpressions[0], initialSplition.splittedExpressions[1], initialSplition.operator);

    return expressionTree;
}

function generateTreeExpression(root, exp1, exp2, operator) {
    if (exp2 === undefined)
        return new Node(parseInt(exp1.replace(/\D/g, ""))); // regex to select only numbers

    root.data = operator;

    let splittedExp1 = trySplit(exp1);
    root.left = generateTreeExpression(new Node(), splittedExp1.splittedExpressions[0], splittedExp1.splittedExpressions[1], splittedExp1.operator);

    let splittedExp2 = trySplit(exp2);
    root.right = generateTreeExpression(new Node(), splittedExp2.splittedExpressions[0], splittedExp2.splittedExpressions[1], splittedExp2.operator);

    return root;
}

function clearFromSurrondedParanthesises(exp) {
    if (isSurrondedByParanthesises(exp)) {
        exp = exp.substring(1, exp.length - 1);
    }

    return exp;
}

function splitByLowerPrecedence(exp) {
    let operators = ['+', '-'];

    for (let operator of operators) {
        let splittedExpressions = splitByOperator(exp, operator);
        if (splittedExpressions.length > 1)
            return {
                isSplitted: true,
                operator,
                splittedExpressions
            };
    }

    return {
        isSplitted: false,
        operator: '',
        splittedExpressions: [exp]
    }
}

function splitByHigherPrecedence(exp) {
    let splittedExpressions1 = splitByOperator(exp, '*');
    let splittedExpressions2 = splitByOperator(exp, '/');

    if (splittedExpressions1.length === 1 && splittedExpressions2.length === 1)
        return {
            isSplitted: false,
            operator: '',
            splittedExpressions: [exp]
        }

    if (splittedExpressions1.length === 1)
        return {
            isSplitted: true,
            operator: '/',
            splittedExpressions: splittedExpressions2
        };

    if (splittedExpressions2.length === 1)
        return {
            isSplitted: true,
            operator: '*',
            splittedExpressions: splittedExpressions1
        };

    if (splittedExpressions1[0].length < splittedExpressions2[0].length)
        return {
            isSplitted: true,
            operator: '*',
            splittedExpressions: splittedExpressions1
        };
    else
        return {
            isSplitted: true,
            operator: '/',
            splittedExpressions: splittedExpressions2
        };
}

function trySplit(exp) {
    exp = clearFromSurrondedParanthesises(exp);

    let splitByLowerPrecedenceResult = splitByLowerPrecedence(exp);
    if (splitByLowerPrecedenceResult.isSplitted)
        return splitByLowerPrecedenceResult;

    let splitByHigherPrecedenceResult = splitByHigherPrecedence(exp);
    return splitByHigherPrecedenceResult;
}

function isSurrondedByParanthesises(exp) {
    if (exp[0] !== '(')
        return false;

    let stack = [];

    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(')
            stack.push({
                type: '(',
                index: i
            })

        if (exp[i] === ')') {
            if (i === (exp.length - 1)) {
                let value = stack.pop();
                return value.index === 0;
            } else {
                stack.pop();
            }
        }
    }

    return false;
}

function splitByOperator(exp, operator) {
    let balance = 0;
    let lastIndex = -1;

    for (let i = 0; i < exp.length; i++) {
        if (exp[i] === '(')
            balance += 1;

        if (exp[i] === ')')
            balance -= 1;

        if (balance === 0 && exp[i] === operator) {
            lastIndex = i;
        }
    }

    if (lastIndex === -1)
        return [exp];
    else {
        return [exp.substring(0, lastIndex), exp.substring(lastIndex + 1)];
    }
}

export default startExpressionTreeGeneration;