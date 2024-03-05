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
	animatedX;

	/**
	 * @type AnimatedRotation
	 */
	animatedY;

	/**
	 *
	 * @param game GameModel
	 * @param model Vector2
	 * @param target Vector2
	 * @param duration Number
	 * @param easing (float) => float
	 * @param elapsed Number
	 */
	constructor(game, model, target, duration, easing = EASING_FLAT, elapsed = 0) {
		super(game, model);
		this.model = model;
		this.animatedX = new AnimatedRotation(model.x, target.x, duration, easing, elapsed);
		this.animatedY = new AnimatedRotation(model.y, target.y, duration, easing, elapsed);
	}

	updateInternal(delta) {
		this.model.set(this.animatedX.get(delta), this.animatedY.get(delta));
		if (this.animatedX.isFinished() && this.animatedY.isFinished()) {
			this.finished();
		}
	}

}
