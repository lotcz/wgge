import ActivatedTreeNode from "../ActivatedTreeNode";

export default class ControllerBase extends ActivatedTreeNode {

	/**
	 * @type GameModel
	 */
	game;

	/**
	 * @type ObjectModel
	 */
	model;

	/**
	 * @type array[(delta) => any]
	 */
	updateActions;

	/**
	 * @param {GameModel} game
	 * @param {ObjectModel} model
	 */
	constructor(game, model) {
		super();
		this.game = game;
		this.model = model;

		this.updateActions = [];
	}

	update(delta) {
		if (!this.isActivated) {
			return;
		}

		if (this.updateActions.length > 0) {
			for (let i = 0, max = this.updateActions.length; i < max; i++) {
				this.updateActions[i](delta);
			}
			this.updateActions = [];
		}

		this.updateInternal(delta);

		for (let i = 0, max = this.children.length; i < max; i++) {
			const child = this.children[i];
			if (!child.isRemoved) child.update(delta);
		}

		this.updateRemovedChildren();
	}

	updateInternal(delta) {

	}

	/**
	 *
	 * @param action (delta) => any
	 */
	runOnUpdate(action) {
		this.updateActions.push(action);
	}

}
