import RendererBase from "../RendererBase";
import DOMHelper from "../../helper/DOMHelper";

export default class DomRenderer extends RendererBase {
	dom;

	constructor(game, model, dom) {
		super(game, model);
		this.dom = dom;

		if (!this.dom) {
			console.error('DOM renderer created without DOM!');
		}
	}

	addClass(css) {
		DOMHelper.addClass(this.dom, css);
	}

	removeClass(css) {
		DOMHelper.removeClass(this.dom, css);
	}

	addElement(tag, css = null) {
		return DOMHelper.createElement(this.dom, tag, css);
	}

	removeElement(el) {
		DOMHelper.destroyElement(el);
	}

}
