const allElements = [...document.querySelectorAll('.game-circle')];
function findLastUnmodified(columnNumber) {
    for (let i = 0; i < 7; i++) {
        if (!allElements.at(-i * 7 - (7 - columnNumber)).classList.contains('played'))
            return allElements.at(-i * 7 - (7 - columnNumber));
    }
    return false;
}
function isWin(elementId, user) {
    if (!elementId)
        return;
    const column = +elementId % 7;
    const row = +elementId / 7;
    const horizontalWin = checkHorizontal(+elementId, column, user);
    const verticalWin = checkVertical(+elementId, user);
    const diagonalWin = checkDiagonal(+elementId, row, user);
    const antiDiagonalWin = checkAntiDiagonal(+elementId, row, user);
    return horizontalWin || verticalWin || diagonalWin || antiDiagonalWin;
}
function checkHorizontal(elementId, column, user) {
    let count = 1;
    for (let i = 0; i < Math.min(3, 7 - (7 - column - 1) - 1); i++) {
        const ele = allElements[elementId - i - 1];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    for (let i = 0; i < Math.min(3, 7 - column - 1); i++) {
        const ele = allElements[elementId + i + 1];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    return count >= 4;
}
function checkVertical(elementId, user) {
    let count = 1;
    for (let i = 0; i < 3; i++) {
        const ele = allElements[elementId + 7 * (i + 1)];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    return count >= 4;
}
function checkDiagonal(elementId, row, user) {
    let count = 1;
    for (let i = 0; i < 3; i++) {
        const ele = allElements[elementId - (i + 1) * 8];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID || row - i - 1 !== +eleID / 7)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    for (let i = 0; i < 3; i++) {
        const ele = allElements[elementId + (i + 1) * 8];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID || row + i + 1 !== +eleID / 7)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    return count >= 4;
}
function checkAntiDiagonal(elementId, row, user) {
    let count = 1;
    for (let i = 0; i < 3; i++) {
        const ele = allElements[elementId - (i + 1) * 6];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID || row - i - 1 !== +eleID / 7)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    for (let i = 0; i < 3; i++) {
        const ele = allElements[elementId + (i + 1) * 6];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID || row + i + 1 !== +eleID / 7)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    return count >= 4;
}
export { findLastUnmodified, isWin };
//# sourceMappingURL=helpers.js.map