import DomRenderer from "./DomRenderer";
import DOMHelper from "../../helper/DOMHelper";
import NumberHelper from "../../helper/NumberHelper";

export default class Vector2Renderer extends DomRenderer {

	/**
	 * @type Vector2
	 */
	model;

	constructor(game, model, dom, formatter = null) {
		super(game, model, dom);

		this.model = model;
		this.formatter = formatter;
		this.container = null;
	}

	activateInternal() {
		this.container = DOMHelper.createElement(this.dom, 'span');
		this.updateValue();
	}

	deactivateInternal() {
		this.removeElement(this.container);
		this.container = null;
	}

	renderInternal() {
		this.updateValue();
	}

	updateValue() {
		this.container.innerText = this.formatter ? this.formatter(this.model) : `[${NumberHelper.round(this.model.x, 2)}, ${NumberHelper.round(this.model.y, 2)}]`;
	}
}
