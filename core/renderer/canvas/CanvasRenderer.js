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
	 * @param {Vector2} gradientStart
	 * @param {Vector2} gradientSize
	 * @param {Vector2} start
	 * @param {Vector2} size
	 * @param {[[Number, string|color]]} stops
	 */
	drawGradient(gradientStart, gradientSize, start, size, stops) {
		const gradientEnd = gradientStart.add(gradientSize);
		const grd = this.context2d.createLinearGradient(gradientStart.x, gradientStart.y, gradientEnd.x, gradientEnd.y);
		stops.forEach((s) => {
			grd.addColorStop(s[0], s[1]);
		});

		const end = start.add(size);
		this.context2d.fillStyle = grd;
		this.context2d.fillRect(start.x, start.y, end.x, end.y);
	}

	/**
	 *
	 * @param {Vector2} center
	 * @param {Number} radius
	 * @param {Number} startAngle
	 * @param {Number} endAngle
	 */
	drawArc(center, radius, startAngle, endAngle) {
		this.context2d.beginPath();
		this.context2d.arc(center.x, center.y, radius, startAngle, endAngle);
		this.context2d.stroke();
	}

	/**
	 *
	 * @param {Vector2} center
	 * @param {Number} radius
	 */
	drawCircle(center, radius) {
		this.drawArc(center, radius, 0, 2 * Math.PI);
	}
}
