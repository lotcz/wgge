import DomRenderer from "../../../core/renderer/dom/DomRenderer";

export default class SaveGameEditorRenderer extends DomRenderer {

	/**
	 * @type SaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

	}

}
