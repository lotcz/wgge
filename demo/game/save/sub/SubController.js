import ControllerBase from "../../../../core/controller/ControllerBase";

export default class SubController extends ControllerBase {

	/**
	 * @type SubModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addAutoEvent(
			this.game.viewBoxSize,
			'change',
			() => this.model.center.set(this.game.viewBoxSize.multiply(0.5)),
			true
		);
	}

	arrangeTanks(tanks, y, gap = 10) {
		let minX = 0;
		let maxX = 0;
		let x = 0;

		tanks.forEach((t) => {
			t.position.set(x, y);
			if (x < 0) {
				x = maxX + t.size.x + gap;
				maxX = x;
			} else {
				x = minX - t.size.x - gap;
				minX = x;
			}
		});
	}

	rearrange() {
		this.arrangeTanks(this.model.oxygenTanks, -this.model.size.y * 0.25, 3);
		this.arrangeTanks(this.model.waterTanks, this.model.size.x * 0.35);

	}

	afterActivatedInternal() {
		this.rearrange();
	}
}
