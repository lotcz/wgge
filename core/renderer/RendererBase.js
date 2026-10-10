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

		for (let i = 0, max = this.children.length; i < max; i++) {
			const child = this.children[i];
			if (!child.isRemoved) child.render();
		}

		this.updateRemovedChildren();

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
