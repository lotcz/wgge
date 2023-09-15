import ControllerBase from "./ControllerBase";

export default class TimeoutController extends ControllerBase {

	/**
	 *
	 * @param {DemoGameModel} game
	 * @param {Number} duration
	 * @param {function} onFinished
	 */
	constructor(game, duration, onFinished) {
		super(game, null);
		this.duration = duration;
		this.timeout = duration;
		this.onFinished = onFinished;
	}

	updateInternal(delta) {
		this.timeout -= delta;
		if (this.timeout <= 0) {
			this.removeMyself();
			this.onFinished();
		}
	}

}
