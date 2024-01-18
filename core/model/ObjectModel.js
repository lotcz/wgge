import Dictionary from "../Dictionary";
import ArrayHelper from "../helper/ArrayHelper";
import ModelBase from "./ModelBase";

export default class ObjectModel extends ModelBase {

	/**
	 * @type Dictionary<DirtyValue>
	 */
	properties;

	constructor(persistent = true) {
		super(persistent);

		this.properties = new Dictionary();
		this.properties.addEventListener('add', (e) => this.propertyAdded(e.key, e.value));
		this.properties.addEventListener('remove', (e) => this.propertyRemoved(e.key, e.old));
		this.properties.addEventListener('set', (e) => this.propertySet(e.key, e.old, e.value));
	}

	addProperty(name, property) {
		if (this.properties.exists(name)) {
			console.warn(`Property ${name} already set! Overriding.`);
		}
		return this.properties.add(name, property);
	}

	propertyAdded(name, property) {
		this.makeDirty();
		this.subscribeToOnDirtyEvent(property);
	}

	propertyRemoved(name, property) {
		this.makeDirty();
		this.unsubscribeFromOnDirtyEvent(property);
	}

	propertySet(name, oldProperty, newProperty) {
		this.propertyRemoved(name, oldProperty);
		this.propertyAdded(name, newProperty);
	}

	clean() {
		if (super.clean()) {
			this.properties.forEach((name, property) => property.clean());
		}
	}

	restoreState(state) {
		if (state === null || state === undefined || typeof state !== 'object') {
			return;
		}
		if (state.p) {
			this.properties.forEach((name, property) => property.restoreState(state.p[name]));
		}
		if (state.i !== undefined) {
			this.restoreStateInternal(state.i);
		}
	}

	getState() {
		if (!this.isPersistent) {
			return null;
		}

		const state = {};

		if (this.properties.count() > 0) {
			const properties = {};
			this.properties.forEach((name, propertyNode) =>
				properties[name] = propertyNode.getState()
			);
			state.p = properties;
		}

		const internal = this.getStateInternal();
		if (internal !== undefined) {
			state.i = internal;
		}

		return state;
	}

	getResourcesForPreload() {
		const result = this.getResourcesForPreloadInternal();
		this.properties.forEach(
			(name, child) => {
				if (typeof child.getResourcesForPreload === 'function') {
					result.push(...child.getResourcesForPreload());
				}
			}
		);
		return ArrayHelper.unique(result).filter((uri) => uri !== null && uri !== '');
	}

	getResourcesForPreloadInternal() {
		return [];
	}

}
