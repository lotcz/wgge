import RendererBase from "../RendererBase";

export default class ThreeRenderer extends RendererBase {

	/**
	 * Scene or parent object
	 */
	scene;

	constructor(game, model, scene) {
		super(game, model);

		this.scene = scene;

	}

}
