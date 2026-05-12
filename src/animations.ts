const animationBounceInDownKeyFrames = [
	{
		opacity: '0',
		transform: 'translate3d(0, -3000px, 0)',
		offset: 0,
	},
	{
		opacity: '1',
		transform: 'translate3d(0, 25px, 0)',
		offset: 0.65,
	},
	{
		transform: 'translate3d(0, -10px, 0)',
		offset: 0.75,
	},
	{
		transform: 'translate3d(0, 5px, 0)',
		offset: 0.9,
	},
	{
		transform: 'translate3d(0, 0, 0)',
		offset: 1,
	},
];

const animationBounceInDownTimings = {
	duration: 2000,
	iterations: 1,
	easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
};

const animationWobbleKeyFrames = [
	{
		transform: 'translate3d(0, 0, 0)',
		offset: 0,
	},
	{
		transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
		offset: 0.15,
	},
	{
		transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
		offset: 0.3,
	},
	{
		transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
		offset: 0.45,
	},
	{
		transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
		offset: 0.6,
	},
	{
		transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
		offset: 0.75,
	},
	{
		transform: 'translate3d(0, 0, 0)',
		offset: 1,
	},
];

const animationWobbleTimings = {
	duration: 1000,
	iterations: 1,
	easing: 'ease-in-out',
};

const animationFadeInKeyFrames = [
	{
		opacity: '0',
		offset: 0,
	},
	{
		opacity: '1',
		offset: 1,
	},
];

const animationFadeInTimings = {
	duration: 1000,
	iterations: 1,
	easing: 'ease-in',
};

const animationRotateOutKeyFrames = [
	{
		opacity: '1',
		transform: 'rotate3d(0, 0, 1, 0deg)',
		offset: 0,
	},
	{
		opacity: '0',
		transform: 'rotate3d(0, 0, 1, 250deg)',
		offset: 1,
	},
];

const animationRotateOutTimings = {
	duration: 1000,
	iterations: 1,
	easing: 'ease-in',
};

const animationShakeXPart1KeyFrames = [
	{ transform: 'translate3d(0, 0, 0)', offset: 0 },
	{ transform: 'translate3d(-10px, 0, 0)', offset: 0.2 },
	{ transform: 'translate3d(10px, 0, 0)', offset: 0.4 },
	{ transform: 'translate3d(-10px, 0, 0)', offset: 0.6 },
	{ transform: 'translate3d(10px, 0, 0)', offset: 0.8 },
	{ transform: 'translate3d(-10px, 0, 0)', offset: 1 },
];

const animationShakeXPart1Timings = {
	duration: 500,
	iterations: 1,
	easing: 'ease-in',
};

const animationShakeXPart2KeyFrames = [
	{ transform: 'translate3d(-10px, 0, 0)', offset: 0 }, // Starts where Part 1 ended
	{ transform: 'translate3d(10px, 0, 0)', offset: 0.2 },
	{ transform: 'translate3d(-10px, 0, 0)', offset: 0.4 },
	{ transform: 'translate3d(10px, 0, 0)', offset: 0.6 },
	{ transform: 'translate3d(-10px, 0, 0)', offset: 0.8 },
	{ transform: 'translate3d(0, 0, 0)', offset: 1 },
];

const animationShakeXPart2Timings = {
	duration: 500,
	iterations: 1,
	easing: 'ease-out',
};

const animationFallingKeyFrames = [
	{
		transform: 'translateY(0)',
		offset: 0,
	},
	{
		transform: 'translateY(500px)',
		offset: 1,
	},
];

const animationFallingTimings = {
	duration: 1000,
	iterations: 1,
	easing: 'ease-in',
};

const animationBounceInDown = {
	keyframes: animationBounceInDownKeyFrames,
	options: animationBounceInDownTimings,
};

const animationWobble = {
	keyframes: animationWobbleKeyFrames,
	options: animationWobbleTimings,
};

const animationFadeIn = {
	keyframes: animationFadeInKeyFrames,
	options: animationFadeInTimings,
};

const animationRotateOut = {
	keyframes: animationRotateOutKeyFrames,
	options: animationRotateOutTimings,
};

const animationShakeXPart1 = {
	keyframes: animationShakeXPart1KeyFrames,
	options: animationShakeXPart1Timings,
};

const animationShakeXPart2 = {
	keyframes: animationShakeXPart2KeyFrames,
	options: animationShakeXPart2Timings,
};

const animationFalling = {
	keyframes: animationFallingKeyFrames,
	options: animationFallingTimings,
};

export {
	animationBounceInDown,
	animationFadeIn,
	animationFalling,
	animationRotateOut,
	animationShakeXPart1,
	animationShakeXPart2,
	animationWobble
};
