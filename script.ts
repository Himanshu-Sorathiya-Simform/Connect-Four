const header = document.querySelector<HTMLHeadingElement>('h1')!;
const playerCircle = document.querySelector<HTMLDivElement>('.player')!;
const gameArea = document.querySelector<HTMLDivElement>('.game-area')!;
const allElements = document.querySelectorAll<HTMLDivElement>('.game-circle');

let initialLeftPosition = +playerCircle.getBoundingClientRect().left;
let initialTopPosition = +playerCircle.getBoundingClientRect().top;
playerCircle.style.left = `0px`;
playerCircle.style.top = `0px`;

function findLastUnmodified(elements: HTMLDivElement[]) {
	for (let i = 0; i < elements.length; i++) {
		if (!elements.at(-i - 1)!.classList.contains('played'))
			return elements.at(-i - 1);
	}

	return false;
}

function insertToCircle(columnNumber: number, user: string) {
	const allColumnElements = [...allElements].filter(
		(ele) => ele.dataset['id'] && +ele.dataset['id'] % 7 === columnNumber,
	);

	const insertToElement = findLastUnmodified(allColumnElements);

	if (!insertToElement && user === 'player2') callComputer();

	if (!insertToElement) return;

	const elementLeftCoordinates = +insertToElement.getBoundingClientRect().left;
	const moveLeft = elementLeftCoordinates - initialLeftPosition;
	playerCircle.style.left = `${moveLeft}px`;

	const elementTopCoordinates = +insertToElement.getBoundingClientRect().top;
	const moveBottom = elementTopCoordinates - initialTopPosition;

	setTimeout(() => {
		playerCircle.style.top = `${moveBottom}px`;
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
		}, 1000);
	}, 150);
}

function callComputer() {
	const columnNumber = Math.trunc(Math.random() * 7);

	insertToCircle(columnNumber, 'player2');
}

gameArea.addEventListener('click', (e) => {
	const circle = <HTMLDivElement>(e.target as HTMLDivElement).closest('.circle');

	if (!circle) return;

	const columnNumber = +(circle.dataset['id'] || 0) % 7;

	insertToCircle(columnNumber, 'player1');

	setTimeout(callComputer, 1500);
});
