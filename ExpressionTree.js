function calculate(n1, n2, operator) {
    if (operator === '+')
        return n1 + n2;
    if (operator === '-')
        return n1 - n2;
    if (operator === '*')
        return n1 * n2;
    if (operator === '/')
        return n1 / n2;
}

function calculateExpression(root) {
    if (root.left === null && root.right === null)
        return parseInt(root.data);

    let n1 = calculateExpression(root.left);
    let n2 = calculateExpression(root.right);

    return calculate(n1, n2, root.data);
}

export default calculateExpression;