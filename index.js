import Stats from 'three/examples/jsm/libs/stats.module'
import DOMHelper from "./core/helper/DOMHelper";

export default class Wgge {

	enabled = false;
	lastTime = 0;

	maxDelta;
	debugModeEnabled;
	showStats;

	constructor(
		controller,
		renderer,
		maxDelta = 100,
		debugModeEnabled = true,
		showStats = false
	) {
		this.controller = controller;
		this.renderer = renderer;
		this.maxDelta = maxDelta;
		this.debugModeEnabled = debugModeEnabled;
		this.showStats = showStats;
		this.stats = null;

		this.updateLoopHandler = () => this.updateLoop();
	}

	start() {
		if (this.debugModeEnabled) {
			window['wegge'] = this;
		}
		if (this.showStats) {
			this.stats = new Stats();
			document.body.appendChild(this.stats.dom);
		}
		this.enabled = true;
		this.controller.activate();
		this.renderer.activate();
		this.lastTime = performance.now();
		this.updateLoop();
	}

	stop() {
		this.enabled = false;
		this.controller.deactivate();
		this.renderer.deactivate();
		if (this.stats) {
			DOMHelper.destroyElement(this.stats.dom);
			this.stats = null;
		}
	}

	updateLoop() {
		if (!this.enabled) return;

		const time = performance.now();
		const delta = time - this.lastTime;
		this.lastTime = time;

		if (delta < this.maxDelta) {
			this.controller.update(delta);
			this.renderer.render();
		}

		if (this.showStats && this.stats) {
			this.stats.update();
		}

		requestAnimationFrame(this.updateLoopHandler);
	}
}
