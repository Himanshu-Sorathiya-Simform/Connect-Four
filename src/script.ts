import './animations.js';
import {
	animationBounceInDown,
	animationFadeIn,
	animationFalling,
	animationRotateOut,
	animationShakeXPart1,
	animationShakeXPart2,
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
let computerTimer: undefined | number = undefined;

addAnimation(gameAreaContainer, animationBounceInDown, () => {
	gameAreaContainer.style.pointerEvents = 'none';
});

onAnimationEnd(gameAreaContainer, () => {
	gameAreaContainer.style.pointerEvents = 'all';
});

function handleWin() {
	const youWin = user === 'player1';

	playerCircle.classList.remove('player1', 'player2');
	playerCircle.classList.add(user);

	header.textContent = youWin ? 'YOU WON!!' : 'COMPUTER WON';
	header.style.color = youWin ? 'var(--color-one)' : 'var(--color-two)';

	clearTimeout(computerTimer);

	addAnimation(gameArea, animationShakeXPart1, () => {
		gameArea.style.pointerEvents = 'none';
	});

	onAnimationEnd(gameArea, () => {
		allElements.forEach((el) => {
			if (el.classList.contains('played')) {
				const firstElementChild = <HTMLElement>el.firstElementChild!;

				addAnimation(firstElementChild, animationFalling);
			}
		});

		addAnimation(gameArea, animationShakeXPart2);

		restartGame();
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

	const rowNumber = Math.floor(+(insertToElement.dataset['id'] ?? 0) / 7);
	const elementCoordinates = insertToElement.getBoundingClientRect();

	const elementLeftCoordinates = +elementCoordinates.left;
	const newLeftPosition = elementLeftCoordinates - initialLeftPosition;

	const elementTopCoordinates = +elementCoordinates.top;
	const newTopPosition = elementTopCoordinates - initialTopPosition;

	const animationHorizontalKeyframes = [
		{ transform: `translate(0px, 0px)` },
		{ transform: `translate(${newLeftPosition}px, 0px)` },
	];
	const animationHorizontalTimings = {
		duration: 100 * Math.abs(3 - columnNumber) || 1,
		iteration: 1,
		easing: 'linear',
	};
	const animationHorizontal = {
		keyframes: animationHorizontalKeyframes,
		options: animationHorizontalTimings,
	};

	const animationVerticalKeyframes = [
		{ transform: `translate(${newLeftPosition}px, 0px)` },
		{ transform: `translate(${newLeftPosition}px, ${newTopPosition}px)` },
	];
	const animationVerticalTimings = {
		duration: 200 * (rowNumber + 1),
		iteration: 1,
		easing: 'linear',
	};
	const animationVertical = {
		keyframes: animationVerticalKeyframes,
		options: animationVerticalTimings,
	};

	addAnimation(playerCircle, animationHorizontal, () => {
		insertToElement.classList.add('played');
	});

	onAnimationEnd(playerCircle, () => {
		const animation = addAnimation(playerCircle, animationVertical);

		animation.onfinish = () => {
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
		};
	});

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

	clearTimeout(computerTimer);

	requestAnimationFrame(() => {
		playerCircle.style.transition = 'top 1000ms linear, left 150ms linear';
	});

	onAnimationEnd(gameArea, () => {
		gameArea.style.pointerEvents = 'all';

		allElements.forEach((ele) => {
			ele.classList.remove('played');
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
		computerTimer = setTimeout(callComputer, 2000);
	}
});

restartButton.addEventListener('click', () => {
	addAnimation(gameArea, animationRotateOut, () => {
		gameArea.style.pointerEvents = 'none';
	});

	restartGame();
});

export type { User };
