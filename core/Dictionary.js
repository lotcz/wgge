import NodeWithEvents from "./model/event/NodeWithEvents";
import ChangeEvent from "./model/event/ChangeEvent";

const DEBUG_HASH_TABLE = false;

/**
 * Triggers Events: add, set, remove
 */
export default class Dictionary extends NodeWithEvents {

	/**
	 * @type object
	 */
	keyValues;

	constructor(init = {}) {
		super();
		this.keyValues = init;
	}

	get(key) {
		return this.keyValues[key];
	}

	exists(key) {
		return (this.keyValues[key] !== undefined);
	}

	add(key, value = null) {
		return this.set(key, value);
	}

	set(key, value = null) {
		const old = this.get(key);
		const existed = old !== undefined;
		this.keyValues[key] = value;

		if (existed) {
			this.triggerEvent('set', new ChangeEvent(value, old, key));
		} else {
			this.triggerEvent('add', new ChangeEvent(value, undefined, key));
		}
		return value;
	}

	remove(key) {
		if (!this.exists(key)) return;

		const element = this.get(key);
		delete this.keyValues[key];
		this.triggerEvent('remove', new ChangeEvent(undefined, element, key));
		return element;
	}

	rename(key, newKey) {
		this.add(newKey, this.remove(key));
	}

	reset() {
		const keys = this.keys();
		keys.forEach((key) => this.remove(key));
		this.keyValues = {};
	}

	count() {
		return this.keys().length;
	}

	isEmpty() {
		return (this.count() === 0);
	}

	keys() {
		return Object.keys(this.keyValues);
	}

	forEach(func) {
		for (let key in this.keyValues) {
			func(key, this.keyValues[key]);
		}
	}

}
