import GameRenderer from "../../game/GameRenderer";
import NullableNodeRenderer from "../../core/renderer/generic/NullableNodeRenderer";
import DemoSaveGameRenderer from "./save/DemoSaveGameRenderer";

export default class DemoGameRenderer extends GameRenderer {

	/**
	 * @type DemoGameModel
	 */
	model;

	constructor(model, dom) {
		super(model, dom);

		this.model = model;

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.saveGame,
				(m) => new DemoSaveGameRenderer(this.game, m, this.saveGameLayer)
			)
		);

	}

}
