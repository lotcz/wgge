import DomRenderer from "../../core/renderer/dom/DomRenderer";
import CollectionRenderer from "../../core/renderer/generic/CollectionRenderer";
import MenuItemRenderer from "./item/MenuItemRenderer";

export default class MenuRenderer extends DomRenderer {

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
				(m) => new MenuItemRenderer(this.game, m, this.container)
			)
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'menu');

	}

	deactivateInternal() {
		this.removeElement(this.container);
	}
}
