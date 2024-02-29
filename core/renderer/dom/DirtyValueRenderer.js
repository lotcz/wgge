import DomRenderer from "./DomRenderer";
import DOMHelper from "../../helper/DOMHelper";

export default class DirtyValueRenderer extends DomRenderer {

	/**
	 * @type DirtyValue
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
		this.container.innerText = this.formatter ? this.formatter(this.model.get()) : String(this.model.get());
	}
}
