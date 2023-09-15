import CanvasRenderer from "../../../../../core/renderer/canvas/CanvasRenderer";
import Vector2 from "../../../../../core/model/vector/Vector2";
import Vector3 from "../../../../../core/model/vector/Vector3";
import ProgressVector3 from "../../../../../core/animation/3d/ProgressVector3";

export default class WaterRenderer extends CanvasRenderer {

	/**
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => this.drawWater(),
			true
		);
	}

	drawWater() {
		const startColor = new Vector3(100, 150, 255);
		const endColor = new Vector3(0, 0, 30);
		const progress = new ProgressVector3(startColor, endColor);

		const screenCorner = this.model.coordinates.subtract(this.game.viewBoxSize.multiply(0.5));
		const oceanProgressTop = screenCorner.y / this.model.oceanSize.y;
		const oceanProgressBottom = (screenCorner.y + this.game.viewBoxSize.y) / this.model.oceanSize.y;
		const gradientColorStart = progress.get(oceanProgressTop).asRgbColor();
		const gradientColorEnd = progress.get(oceanProgressBottom).asRgbColor();

		this.drawGradient(
			new Vector2(),
			new Vector2(0, this.game.viewBoxSize.y),
			new Vector2(),
			this.game.viewBoxSize,
			[
				[0, gradientColorStart],
				[1, gradientColorEnd]
			]
		);
	}

	renderInternal() {
		this.drawWater();
	}
}
