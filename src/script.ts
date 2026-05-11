import { findLastUnmodified, isWin } from './helpers.js';

const header = document.querySelector<HTMLHeadingElement>('h1')!;
const playerCircle = document.querySelector<HTMLDivElement>('.player')!;
const gameAreaContainer = document.querySelector<HTMLDivElement>('.game-area-container')!;
const gameArea = document.querySelector<HTMLDivElement>('.game-area')!;
const restartButton = document.querySelector<HTMLButtonElement>('.restart-button')!;
const allElements = [...document.querySelectorAll<HTMLDivElement>('.game-circle')];

type User = 'player1' | 'player2';

let initialLeftPosition = +playerCircle.getBoundingClientRect().left;
let initialTopPosition = +playerCircle.getBoundingClientRect().top;
playerCircle.style.left = `0px`;
playerCircle.style.top = `0px`;

let user: User = 'player1';
let count = 0;
let timer1: undefined | number = undefined;
let timer2: undefined | number = undefined;
let timer3: undefined | number = undefined;

gameAreaContainer.classList.add('animate__animated', 'animate__bounceInDown');
gameAreaContainer.style.pointerEvents = 'none';

let animations = gameAreaContainer.getAnimations();
for (const animation of animations) {
	animation.onfinish = function () {
		gameAreaContainer.classList.remove('animate__animated', 'animate__bounceInDown');
		gameAreaContainer.style.pointerEvents = 'all';
	};
}

function insertCircle(columnNumber: number) {
	const insertToElement = findLastUnmodified(columnNumber);

	if (!insertToElement && user === 'player2') {
		callComputer();

		return false;
	}

	if (!insertToElement) {
		gameArea.classList.add('animate__animated', 'animate__wobble');
		gameArea.style.pointerEvents = 'none';

		let animations = gameArea.getAnimations();
		for (const animation of animations) {
			animation.onfinish = function () {
				gameArea.classList.remove('animate__animated', 'animate__wobble');
				gameArea.style.pointerEvents = 'all';
			};
		}

		return false;
	}

	count++;

	gameArea.style.pointerEvents = 'none';

	const elementCoordinates = insertToElement.getBoundingClientRect();

	const elementLeftCoordinates = +elementCoordinates.left;
	const newLeftPosition = elementLeftCoordinates - initialLeftPosition;
	playerCircle.style.left = `${newLeftPosition}px`;

	const elementTopCoordinates = +elementCoordinates.top;
	const newTopPosition = elementTopCoordinates - initialTopPosition;

	timer2 = setTimeout(() => {
		playerCircle.style.top = `${newTopPosition}px`;
		insertToElement.classList.add('played');

		timer3 = setTimeout(() => {
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
				const youWin = user === 'player1';

				header.textContent = youWin ? 'YOU WON!!' : 'COMPUTER WON';
				header.style.color = youWin ? 'var(--color-one)' : 'var(--color-two)';

				gameArea.style.pointerEvents = 'none';
				playerCircle.hidden = true;
				clearTimeout(timer1);
			}

			user = user === 'player1' ? 'player2' : 'player1';

			if (count === 41) {
				gameArea.style.pointerEvents = 'none';
				header.textContent = 'No one won!!';
				header.style.color = 'var(--color-white)';
			}
		}, 1000);
	}, 150);

	return true;
}

function callComputer() {
	const columnNumber = Math.trunc(Math.random() * 7);

	insertCircle(columnNumber);
}

function restartGame() {
	count = 0;
	user = 'player1';

	header.textContent = 'Your Move';
	header.style.color = 'var(--color-white)';
	header.classList.add('animate__animated', 'animate__fadeIn');

	playerCircle.classList.add('animate__animated', 'animate__fadeIn');
	playerCircle.hidden = false;
	playerCircle.style.top = `0px`;
	playerCircle.style.left = `0px`;
	playerCircle.classList.remove('player1');
	playerCircle.classList.remove('player2');
	playerCircle.classList.add('player1');

	gameArea.classList.add('animate__animated', 'animate__rotateOut');
	gameArea.style.pointerEvents = 'none';

	clearTimeout(timer1);
	clearTimeout(timer2);
	clearTimeout(timer3);

	requestAnimationFrame(() => {
		playerCircle.style.transition = 'top 1000ms linear, left 150ms linear';
	});

	let animations = gameArea.getAnimations();
	for (const animation of animations) {
		animation.onfinish = function () {
			header.classList.remove('animate__animated', 'animate__fadeIn');
			playerCircle.classList.remove('animate__animated', 'animate__fadeIn');

			gameArea.classList.remove('animate__animated', 'animate__rotateOut');
			gameArea.style.pointerEvents = 'all';

			allElements.forEach((ele) =>
				ele.classList.remove('player1', 'player2', 'played'),
			);
		};
	}
}

gameArea.addEventListener('click', (e) => {
	const circle = <HTMLDivElement>(e.target as HTMLDivElement).closest('.circle');

	if (!circle || !circle.dataset['id']) return;

	const columnNumber = +circle.dataset['id'] % 7;

	const isSuccess = insertCircle(columnNumber);

	if (isSuccess) {
		timer1 = setTimeout(callComputer, 1500);
	}
});

restartButton.addEventListener('click', () => restartGame());

export type { User };
