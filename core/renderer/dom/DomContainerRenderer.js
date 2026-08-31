import DomRenderer from "./DomRenderer";
import DOMHelper from "../../helper/DOMHelper";

export default class DomContainerRenderer extends DomRenderer {

	container;

	tag;

	cls;

	constructor(game, model, parent, cls = null, tag = 'div') {
		super(game, model, parent);

		this.container = null;
		this.tag = tag;
		this.cls = cls;
	}

	activateInternal() {
		this.container = super.addElement(this.tag, this.cls);
	}

	deactivateInternal() {
		super.removeElement(this.container);
		this.container = null;
	}

	addElement(tag, css = null) {
		return DOMHelper.createElement(this.container, tag, css);
	}

}
