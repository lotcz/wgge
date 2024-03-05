import AnimationController from "./AnimationController";

export default class AnimationDelayController extends AnimationController {

	/**
	 * @type FloatValue
	 */
	model;

	/**
	 * @type Number
	 */
	duration;

	/**
	 * @type Number
	 */
	remaining;

	/**
	 * @type boolean
	 */
	repeat;

	/**
	 *
	 * @param game GameModel
	 * @param model DirtyValue
	 * @param duration Number
	 * @param repeat boolean
	 */
	constructor(game, model, duration, repeat = false) {
		super(game, model);
		this.model = model;
		this.duration = duration;
		this.remaining = duration;
		this.repeat = repeat;
	}

	updateInternal(delta) {
		this.remaining -= delta;
		if (this.remaining <= 0) {
			this.finished();
		}
	}

	finished() {
		if (this.onFinishedHandler) this.onFinishedHandler();
		if (this.repeat) {
			this.remaining += this.duration;
		} else {
			this.removeMyself();
		}
	}

}
