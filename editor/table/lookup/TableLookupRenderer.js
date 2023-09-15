import DomRenderer from "../../../core/renderer/dom/DomRenderer";
import DOMHelper from "../../../core/helper/DOMHelper";

const FIELD_TABLE_MAPPINGS = {
	modelId: 'models3d',
	materialId: 'materials',
	spriteId: 'sprites'
}

const RENDER_FIELDS = ['id', 'name'];

export default class TableLookupRenderer extends DomRenderer {

	/**
	 * @type IntValue
	 */
	model;

	constructor(game, model, dom, fieldName) {
		super(game, model, dom);

		this.model = model;
		this.lookupTable = this.getTableByField(fieldName);
		if (!this.lookupTable) {
			console.error('Not found lookup table for field', fieldName);
		}
		this.container = null;
	}

	activateInternal() {
		this.container = this.addElement('div', 'table-lookup force-foreground p-2');
		this.container.addEventListener('wheel', (e) => e.stopPropagation());

		this.buttons = DOMHelper.createElement(this.container, 'div', 'buttons row stretch');
		this.input = DOMHelper.createElement(this.buttons, 'input', 'flex-1')
		this.input.setAttribute('type', 'text');
		this.input.addEventListener('input', () => this.renderItems());
		DOMHelper.createElement(this.buttons, 'button', null, 'Reset', (e) => {
			e.preventDefault();
			this.input.value = '';
			this.renderItems();
		});
		DOMHelper.createElement(this.buttons, 'button', null, 'NaN', (e) => {
			e.preventDefault();
			this.model.set(Number.NaN);
			this.model.triggerEvent('table-closed');
		});
		DOMHelper.createElement(this.buttons, 'button', 'ml-1', 'Close', () => this.model.triggerEvent('table-closed'));

		this.scrollable = DOMHelper.createElement(this.container, 'div', 'scroll p-1');
		this.table = DOMHelper.createElement(this.scrollable, 'table');

		const thead = DOMHelper.createElement(this.table, 'thead');
		const header = DOMHelper.createElement(thead, 'tr');
		RENDER_FIELDS.forEach((name) => {
			const cell = DOMHelper.createElement(header, 'th');
			cell.innerText = name;
		});

		this.tbody = DOMHelper.createElement(this.table, 'tbody');
		this.renderItems();
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

	getTableByField(name) {
		return this.game.getTableByName(FIELD_TABLE_MAPPINGS[name]);
	}

	static isTableLookupField(name) {
		return Object.keys(FIELD_TABLE_MAPPINGS).includes(name);
	}

	getPreview() {
		const element = this.lookupTable.getById(this.model.get());
		if (element) {
			if (typeof element.name === 'object' && typeof element.name.get === 'function') {
				return element.name.get();
			}
			return this.model.get();
		}
	}

	renderItems() {
		DOMHelper.emptyElement(this.tbody);
		const search = this.input.value.toLowerCase();
		const searchId = Number(search);
		this.lookupTable
			.filter((m) => {
				if (search === '') {
					return true;
				}
				if (!Number.isNaN(searchId)) {
					return m.id.equalsTo(searchId);
				}
				const name = m.name.get();
				return name.toLowerCase().includes(search);
			})
			.forEach(
				(node) => {
					const tr = DOMHelper.createElement(
						this.tbody,
						'tr',
						node.id.equalsTo(this.model.get()) ? 'active' : null,
						null,
						() => {
							this.model.set(node.id.get());
							this.model.triggerEvent('table-closed');
						}
					);
					RENDER_FIELDS.forEach((name) => {
						const cell = DOMHelper.createElement(tr, 'td');
						cell.innerText = node[name].get();
					});
				}
			);
	}
}
