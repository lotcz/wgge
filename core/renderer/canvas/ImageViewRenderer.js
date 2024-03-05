import DomRenderer from "../dom/DomRenderer";
import DOMHelper from "../../helper/DOMHelper";
import ImageCanvasRenderer from "./ImageCanvasRenderer";

export default class ImageViewRenderer extends DomRenderer {

	/**
	 * @type ImageViewModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.canvas = null;
	}

	activateInternal() {
		this.canvas = DOMHelper.createElement(this.dom, 'canvas', 'image-view-canvas');
		this.addChild(new ImageCanvasRenderer(this.game, this.model, this.canvas));

		this.updateSize();
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.canvas);
		this.canvas = null;
	}

	renderInternal() {
		if (this.model.viewSize.isDirty) {
			this.updateSize();
		}
	}

	updateSize() {
		this.canvas.width = this.model.viewSize.x;
		this.canvas.height = this.model.viewSize.y;
	}
}
