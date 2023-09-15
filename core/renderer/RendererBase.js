import ActivatedTreeNode from "../ActivatedTreeNode";

export default class RendererBase extends ActivatedTreeNode {

	/**
	 * @type GameModel
	 */
	game;

	/**
	 * @type ModelBase
	 */
	model;

	/**
	 * @param {GameModel} game
	 * @param {ModelBase} model
	 */
	constructor(game, model) {
		super();
		this.game = game;
		this.model = model;

	}

	render() {
		if (!this.model.isDirty) {
			return;
		}
		if (!this.isActivated) {
			return;
		}
		this.renderInternal();
		this.children.forEach((c) => c.render());
		if (this.isRoot()) {
			this.model.clean();
		}
	}

	/**
	 * Override this
	 */
	renderInternal() {
	}

}
