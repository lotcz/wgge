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

	/**
	 *
	 * @param {Vector2} center
	 * @param {Number} radius
	 * @param {CanvasGradient|string} fill
	 * @param {any} stroke
	 * @param {Number} startAngle
	 * @param {Number} endAngle
	 */
	drawArc(
		center,
		radius,
		fill = 'white',
		stroke = {width: 1, color: 'black'},
		startAngle = 0,
		endAngle = 2 * Math.PI
	) {
		this.context2d.beginPath();
		this.context2d.fillStyle = (fill) ? fill : 'transparent';
		this.context2d.strokeStyle = stroke ? stroke.color ? stroke.color : 'orange' : 'transparent';
		this.context2d.lineWidth = stroke ? stroke.width ? stroke.width : 1 : 0;
		this.context2d.arc(center.x, center.y, radius, startAngle, endAngle);
		this.context2d.stroke();
		this.context2d.fill();
	}

	/**
	 *
	 * @param {Vector2} center
	 * @param {Number} radius
	 * @param {CanvasGradient|string} fill
	 * @param {any} stroke
	 */
	drawCircle(center, radius, fill, stroke) {
		this.drawArc(center, radius, fill, stroke);
	}
}
