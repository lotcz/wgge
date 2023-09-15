import ControllerBase from "../core/controller/ControllerBase";
import HttpHelper from "../core/helper/HttpHelper";

export default class EditorController extends ControllerBase {

	/**
	 * @type DemoEditorModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addAutoEvent(
			this.model,
			'table-selected',
			(table) => this.runOnUpdate(() => this.model.activeTable.set(table))
		);

		this.addAutoEvent(
			this.model,
			'table-closed',
			() => this.runOnUpdate(() => this.model.activeTable.set(null))
		);

		this.addAutoEvent(
			this.model,
			'node-saved',
			(param) => this.runOnUpdate(() => this.saveNode(param))
		);

		this.addAutoEvent(
			this.model,
			'form-closed',
			() => this.runOnUpdate(() => this.model.activeForm.set(null))
		);

		this.addAutoEvent(
			this.model,
			'node-delete',
			(param) => this.runOnUpdate(() => this.deleteNode(param))
		);

		this.addAutoEvent(
			this.model,
			'node-clone',
			(param) => this.runOnUpdate(() => this.cloneNode(param))
		);

		this.addAutoEvent(
			this.model,
			'download-resources',
			(param) => this.runOnUpdate(() => this.downloadResources(param))
		);

		this.addAutoEvent(
			this.model,
			'save-resources',
			() => this.saveResources()
		);

		this.addAutoEvent(
			this.model,
			'switch-options',
			() => this.runOnUpdate(() => this.model.isVisible.invert())
		);

	}

	activateInternal() {
		this.game.audio.paused.set(true);
	}

	deactivateInternal() {
		this.game.audio.paused.set(false);
	}

	/**
	 *
	 * * @param {Object} param
	 *  * @param {ObjectModel} param.node
	 *  * @param {FormData} param.data
	 */
	saveNode(param) {
		const node = param.node;
		const data = param.data;

		node.properties.forEach((name, value) => {
			if (data.has(name)) {
				if (value && value.value !== undefined && typeof value.set === 'function') {
					value.set(data.get(name));
				} else {
					console.log(data.get(name), name);
				}
			} else if (data.has(`${name}[]`)) {
				if (typeof value === 'object' && typeof value.setFromArray === 'function') {
					const arr = data.getAll(`${name}[]`);
					value.setFromArray(arr);
				}
			} else if (value && typeof value.value === 'boolean' && typeof value.set === 'function') {
				value.set(false);
			}
		});
	}

	deleteNode(param) {
		const node = param.node;
		const table = param.table;
		const result = table.remove(node);
		if (table.selectedNode.equalsTo(node)) {
			table.selectedNode.set(null);
		}
		console.log('removed node', result);
	}

	cloneNode(param) {
		const node = param.node;
		const table = param.table;
		const result = table.addClone(node);
		table.selectedNode.set(result);
		console.log('cloned node', result);
	}

	downloadResources() {
		const data = JSON.stringify(this.game.resources.getState());
		HttpHelper.fakeDownload('resources.json', data);
	}

	async saveResources() {
		const str = JSON.stringify(this.game.resources.getState());
		await HttpHelper.post('http://localhost:88/save-resources', str);
	}
}
