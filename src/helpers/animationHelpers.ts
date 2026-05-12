function addAnimation(ele: HTMLElement, animation: any, callback?: Function) {
	const animationObj = ele.animate(animation.keyframes, animation.options);

	callback?.();

	return animationObj;
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
