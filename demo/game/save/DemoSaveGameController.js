import SaveGameController from "../../../game/save/SaveGameController";
import AnimationVector2Controller from "../../../core/controller/AnimationVector2Controller";
import Vector2 from "../../../core/model/vector/Vector2";
import SubController from "./sub/SubController";
import OceanController from "./ocean/OceanController";


export default class DemoSaveGameController extends SaveGameController {

	/**
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(
			new SubController(
				this.game,
				this.model.sub
			)
		);

		this.addChild(
			new OceanController(
				this.game,
				this.model.ocean
			)
		);

		this.addAutoEventMultiple(
			[this.game.viewBoxSize, this.model.coordinates],
			'change',
			() => this.model.ocean.cornerCoordinates.set(this.model.coordinates.sub(this.game.viewBoxSize.multiply(0.5))),
			true
		);
		
		this.addAutoEvent(
			this.game.controls,
			'key-down-87',
			() => {
				this.addChild(
					new AnimationVector2Controller(
						this.game,
						this.model.coordinates,
						this.model.coordinates.add(new Vector2(0, -50)),
						500
					)
				);
			}
		);

		this.addAutoEvent(
			this.game.controls,
			'key-down-83',
			() => {
				this.addChild(
					new AnimationVector2Controller(
						this.game,
						this.model.coordinates,
						this.model.coordinates.add(new Vector2(0, 100)),
						500
					)
				);
			}
		);
	}

}
