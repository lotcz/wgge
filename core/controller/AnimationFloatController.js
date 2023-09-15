import AnimatedValue from "../animating/AnimatedValue";
import {EASING_FLAT} from "../animating/ProgressValue";
import AnimationController from "./AnimationController";

export default class AnimationFloatController extends AnimationController {

	/**
	 * @type FloatValue
	 */
	model;

	/**
	 * @type AnimatedValue
	 */
	animated;

	/**
	 *
	 * @param game GameModel
	 * @param model DirtyValue
	 * @param target Number
	 * @param duration Number
	 * @param easing (float) => float
	 * @param elapsed Number
	 */
	constructor(game, model, target, duration, easing = EASING_FLAT, elapsed = 0) {
		super(game, model);
		this.model = model;
		this.animated = new AnimatedValue(model.get(), target, duration, easing, elapsed);
	}

	updateInternal(delta) {
		this.model.set(this.animated.get(delta));
		if (this.animated.isFinished()) {
			this.finished();
		}
	}

}
