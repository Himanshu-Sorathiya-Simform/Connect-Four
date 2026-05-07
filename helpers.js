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
    const row = Math.floor(+elementId / 7);
    const horizontalWin = checkHorizontal(+elementId, row, column, user);
    const verticalWin = checkVertical(+elementId, row, column, user);
    return horizontalWin || verticalWin;
}
function checkHorizontal(elementId, row, column, user) {
    let count = 1;
    for (let i = 0; i < column; i++) {
        const ele = allElements[elementId - i - 1];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID || Math.floor(+eleID / 7) !== row)
            break;
        if (ele.classList.contains(user)) {
            count++;
        }
        else {
            break;
        }
    }
    for (let i = 0; i < 7 - column; i++) {
        const ele = allElements[elementId + i + 1];
        const eleID = ele?.dataset['id'];
        if (!ele || !eleID || Math.floor(+eleID / 7) !== row)
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
function checkVertical(elementId, row, column, user) {
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
export { findLastUnmodified, isWin };
//# sourceMappingURL=helpers.js.map