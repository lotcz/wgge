import SvgRenderer from "../../../../../core/renderer/svg/SvgRenderer";
import Vector2 from "../../../../../core/model/vector/Vector2";

export default class SurfaceRenderer extends SvgRenderer {

	/**
	 * Coordinates of player
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model, draw) {
		super(game, model, draw);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => this.drawSurface(),
			true
		);
	}

	activateInternal() {
		this.group = this.draw.group();
	}

	deactivateInternal() {
		this.group.remove();
		this.group = null;
	}

	drawSurface() {
		if (this.line) this.line.remove();
		const y = this.game.viewBoxSize.multiply(0.5).y - this.model.coordinates.y;
		this.line = this.drawLine(
			this.group,
			new Vector2(0, y),
			new Vector2(this.game.viewBoxSize.x, y),
			{width: 1, color: 'rgb(10, 10, 30)'}
		);
	}

	renderInternal() {
		this.drawSurface();
	}
}
