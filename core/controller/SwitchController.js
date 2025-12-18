import ControllerBase from "./ControllerBase";

export default class SwitchController extends ControllerBase {

	/**
	 * @type object
	 */
	controllerFactories;

	constructor(game, model, valueModel, controllerFactories) {
		super(game, model);

		this.controllerFactories = controllerFactories;

		this.addAutoEvent(
			valueModel,
			'change',
			() => {
				this.resetChildren();
				const factory = this.controllerFactories[valueModel.get()];
				if (factory) {
					this.addChild(factory());
				}
			},
			true
		);
	}

}
