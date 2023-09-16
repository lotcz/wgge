import RendererBase from "../RendererBase";

export default class CanvasRenderer extends RendererBase {

	/**
	 * @type HTMLCanvasElement
	 */
	canvas;

	/**
	 * @type CanvasRenderingContext2D
	 */
	context2d;

	constructor(game, model, canvas) {
		super(game, model);

		this.canvas = canvas;

	}

	activateInternal() {
		this.context2d = this.canvas.getContext('2d');
	}

	deactivateInternal() {
		this.context2d = null;
	}

	/**
	 *
	 * @param {Vector2} start
	 * @param {Vector2} size
	 * @param {CanvasGradient|string} fill
	 */
	drawRect(start, size, fill = 'black') {
		const end = start.add(size);
		this.context2d.fillStyle = fill;
		this.context2d.fillRect(start.x, start.y, end.x, end.y);
	}

	/**
	 *
	 * @param {Vector2} gradientStart
	 * @param {Vector2} gradientSize
	 * @param {Vector2} start
	 * @param {Vector2} size
	 * @param {[[Number, string|color]]} stops
	 */
	drawGradient(start, size, gradientStart, gradientSize, stops) {
		const gradientEnd = gradientStart.add(gradientSize);
		const grd = this.context2d.createLinearGradient(gradientStart.x, gradientStart.y, gradientEnd.x, gradientEnd.y);
		stops.forEach((s) => {
			grd.addColorStop(s[0], s[1]);
		});
		this.drawRect(start, size, grd);
	}


}
