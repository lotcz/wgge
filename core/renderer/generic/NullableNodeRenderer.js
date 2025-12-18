import RendererBase from "../RendererBase";

export default class NullableNodeRenderer extends RendererBase {

	/**
	 * @type NullableNode
	 */
	model;

	constructor(game, model, rendererFactory, defaultRendererFactory = null) {
		super(game, model);
		this.model = model;

		this.rendererFactory = rendererFactory;
		this.defaultRendererFactory = defaultRendererFactory;
		this.renderer = null;

		this.addAutoEvent(
			this.model,
			'change',
			() => this.updateRenderer(),
			true
		);
	}

	render() {
		if (!this.isActivated) {
			return;
		}
		if (this.renderer) {
			this.renderer.render();
		}
	}

	updateRenderer() {
		this.resetChildren();
		this.renderer = null;
		if (this.model.isSet()) {
			this.renderer = this.addChild(this.rendererFactory(this.model.get()));
		} else if (this.defaultRendererFactory) {
			this.renderer = this.addChild(this.defaultRendererFactory());
		}
	}

}
