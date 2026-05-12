import './animations.js';
import {
	animationBounceInDown,
	animationFadeIn,
	animationFalling,
	animationRotateOut,
	animationShakeX,
	animationWobble,
} from './animations.js';
import {
	allElements,
	gameArea,
	gameAreaContainer,
	header,
	playerCircle,
	restartButton,
} from './elements.js';
import { addAnimation, onAnimationEnd } from './helpers/animationHelpers.js';
import { findLastUnmodified, isWin } from './helpers/gameHelpers.js';

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

addAnimation(gameAreaContainer, animationBounceInDown, () => {
	gameAreaContainer.style.pointerEvents = 'none';
});

onAnimationEnd(gameAreaContainer, () => {
	gameAreaContainer.style.pointerEvents = 'all';
});

function handleWin() {
	const youWin = user === 'player1';

	header.textContent = youWin ? 'YOU WON!!' : 'COMPUTER WON';
	header.style.color = youWin ? 'var(--color-one)' : 'var(--color-two)';

	gameArea.style.pointerEvents = 'none';
	clearTimeout(timer1);

	addAnimation(gameArea, animationShakeX, () => {
		const animation = gameArea.getAnimations()[0];

		function checkProgress() {
			const timing = animation?.effect?.getComputedTiming();
			const duration = +(timing?.activeDuration ?? 0);

			if (
				animation &&
				animation.currentTime &&
				+animation.currentTime >= duration / 2
			) {
				allElements.forEach((el) => {
					if (el.classList.contains('played')) {
						el.classList.remove('played');

						const firstElementChild = <HTMLElement>el.firstElementChild!;

						addAnimation(firstElementChild, animationFalling);
					}
				});

				restartGame();

				return;
			}

			requestAnimationFrame(checkProgress);
		}

		requestAnimationFrame(checkProgress);
	});
}

function insertCircle(columnNumber: number) {
	const insertToElement = findLastUnmodified(columnNumber);

	if (!insertToElement && user === 'player2') {
		callComputer();

		return false;
	}

	if (!insertToElement) {
		addAnimation(gameArea, animationWobble, () => {
			gameArea.style.pointerEvents = 'none';
		});

		onAnimationEnd(gameArea, () => {
			gameArea.style.pointerEvents = 'all';
		});

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
			const childElement = document.createElement('span');
			childElement.classList.add('circle', user);

			insertToElement.append(childElement);

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
				return handleWin();
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

	playerCircle.style.top = `0px`;
	playerCircle.style.left = `0px`;
	playerCircle.classList.remove('player1', 'player2');
	playerCircle.classList.add(user);

	addAnimation(header, animationFadeIn);
	addAnimation(playerCircle, animationFadeIn);

	clearTimeout(timer1);
	clearTimeout(timer2);
	clearTimeout(timer3);

	requestAnimationFrame(() => {
		playerCircle.style.transition = 'top 1000ms linear, left 150ms linear';
	});

	onAnimationEnd(gameArea, () => {
		gameArea.style.pointerEvents = 'all';

		allElements.forEach((ele) => {
			ele.classList.remove('played');
			ele.firstElementChild?.classList.remove('player1', 'player2');
			ele.firstElementChild?.remove();
		});
	});
}

gameArea.addEventListener('click', (e) => {
	const circle = <HTMLDivElement>(e.target as HTMLDivElement).closest('.game-circle');

	if (!circle || !circle.dataset['id']) return;

	const columnNumber = +circle.dataset['id'] % 7;

	const isSuccess = insertCircle(columnNumber);

	if (isSuccess) {
		timer1 = setTimeout(callComputer, 1500);
	}
});

restartButton.addEventListener('click', () => {
	addAnimation(gameArea, animationRotateOut, () => {
		gameArea.style.pointerEvents = 'none';
	});

	restartGame();
});

export type { User };
