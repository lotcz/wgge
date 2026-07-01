import DomRenderer from "./DomRenderer";

export default class ImageDomRenderer extends DomRenderer {

	/**
	 * @type DirtyValue
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.container = null;
	}

	activateInternal() {
		this.renderImage();
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

	renderInternal() {
		this.renderImage();
	}

	renderImage() {
		let uri = this.model.get();
		if (typeof uri !== 'string' || uri.length === 0) {
			console.error('Invalid image URI', uri);
			return;
		}
		this.game.assets.loadAsset(
			uri,
			(img) => {
				this.removeElement(this.container);
				this.container = img.cloneNode(true);
				this.addChild(this.container);
			}
		);
	}
}
