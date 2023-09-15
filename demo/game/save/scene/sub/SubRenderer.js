import SvgRenderer from "../../../../../core/renderer/svg/SvgRenderer";
import Vector2 from "../../../../../core/model/vector/Vector2";

export default class SubRenderer extends SvgRenderer {

	/**
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model, draw) {
		super(game, model, draw);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => this.drawSub(),
			true
		);
	}

	activateInternal() {
		this.group = this.draw.group();
		this.drawEllipse(
			this.group,
			new Vector2(),
			80,
			50,
			{width: 2, color: 'black'},
			'rgba(110, 150, 175, 1)'
		);
	}

	drawSub() {
		const center = this.game.viewBoxSize.multiply(0.5);
		this.group.center(center.x, center.y);
	}

	renderInternal() {
		this.drawSub();
	}
}
