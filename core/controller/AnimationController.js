import ControllerBase from "./ControllerBase";

export default class AnimationController extends ControllerBase {

	/**
	 * @type () => any|null
	 */
	onFinishedHandler;

	/**
	 *
	 * @param game GameModel
	 * @param model DirtyValue
	 * @param onFinished () => any|null
	 */
	constructor(game, model, onFinished = null) {
		super(game, model);

		this.onFinishedHandler = onFinished;
	}

	/**
	 *
	 * @param func () => any
	 * @returns {AnimationController}
	 */
	onFinished(func) {
		this.onFinishedHandler = func;
		return this;
	}

	finished() {
		this.removeMyself();
		if (this.onFinishedHandler) this.onFinishedHandler();
	}

}
