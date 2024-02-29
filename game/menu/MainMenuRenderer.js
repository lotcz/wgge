import DomRenderer from "../../core/renderer/dom/DomRenderer";
import CollectionRenderer from "../../core/renderer/generic/CollectionRenderer";
import MenuItemRenderer from "./item/MenuItemRenderer";
import DOMHelper from "../../core/helper/DOMHelper";

export default class MainMenuRenderer extends DomRenderer {

	/**
	 * @type MenuModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addChild(
			new CollectionRenderer(
				this.game,
				this.model.items,
				(m) => new MenuItemRenderer(this.game, m, this.items)
			)
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'main-menu-layer');
		this.paper = DOMHelper.createElement(this.container, 'div', 'main-menu paper');
		this.inner = DOMHelper.createElement(this.paper, 'div', 'inner p-3');
		this.items = DOMHelper.createElement(this.inner, 'div', 'items m-3');
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}
}
