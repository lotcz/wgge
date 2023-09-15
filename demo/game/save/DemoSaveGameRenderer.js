import SaveGameRenderer from "../../../game/save/SaveGameRenderer";
import SceneRenderer from "./scene/SceneRenderer";

export default class DemoSaveGameRenderer extends SaveGameRenderer {

	/**
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(new SceneRenderer(this.game, this.model, this.dom));
	}

}
