import DirtyValue from "./DirtyValue";

export default class NullableNode extends DirtyValue {
	nodeFactory;

	/**
	 * @type {ObjectModel}
	 */
	value;

	constructor(nodeFactory = null, persistent = true) {
		super(null, persistent);

		this.nodeFactory = nodeFactory;
	}

	/**
	 *
	 * @param {ObjectModel} value
	 */
	set(value) {
		if (this.isSet()) {
			this.unsubscribeFromOnDirtyEvent(this.value);
		}

		super.set(value);

		if (this.isSet()) {
			this.subscribeToOnDirtyEvent(this.value);
		}
	}

	getStateInternal() {
		if (this.isSet()) {
			return this.value.getState();
		}
		return null;
	}

	restoreStateInternal(state) {
		this.set(null);
		if (state && this.isPersistent) {
			if (!this.nodeFactory) {
				console.log('No nodeFactory to restore NullableNode');
				return;
			}
			const node = this.nodeFactory();
			node.restoreState(state);
			this.set(node);
		}
	}

	clean() {
		if (super.clean()) {
			if (this.value && typeof this.value.clean === 'function') this.value.clean();
			return true;
		}
	}

	getResourcesForPreload() {
		if (this.isSet()) {
			return this.value.getResourcesForPreload();
		}
		return [];
	}
}
