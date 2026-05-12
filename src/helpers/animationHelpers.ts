function addAnimation(ele: HTMLElement, animation: any, callback?: Function) {
	ele.animate(animation.keyframes, animation.options);

	callback?.();
}

function onAnimationEnd(ele: HTMLElement, callback: Function) {
	const animations = ele.getAnimations();

	for (const animation of animations) {
		animation.onfinish = function () {
			callback();
		};
	}
}

export { addAnimation, onAnimationEnd };
