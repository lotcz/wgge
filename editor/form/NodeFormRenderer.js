import DomRenderer from "../../core/renderer/dom/DomRenderer";
import TableRenderer from "../table/TableRenderer";
import TableLookupRenderer from "../table/lookup/TableLookupRenderer";
import DOMHelper from "../../core/helper/DOMHelper";

export default class NodeFormRenderer extends DomRenderer {

	/**
	 * @type ObjectModel
	 */
	model;

	constructor(game, model, dom, collection = null) {
		super(game, model, dom);

		this.model = model;
		this.collection = collection;
		this.container = null;
		this.fields = null;
	}

	activateInternal() {
		this.container = this.addElement('form', 'bg');

		const buttons = DOMHelper.createElement(this.container, 'div', 'buttons');
		const buttonsLeft = DOMHelper.createElement(buttons, 'div');
		const buttonsRight = DOMHelper.createElement(buttons, 'div');

		const submit = DOMHelper.createElement(buttonsLeft, 'button');
		submit.innerText = 'Save';
		submit.addEventListener('click', (e) => {
			e.preventDefault();
			this.save();
		});

		if (this.collection) {
			DOMHelper.createElement(buttonsLeft, 'button', null, 'Clone',
				(e) => {
					e.preventDefault();
					this.game.editor.triggerEvent('node-clone', {table: this.collection, node: this.model});
				}
			);
			DOMHelper.createElement(buttonsLeft, 'button', 'red', 'Delete',
				(e) => {
					e.preventDefault();
					this.game.editor.triggerEvent('node-delete', {table: this.collection, node: this.model});
				}
			);
		}

		DOMHelper.createElement(
			buttonsRight,
			'button',
			null,
			'Close',
			(e) => {
				e.preventDefault();
				if (this.game.editor.activeForm.equalsTo(this.model)) {
					this.game.editor.triggerEvent('form-closed');
				}
				if (this.collection) {
					this.collection.selectedNode.set(null);
				}
			}
		);

		this.fields = DOMHelper.createElement(this.container, 'div', 'fields scroll');
		this.renderFields();
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

	renderInternal() {
		this.renderFields();
	}

	renderInput(container, name, value) {
		if (value === undefined) {
			DOMHelper.createElement(container, 'span', null, '--undefined--');
			return;
		}

		if (value === null) {
			DOMHelper.createElement(container, 'span', null, '--null--');
			return;
		}

		if (name === 'color' && typeof value === 'string') {
			const input = DOMHelper.createElement(container, 'input', 'color');
			input.setAttribute('type', 'color');
			input.setAttribute('name', name);
			input.value = value;
			return;
		}

		if (typeof value === 'object' && value.x !== undefined && value.y !== undefined) {
			DOMHelper.addClass(container, 'vector');
			this.renderInput(container, `${name}[]`, value.x);
			this.renderInput(container, `${name}[]`, value.y);
			if (value.z !== undefined) {
				this.renderInput(container, `${name}[]`, value.z);
				if (value.w !== undefined) {
					this.renderInput(container, `${name}[]`, value.w);
				}
			}
			return;
		}

		if (typeof value === 'object' && (value.constructor.name === 'ModelNodeTable' || value.constructor.name === 'ModelNodeCollection')) {
			const tableRenderer = new TableRenderer(this.game, value, container);
			tableRenderer.activate();
			return;
		}

		if (typeof value === 'object' && value.value !== undefined) {
			this.renderInput(container, name, value.value);
			if (value.constructor.name === 'IntValue' && TableLookupRenderer.isTableLookupField(name)) {
				DOMHelper.addClass(container, 'with-lookup');
				const lookupRenderer = new TableLookupRenderer(this.game, value, container, name);
				DOMHelper.createElement(container, 'div', 'pr-1', lookupRenderer.getPreview());
				DOMHelper.createElement(
					container,
					'button',
					'lookup-button',
					'Select...',
					(e) => {
						e.preventDefault();
						value.addEventListener('table-closed', () => {
							lookupRenderer.deactivate();
						});
						lookupRenderer.activate();
					}
				);
			}
			return;
		}

		if (typeof value === 'object') {
			DOMHelper.createElement(container, 'span', null, '[Object]');
			return;
		}

		if (typeof value === 'boolean') {
			const input = DOMHelper.createElement(container, 'input');
			input.setAttribute('type', 'checkbox');
			input.setAttribute('name', name);
			input.checked = value;
			return;
		}

		const input = DOMHelper.createElement(container, 'input');
		input.setAttribute('type', 'text');
		input.setAttribute('name', name);
		input.value = value.toString();
	}

	renderField(container, name, value) {
		const row = DOMHelper.createElement(container, 'div', 'row');
		const label = DOMHelper.createElement(row, 'label', null, name);
		label.setAttribute('for', name);
		const item = DOMHelper.createElement(row, 'div', 'field');
		this.renderInput(item, name, value);
	}

	renderFields() {
		DOMHelper.emptyElement(this.fields);
		this.model.properties.forEach((name, value) => {
			this.renderField(this.fields, name, value);
		});
	}

	save() {
		const data = new FormData(this.container);
		this.game.editor.triggerEvent('node-saved', {node: this.model, data: data});
		this.game.editor.triggerEvent('form-closed');
	}

}
