const header = document.querySelector<HTMLHeadingElement>('h1')!;
const playerCircle = document.querySelector<HTMLDivElement>('.player')!;
const gameAreaContainer = document.querySelector<HTMLDivElement>('.game-area-container')!;
const gameArea = document.querySelector<HTMLDivElement>('.game-area')!;
const restartButton = document.querySelector<HTMLButtonElement>('.restart-button')!;
const allElements = [...document.querySelectorAll<HTMLDivElement>('.game-circle')];

export { allElements, gameArea, gameAreaContainer, header, playerCircle, restartButton };
