import ModelBase from "../ModelBase";

export default class DirtyValue extends ModelBase {
	/** @type object|string|null */
	value = null;

	constructor(value = null, persistent = true) {
		super(persistent);
		this.set(value);
	}

	set(value) {
		if (this.value !== value) {
			const old = this.value;
			this.value = value;
			this.makeDirty();
			this.triggerOnChangeEvent(old);
		}
	}

	get() {
		return this.value;
	}

	toString() {
		return this.isSet() ? this.get() : '';
	}

	isEmpty() {
		return this.value === null || this.value === undefined;
	}

	isSet() {
		return !this.isEmpty();
	}

	getStateInternal() {
		return this.get();
	}

	equalsTo(value) {
		if (this.value === value) {
			return true;
		}
		if (typeof value === 'object' && value !== null && value !== undefined && value.value !== undefined) {
			return value.value === this.value;
		}
	}

	restoreStateInternal(state) {
		this.set(state);
	}

	addOnChangeListener(eventHandler, runImmediately = false) {
		this.addEventListener('change', eventHandler, runImmediately);
	}

	removeOnChangeListener(eventHandler) {
		this.removeEventListener('change', eventHandler);
	}

	triggerOnChangeEvent(oldValue) {
		this.triggerEvent('change', {oldValue: oldValue, newValue: this.value});
	}

}
