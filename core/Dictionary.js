import NodeWithEvents from "./model/event/NodeWithEvents";
import ChangeEvent from "./model/event/ChangeEvent";

/**
 * Triggers Events: add, set, remove
 */
export default class Dictionary extends NodeWithEvents {

	/**
	 * @type Map
	 */
	map= new Map();

	get(key) {
		return this.map.get(key);
	}

	exists(key) {
		return this.map.has(key);
	}

	remove(key) {
		if (!this.exists(key)) return;
		const element = this.get(key);
		this.map.delete(key);
		this.triggerEvent('remove', new ChangeEvent(undefined, element, key));
		return element;
	}

	set(key, value = undefined) {
		const old = this.get(key);
		const existed = old !== undefined;

		if (existed) {
			if (value === undefined) {
				return this.remove(key);
			}
			this.map.set(key, value);
			this.triggerEvent('set', new ChangeEvent(value, old, key));
		} else {
			this.map.set(key, value);
			this.triggerEvent('add', new ChangeEvent(value, undefined, key));
		}

		return value;
	}

	add(key, value = undefined) {
		return this.set(key, value);
	}

	rename(key, newKey) {
		this.add(newKey, this.remove(key));
	}

	count() {
		return this.map.size;
	}

	isEmpty() {
		return (this.count() === 0);
	}

	keys() {
		return Array.from(this.map.keys());
	}

	reset() {
		const keys = this.keys();
		for (let i = 0, max = keys.length; i < max; i++) {
			this.remove(keys[i]);
		}
		this.map = new Map();
	}

	forEach(func) {
		this.map.forEach((value, key) => func(key, value));
	}

}
