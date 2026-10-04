import ModelNodeCollection from "../ModelNodeCollection";

/**
 * Collection of IdentifiedModelNode that allows search by ID.
 */
export default class ModelNodeTable extends ModelNodeCollection {

	cache = new Map();

	/**
	 *
	 * @param {number|string|DirtyValue|null|undefined} id
	 * @returns {*|undefined}
	 */
	getById(id) {
		if (typeof id === 'number') {
			if (id === Number.NaN || id <= 0) return undefined;
			return this.cache.get(id);
		}
		if (typeof id === 'string') {
			return this.getById(Number(id));
		}
		if (typeof id === 'object' && typeof id.get === 'function') {
			return this.getById(id.get());
		}
		return undefined;
	}

	get(id) {
		return this.getById(id);
	}

	maxId() {
		if (this.children.count() === 0) {
			return 0;
		}
		return this.children.items.reduce((prev, current) => Math.max(prev, parseInt(current.id.get())), 0);
	}

	nextId() {
		return this.maxId() + 1;
	}

	/**
	 * @param {IdentifiedModelNode} node
	 * @returns {IdentifiedModelNode}
	 */
	add(node) {
		const id = this.nextId();
		if (!node) {
			node = this.nodeFactory(id);
		}
		node.id.set(id);
		super.add(node);
		this.cache.set(id, node);
		return node;
	}

	/**
	 * @param {IdentifiedModelNode} node
	 * @returns {IdentifiedModelNode}
	 */
	remove(node) {
		const removed = super.remove(node);
		if (removed) this.cache.delete(node.id.get());
		return removed;
	}

	restoreStateInternal(state) {
		this.cache.clear();
		super.restoreStateInternal(state);
		this.forEach(
			(node) => this.cache.set(node.id.get(), node)
		);
	}

}
