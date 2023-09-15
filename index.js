import Stats from 'three/examples/jsm/libs/stats.module'
import DemoGameModel from "./demo/game/DemoGameModel";
import DemoGameController from "./demo/game/DemoGameController";
import DemoGameRenderer from "./demo/game/DemoGameRenderer";

const MAX_DELTA = 100;
const DEBUG_MODE_ENABLED = true;
const SHOW_STATS = false;

const game = new DemoGameModel(DEBUG_MODE_ENABLED);

const controller = new DemoGameController(game);
controller.activate();

const renderer = new DemoGameRenderer(game, window.document.body);
renderer.activate();

if (DEBUG_MODE_ENABLED) {
	window['wegge'] = {
		game,
		controller,
		renderer
	};
}

const stats = SHOW_STATS ? new Stats() : false;
if (stats) {
	document.body.appendChild(stats.dom);
}

let lastTime = performance.now();

const updateLoop = function () {
	const time = performance.now();
	const delta = time - lastTime;
	lastTime = time;

	if (delta < MAX_DELTA) {
		controller.update(delta);
		renderer.render();
	}

	if (stats) {
		stats.update();
	}

	requestAnimationFrame(updateLoop);
}

updateLoop();
