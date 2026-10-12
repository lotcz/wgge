const DEBUG_EVENT_MANAGER = false;

export default class EventManager {

	handlers = new Map();

	addEventListener(eventName, eventHandler) {
		if (!this.handlers.has(eventName)) {
			this.handlers.set(eventName, [eventHandler]);
			return;
		}
		/*
		const index = this.handlers[eventName].indexOf(eventHandler);
		if (index >= 0) {
			if (DEBUG_EVENT_MANAGER) console.log('Event listener already registered.');
			return;
		}*/
		const handlers = this.handlers.get(eventName);
		handlers.push(eventHandler);
	}

	removeEventListener(eventName, eventHandler) {
		if (!this.handlers.has(eventName)) {
			return;
		}
		const handlers = this.handlers.get(eventName);
		const index = handlers.indexOf(eventHandler);
		if (index === 0 && handlers.length === 0) {
			this.handlers.delete(eventName);
			return;
		}
		if (index >= 0) {
			handlers.splice(index, 1);
		} else {
			console.warn(`Event listener '${eventName}' cannot be removed - not found.`);
		}
	}

	triggerEvent(eventName, param) {
		if (!this.handlers.has(eventName)) {
			return;
		}
		const handlers = [...this.handlers.get(eventName)];
		for (let i = 0, max = handlers.length; i < max; i++) {
			handlers[i](param);
		}
	}

	reset() {
		this.handlers.clear();
	}

}
