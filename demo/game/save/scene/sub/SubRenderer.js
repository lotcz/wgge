import SvgRenderer from "../../../../../core/renderer/svg/SvgRenderer";

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
	}

	drawSub() {
		this.drawEllipse(
			this.game.viewBoxSize.multiply(0.5),
			40,
			30,
			{width: 4, color: 'black'}
		);
	}

	renderInternal() {
		this.drawSub();
	}
}
