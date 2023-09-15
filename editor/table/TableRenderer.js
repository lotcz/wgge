import CollectionRenderer from "../../core/renderer/generic/CollectionRenderer";
import TableRowRenderer from "./row/TableRowRenderer";
import NodeFormRenderer from "../form/NodeFormRenderer";
import NullableNodeRenderer from "../../core/renderer/generic/NullableNodeRenderer";
import DomRenderer from "../../core/renderer/dom/DomRenderer";
import DOMHelper from "../../core/helper/DOMHelper";

export default class TableRenderer extends DomRenderer {

	/**
	 * @type ModelNodeTable|ModelNodeCollection
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;
		this.dom = dom;
		this.container = null;

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.selectedNode,
				(m) => new NodeFormRenderer(this.game, m, this.dom, this.model)
			)
		);

		this.addChild(
			new CollectionRenderer(
				this.game,
				this.model,
				(m) => new TableRowRenderer(game, m, this.tbody, this.model)
			)
		);

	}

	activateInternal() {
		this.container = DOMHelper.createElement(this.dom, 'div', 'table bg');

		this.buttons = DOMHelper.createElement(this.container, 'div', 'buttons');
		const buttonsLeft = DOMHelper.createElement(this.buttons, 'div');
		const buttonsRight = DOMHelper.createElement(this.buttons, 'div');

		DOMHelper.createElement(
			buttonsLeft,
			'button',
			null,
			'Add',
			(e) => {
				e.preventDefault();
				this.model.selectedNode.set(this.model.add());
			}
		);

		this.input = DOMHelper.createElement(buttonsLeft, 'input', 'flex-1')
		this.input.setAttribute('type', 'text');
		this.input.addEventListener('input', () => this.updateItems());
		DOMHelper.createElement(buttonsLeft, 'button', null, 'Reset', () => {
			this.input.value = '';
			this.updateItems();
		});

		DOMHelper.createElement(
			buttonsRight,
			'button',
			null,
			'Close',
			(e) => {
				e.preventDefault();
				if (this.game.editor.activeTable.equalsTo(this.model)) {
					this.game.editor.triggerEvent('table-closed');
				}
			}
		);

		this.scrollable = DOMHelper.createElement(this.container, 'div', 'scroll');
		this.table = DOMHelper.createElement(this.scrollable, 'table');

		let dummy = null;

		if (typeof this.model.nodeFactory === 'function') {
			dummy = this.model.nodeFactory();
		} else if (this.model.count() > 0) {
			dummy = this.model.first();
		}

		if (dummy) {
			const thead = DOMHelper.createElement(this.table, 'thead');
			const header = DOMHelper.createElement(thead, 'tr');
			DOMHelper.createElement(header, 'th');
			dummy.properties.forEach((name) => {
				const cell = DOMHelper.createElement(header, 'th');
				cell.innerText = name;
			});
		}

		this.tbody = DOMHelper.createElement(this.table, 'tbody');

		super.activateInternal();
	}

	deactivateInternal() {
		super.deactivateInternal();
		DOMHelper.destroyElement(this.container);
	}

	updateItems() {
		const rows = this.tbody.querySelectorAll('tr');
		const search = this.input.value.toLowerCase();
		rows.forEach((row) => {
			const str = row.innerText.toLowerCase();
			const visible = (search === '') || str.includes(search);
			if (visible) {
				DOMHelper.removeClass(row, 'hidden');
			} else {
				DOMHelper.addClass(row, 'hidden');
			}
		});
	}
}
