import DomRenderer from "../core/renderer/dom/DomRenderer";
import TableRenderer from "./table/TableRenderer";
import NullableNodeRenderer from "../core/renderer/generic/NullableNodeRenderer";
import NodeFormRenderer from "./form/NodeFormRenderer";
import DOMHelper from "../core/helper/DOMHelper";

export default class EditorRenderer extends DomRenderer {

	/**
	 * @type EditorModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.container = null;

		this.tableRenderer = new NullableNodeRenderer(this.game, this.model.activeTable, (model) => new TableRenderer(this.game, model, this.table));
		this.addChild(this.tableRenderer);

		this.formRenderer = new NullableNodeRenderer(this.game, this.model.activeForm, (model) => new NodeFormRenderer(this.game, model, this.form));
		this.addChild(this.formRenderer);

		this.addAutoEvent(
			this.model.activeTable,
			'change',
			() => this.updateTables()
		);

		this.addAutoEvent(
			this.model.isVisible,
			'change',
			() => {
				if (this.model.isVisible.get()) {
					DOMHelper.removeClass(this.dock, 'hidden');
					DOMHelper.removeClass(this.buttonsLeft, 'hidden');
					DOMHelper.removeClass(this.buttonsRight, 'hidden');
				} else {
					DOMHelper.addClass(this.dock, 'hidden');
					DOMHelper.addClass(this.buttonsLeft, 'hidden');
					DOMHelper.addClass(this.buttonsRight, 'hidden');
				}
			},
			true
		);

		this.stopEventPropagationHandler = (e) => e.stopPropagation();
	}

	activateInternal() {
		this.container = this.addElement('div', 'editor');
		this.nav = DOMHelper.createElement(this.container, 'nav', 'bg row');

		const buttons = DOMHelper.createElement(this.nav, 'div', 'buttons row');
		this.switch = DOMHelper.createElement(buttons, 'input');
		this.switch.setAttribute('type', 'checkbox');
		this.switch.setAttribute('name', 'switch');
		this.switch.setAttribute('checked', this.model.isVisible.get());
		this.switch.addEventListener('change', () => this.model.triggerEvent('switch-options'));

		this.buttonsLeft = DOMHelper.createElement(buttons, 'div');

		DOMHelper.createElement(
			this.buttonsLeft,
			'button',
			'special',
			'Save Resources',
			() => this.model.triggerEvent('save-resources')
		);

		this.buttonsRight = DOMHelper.createElement(this.nav, 'div');

		this.dock = DOMHelper.createElement(this.container, 'div', 'dock bg');
		this.tables = DOMHelper.createElement(this.dock, 'div', 'table-selection bg');
		this.table = DOMHelper.createElement(this.dock, 'div', 'active-table');
		this.form = DOMHelper.createElement(this.dock, 'div', 'active-form');
		this.item = DOMHelper.createElement(this.dock, 'div', 'active-item');

		const events = ['click', 'mousemove', 'mousedown', 'mouseup', 'wheel'];
		const elements = [this.nav, this.tables, this.table, this.form, this.item];
		for (const eli in elements) {
			for (const evi in events) {
				this.addAutoEvent(elements[eli], events[evi], this.stopEventPropagationHandler);
			}
		}

		this.updateTables();
	}

	deactivateInternal() {
		this.removeElement(this.container);
	}

	updateTables() {
		DOMHelper.emptyElement(this.tables);
		const wrapper = DOMHelper.createElement(this.tables, 'div', 'inner');
		this.addMenuSection(wrapper, this.game.resources, 'Resources');
	}

	addMenuSection(wrapper, node, name) {
		DOMHelper.createElement(wrapper, 'h3', null, name);
		const menu = DOMHelper.createElement(wrapper, 'ul', 'menu');
		node.properties.forEach(
			(name, property) => {
				const isActive = this.model.activeTable.equalsTo(property);
				const item = DOMHelper.createElement(menu, 'li', isActive ? 'active' : '');
				const link = DOMHelper.createElement(item, 'a', null, name);
				link.addEventListener('click', () => this.model.triggerEvent('table-selected', property));
			}
		);
	}

}
