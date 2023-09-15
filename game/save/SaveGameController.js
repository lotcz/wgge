import ControllerBase from "../../core/controller/ControllerBase";

export default class SaveGameController extends ControllerBase {

	/**
	 * @type SaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;
	}

	update(delta) {
		if (this.game.menu.isSet()) return;
		super.update(delta);
	}

}
