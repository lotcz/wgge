import ControllerBase from "../core/controller/ControllerBase";
import ControlsController from "./controls/ControlsController";

export default class GameController extends ControllerBase {

	/**
	 * @type GameModel
	 */
	model;

	constructor(model) {
		super(model, model);

		this.model = model;

		this.addChild(new ControlsController(this.game, this.model.controls));

		this.addAutoEvent(
			this.model,
			'resize',
			() => {
				this.runOnUpdate(() => this.model.viewBoxSize.set(window.innerWidth, window.innerHeight));
			},
			true
		);

		this.addAutoEvent(
			this.model.controls,
			'debug-key',
			() => {
				this.model.isInDebugMode.invert();
			}
		);

	}

	hideMenu() {
		this.model.menu.set(null);
	}

}
