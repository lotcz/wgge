import SaveGameController from "../../../game/save/SaveGameController";
import AnimationVector2Controller from "../../../core/controller/AnimationVector2Controller";
import Vector2 from "../../../core/model/vector/Vector2";


export default class DemoSaveGameController extends SaveGameController {

	/**
	 * @type DemoSaveGameModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

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
