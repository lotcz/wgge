import NodeWithEvents from "./event/NodeWithEvents";

export default class ModelBase extends NodeWithEvents {

	/**
	 * @type boolean
	 */
	isDirty;

	/**
	 * @type boolean
	 */
	isPersistent;

	constructor(persistent = true) {
		super();
		this.isPersistent = persistent;
		this.isDirty = true;

		this.propertyValueDirtyHandler = () => this.makeDirty();
	}

	restoreState(state) {
		this.restoreStateInternal(state);
	}

	/**
	 * Override with node specific code
	 * @param {object} state
	 */
	restoreStateInternal(state) {

	}

	getState() {
		if (!this.isPersistent) {
			return undefined;
		}

		return this.getStateInternal();
	}

	/**
	 * Override with node specific state
	 * @returns {any}
	 */
	getStateInternal() {
		return undefined;
	}

	makeDirty() {
		if (!this.isDirty) {
			this.isDirty = true;
			this.triggerEvent('dirty');
		}
	}

	clean() {
		if (!this.isDirty) return false;
		this.isDirty = false;
		return true;
	}

	clone() {
		const n = new this.constructor();
		n.restoreState(this.getState());
		return n;
	}

	addOnDirtyListener(handler) {
		this.addEventListener('dirty', handler);
	}

	removeOnDirtyListener(handler) {
		this.removeEventListener('dirty', handler);
	}

	subscribeToOnDirtyEvent(node) {
		node.addOnDirtyListener(this.propertyValueDirtyHandler);
		return node;
	}

	unsubscribeFromOnDirtyEvent(node) {
		node.removeOnDirtyListener(this.propertyValueDirtyHandler);
		return node;
	}

	equalsTo(ch) {
		return this === ch;
	}
}
