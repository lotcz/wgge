import NumberHelper from "./helper/NumberHelper";

export default class ActivatedTreeNode {

	/**
	 * @type ActivatedTreeNode[]
	 */
	children;

	/**
	 * @type ActivatedTreeNode
	 */
	parent;

	/**
	 * @type boolean
	 */
	isActivated;

	/**
	 * @type boolean
	 */
	isRemoved= false;

	/**
	 *
	 * @type array
	 * @type param.node {ModelNode}
	 * @type param.event {string}
	 * @type param.handler {(ep) => any}
	 */
	autoRegisterEvents = null;

	/**
	 * @type number
	 */
	childrenRemoved = 0;

	constructor() {
		this.isActivated = false;
		this.parent = null;
		this.children = [];
	}

	isRoot() {
		return (this.parent === null);
	}

	findRoot() {
		return (this.isRoot()) ? this : this.parent.findRoot();
	}

	/**
	 *
	 * @param node ActivatedTreeNode
	 * @returns ActivatedTreeNode
	 */
	addChild(node) {
		node.parent = this;
		this.children.push(node);
		if (this.isActivated) {
			node.activate();
		}
		return node;
	}

	hasChildren() {
		return this.children.length > this.childrenRemoved;
	}

	removeChild(node) {
		const index = this.children.indexOf(node);
		if (index >= 0) {
			this.childrenRemoved++;
			node.deactivate();
			node.isRemoved = true;
			node.parent = null;
			return node;
		}
		return undefined;
	}

	removeMyself() {
		if (this.parent) {
			this.parent.removeChild(this);
		} else {
			this.deactivate();
		}
	}

	resetChildren() {
		for (let i = 0, max = this.children.length; i < max; i++) {
			this.children[i].deactivate();
		}
		this.children = [];
		this.childrenRemoved = 0;
	}

	updateRemovedChildren() {
		if (this.childrenRemoved === 0) return;
		let w = 0;
		for (let i = 0, max = this.children.length; i < max; i++) {
			if (!this.children[i].isRemoved) this.children[w++] = this.children[i];
		}
		this.children.length = w;
		this.childrenRemoved = 0;
	}

	activate() {
		if (!this.isActivated) {
			this.activateInternal();

			if (this.autoRegisterEvents) {
				this.autoRegisterEvents.forEach((event) => {
					event.node.addEventListener(event.name, event.handler);
					if (event.runOnActivate) {
						event.handler();
					}
				});
			}

			this.children.forEach((c) => c.activate());
			this.isActivated = true;

			this.afterActivatedInternal();
		}
	}

	activateInternal() {

	}

	afterActivatedInternal() {

	}

	deactivate() {
		if (this.isActivated) {
			if (this.autoRegisterEvents) {
				this.autoRegisterEvents.forEach((event) => {
					event.node.removeEventListener(event.name, event.handler);
				});
			}

			this.children.forEach((c) => c.deactivate());
			this.deactivateInternal();
			this.isActivated = false;
		}
	}

	deactivateInternal() {

	}

	/**
	 *
	 * @param node ModelNode
	 * @param event string
	 * @param handler (param) => any
	 * @param runOnActivate bool
	 */
	addAutoEvent(node, event, handler, runOnActivate = false) {
		if ((!node) || typeof node.addEventListener !== 'function') {
			console.error('Node with addEventListener was not provided!', node);
		}
		if (!this.autoRegisterEvents) {
			this.autoRegisterEvents = [];
		}
		this.autoRegisterEvents.push({node: node, name: event, handler: handler, runOnActivate: runOnActivate});
	}

	addAutoEvents(node, events, handler, runOnActivate = false) {
		events.forEach((event) => this.addAutoEvent(node, event, handler, runOnActivate));
	}

	addAutoEventMultiple(nodes, event, handler, runOnActivate = false) {
		if (!Array.isArray(nodes)) {
			console.error('Node array was not provided!');
		}
		nodes.forEach((n, i) => this.addAutoEvent(n, event, handler, i === 0 && runOnActivate));
	}

	addAutoEventsMultiple(nodes, events, handler, runOnActivate = false) {
		events.forEach((event) => this.addAutoEventMultiple(nodes, event, handler, runOnActivate));
	}

	removeAutoEvent(node, name, handler) {
		if (!this.autoRegisterEvents) {
			return;
		}
		const event = this.autoRegisterEvents.find((e) => e.handler === handler && e.name === name && e.node === node);
		if (event) {
			NumberHelper.arrayRemove(this.autoRegisterEvents, event);
		}
	}

}
