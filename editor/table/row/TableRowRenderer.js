import DomRenderer from "../../../core/renderer/dom/DomRenderer";
import DOMHelper from "../../../core/helper/DOMHelper";
import NumberHelper from "../../../core/helper/NumberHelper";

export default class TableRowRenderer extends DomRenderer {

	/**
	 * @type ObjectModel
	 */
	model;

	/**
	 * @type ModelNodeTable|ModelNodeCollection
	 */
	table;

	constructor(game, model, dom, collection) {
		super(game, model, dom);

		this.model = model;
		this.collection = collection;

		this.container = null;

		this.addAutoEvent(
			this.collection.selectedNode,
			'change',
			() => {
				if (this.collection.selectedNode.equalsTo(this.model)) {
					DOMHelper.addClass(this.container, 'active');
				} else {
					DOMHelper.removeClass(this.container, 'active');
				}
			},
			true
		);
	}

	activateInternal() {
		this.container = this.addElement('tr');
		this.container.addEventListener('click', () => this.collection.selectedNode.set(this.model));

		this.updateRow();
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

	renderInternal() {
		this.updateRow();
	}

	updateRow() {
		DOMHelper.emptyElement(this.container);

		const grab = DOMHelper.createElement(this.container, 'td');
		const icon = DOMHelper.createElement(grab, 'div', 'grab-icon');
		icon.setAttribute('draggable', "true");
		icon.addEventListener('dragstart', (e) => {
			this.collection.triggerEvent('drag-start', this.model);
		});
		this.container.addEventListener('dragover', (e) => e.preventDefault());
		this.container.addEventListener('drop', (e) => {
			e.preventDefault();
			this.collection.triggerEvent('drag-drop', this.model);
		});

		this.model.properties.forEach((name, value) => {
			const cell = DOMHelper.createElement(this.container, 'td');
			let text = '';
			if (value !== undefined && value !== null) {
				if (typeof value === 'object') {
					if (value.value !== undefined) {
						text = NumberHelper.shorten(value.value);
					} else if (value.x !== undefined && value.y !== undefined) {
						text = '[' + NumberHelper.round(value.x, 2) + ',' + NumberHelper.round(value.y, 2);
						if (value.z !== undefined) {
							text += ',' + NumberHelper.round(value.z, 2);
						}
						if (value.w !== undefined) {
							text += ',' + NumberHelper.round(value.w, 2);
						}
						text += ']';
					} else {
						text = NumberHelper.shorten(value.toString());
					}
				} else {
					text = NumberHelper.shorten(value);
				}
			}
			cell.innerText = text;
		});

	}

}
