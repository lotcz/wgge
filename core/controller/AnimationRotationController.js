import AnimationController from "./AnimationController";
import {EASING_FLAT} from "../animation/ProgressValue";
import AnimatedRotation from "../animation/AnimatedRotation";

export default class AnimationRotationVector2Controller extends AnimationController {

	/**
	 * @type Vector2
	 */
	model;

	/**
	 * @type AnimatedRotation
	 */
	animated;

	/**
	 *
	 * @param game GameModel
	 * @param model Rotation
	 * @param target Rotation
	 * @param duration Number
	 * @param easing (float) => float
	 * @param elapsed Number
	 */
	constructor(game, model, target, duration, easing = EASING_FLAT, elapsed = 0) {
		super(game, model);
		this.model = model;
		this.animated = new AnimatedRotation(model.get(), target.get(), duration, easing, elapsed);
	}

	updateInternal(delta) {
		this.model.set(this.animated.get(delta));
		if (this.animated.isFinished()) {
			this.finished();
		}
	}

}
