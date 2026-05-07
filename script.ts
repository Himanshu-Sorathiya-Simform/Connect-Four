import { findLastUnmodified, isWin } from './helpers.js';

const header = document.querySelector<HTMLHeadingElement>('h1')!;
const playerCircle = document.querySelector<HTMLDivElement>('.player')!;
const gameArea = document.querySelector<HTMLDivElement>('.game-area')!;

type User = 'player1' | 'player2';

let initialLeftPosition = +playerCircle.getBoundingClientRect().left;
let initialTopPosition = +playerCircle.getBoundingClientRect().top;
playerCircle.style.left = `0px`;
playerCircle.style.top = `0px`;

let user: User = 'player1';
let count = 0;
let timer: undefined | number = undefined;

function insertCircle(columnNumber: number) {
	count++;
	gameArea.style.pointerEvents = 'none';

	const insertToElement = findLastUnmodified(columnNumber);

	if (!insertToElement && user === 'player2') callComputer();

	if (!insertToElement) return;

	const elementCoordinates = insertToElement.getBoundingClientRect();

	const elementLeftCoordinates = +elementCoordinates.left;
	const newLeftPosition = elementLeftCoordinates - initialLeftPosition;
	playerCircle.style.left = `${newLeftPosition}px`;

	const elementTopCoordinates = +elementCoordinates.top;
	const newTopPosition = elementTopCoordinates - initialTopPosition;

	setTimeout(() => {
		playerCircle.style.top = `${newTopPosition}px`;
		insertToElement.classList.add('played');

		setTimeout(() => {
			insertToElement.classList.add(user);

			header.textContent = user === 'player1' ? 'Computer Move' : 'Your Move';

			playerCircle.style.transition = 'none';
			playerCircle.style.top = `0px`;
			playerCircle.style.left = `0px`;
			playerCircle.classList.toggle('player1');
			playerCircle.classList.toggle('player2');

			requestAnimationFrame(() => {
				playerCircle.style.transition = 'top 1000ms linear, left 150ms linear';
			});

			gameArea.style.pointerEvents = 'all';

			if (count >= 7 && isWin(insertToElement.dataset['id'], user)) {
				header.textContent = user === 'player1' ? 'YOU WON!!' : 'COMPUTER WON';

				gameArea.style.pointerEvents = 'none';
				clearTimeout(timer);
			}

			user = user === 'player1' ? 'player2' : 'player1';
		}, 1000);
	}, 150);
}

function callComputer() {
	const columnNumber = Math.trunc(Math.random() * 7);

	insertCircle(columnNumber);
}

gameArea.addEventListener('click', (e) => {
	const circle = <HTMLDivElement>(e.target as HTMLDivElement).closest('.circle');

	if (!circle || !circle.dataset['id']) return;

	const columnNumber = +circle.dataset['id'] % 7;

	insertCircle(columnNumber);

	timer = setTimeout(callComputer, 1500);
});

export type { User };
