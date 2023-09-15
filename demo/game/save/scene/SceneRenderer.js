import SubRenderer from "./sub/SubRenderer";
import DOMHelper from "../../../../core/helper/DOMHelper";
import DomRenderer from "../../../../core/renderer/dom/DomRenderer";
import {SVG} from "@svgdotjs/svg.js";
import WaterRenderer from "./ocean/WaterRenderer";
import SurfaceRenderer from "./ocean/SurfaceRenderer";

export default class SceneRenderer extends DomRenderer {

	/**
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model, dom);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => this.resize(),
			true
		);
	}

	activateInternal() {
		this.container = this.addElement('div', 'scene-container container container-host');

		const ocean = DOMHelper.createElement(this.container, 'div', 'ocean container');
		this.oceanCanvas = DOMHelper.createElement(ocean, 'canvas');

		this.addChild(new WaterRenderer(this.game, this.model, this.oceanCanvas));

		const svg = DOMHelper.createElement(this.container, 'div', 'sub container container-host');
		this.draw = SVG().addTo(svg);

		this.addChild(new SubRenderer(this.game, this.model, this.draw));
		this.addChild(new SurfaceRenderer(this.game, this.model, this.draw));
	}

	deactivateInternal() {
		this.resetChildren();
		this.removeElement(this.container);
		this.container = null;
		this.draw = null;
	}

	resize() {
		this.oceanCanvas.width = this.game.viewBoxSize.x;
		this.oceanCanvas.height = this.game.viewBoxSize.y;

		this.draw.size(this.game.viewBoxSize.x, this.game.viewBoxSize.y);
	}

}
