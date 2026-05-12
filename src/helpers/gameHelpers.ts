import { allElements } from '../elements.js';
import type { User } from '../script.js';

function findLastUnmodified(columnNumber: number) {
	for (let i = 6; i >= 0; i--) {
		const ele = allElements[i * 7 - (7 - columnNumber)];

		if (ele && !ele.classList.contains('played')) return ele;
	}

	return false;
}

function isWin(elementId: string | undefined, user: User) {
	if (!elementId) return;

	const horizontalWin =
		1 +
		checkInDirection(+elementId, 0, 1, user) +
		checkInDirection(+elementId, 0, -1, user);
	const verticalWin = 1 + checkInDirection(+elementId, 1, 0, user);
	const diagonalWin =
		1 +
		checkInDirection(+elementId, 1, 1, user) +
		checkInDirection(+elementId, -1, -1, user);
	const antiDiagonalWin =
		1 +
		checkInDirection(+elementId, 1, -1, user) +
		checkInDirection(+elementId, -1, 1, user);

	return (
		horizontalWin === 4 ||
		verticalWin === 4 ||
		diagonalWin === 4 ||
		antiDiagonalWin === 4
	);
}

function checkInDirection(
	elementId: number,
	rowStep: number,
	colStep: number,
	user: User,
) {
	let matchCount = 0;
	const startRow = Math.floor(elementId / 7);
	const startCol = elementId % 7;

	for (let i = 1; i <= 3; i++) {
		const targetRow = rowStep * i + startRow;
		const targetCol = colStep * i + startCol;

		if (targetRow < 0 || targetCol > 6 || targetCol < 0 || targetCol > 6) break;

		const targetElePosition = targetRow * 7 + targetCol;

		const targetEle = allElements.at(targetElePosition)?.firstElementChild;

		if (!targetEle) break;

		if (targetEle.classList.contains(user)) {
			matchCount++;
		} else {
			break;
		}
	}

	return matchCount;
}

export { findLastUnmodified, isWin };
