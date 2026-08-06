import DomRenderer from "./DomRenderer";

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
		this.container = this.addElement(this.tag, this.cls);
	}

	deactivateInternal() {
		this.removeElement(this.container);
		this.container = null;
	}

}
