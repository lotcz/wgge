import DomRenderer from "../../../core/renderer/dom/DomRenderer";
import DirtyValueRenderer from "../../../core/renderer/dom/DirtyValueRenderer";

export default class MenuItemRenderer extends DomRenderer {

	/**
	 * @type MenuItemModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
	}

	activateInternal() {
		this.container = this.addElement('div', 'item');
		this.container.addEventListener(
			'click',
			(e) => {
				e.preventDefault();
				this.model.triggerEvent('click');
			}
		);
		this.addChild(
			new DirtyValueRenderer(
				this.game,
				this.model.text,
				this.container
			)
		);
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
	}

}
