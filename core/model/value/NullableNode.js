import DirtyValue from "./DirtyValue";
import {EVENT_REMOVE_ME} from "../ModelBase";

export default class NullableNode extends DirtyValue {
	nodeFactory;

	/**
	 * @type {ObjectModel}
	 */
	value;

	constructor(nodeFactory = null, persistent = true) {
		super(null, persistent);

		this.nodeFactory = nodeFactory;

		this.childRequestedRemoveHandler = () => this.set(null);
	}

	/**
	 *
	 * @param {ObjectModel} value
	 */
	set(value) {
		if (this.isSet()) {
			this.unsubscribeFromOnDirtyEvent(this.value);
			this.value.removeEventListener(EVENT_REMOVE_ME, this.childRequestedRemoveHandler);
		}

		super.set(value);

		if (this.isSet()) {
			this.subscribeToOnDirtyEvent(this.value);
			this.value.addEventListener(EVENT_REMOVE_ME, this.childRequestedRemoveHandler);
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
