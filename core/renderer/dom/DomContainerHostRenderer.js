import DomContainerRenderer from "./DomContainerRenderer";

export default class DomContainerHostRenderer extends DomContainerRenderer {

	rendererFactory;

	constructor(game, model, parent, rendererFactory, cls = null, tag = 'div') {
		super(game, model, parent, cls, tag);

		this.rendererFactory = rendererFactory;
	}

	activateInternal() {
		super.activateInternal();
		this.addChild(this.rendererFactory(this.container));
	}

	deactivateInternal() {
		this.resetChildren();
		super.deactivateInternal();
	}

}
