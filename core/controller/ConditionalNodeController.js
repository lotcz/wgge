import ControllerBase from "./ControllerBase";

export default class ConditionalNodeController extends ControllerBase {

	/**
	 * @type DirtyValue
	 */
	model;

	constructor(game, model, condition, controllerFactory, defaultControllerFactory = null) {
		super(game, model);
		this.model = model;

		this.condition = condition;

		this.controllerFactory = controllerFactory;
		this.defaultControllerFactory = defaultControllerFactory;

		this.controller = null;
		this.isUsingDefaultController = false;

		this.addAutoEvent(
			this.model,
			'change',
			() => this.updateController(),
			true
		);
	}

	updateController() {
		if (this.condition()) {
			if (this.isUsingDefaultController || this.controller === null) {
				this.resetChildren();
				this.controller = this.addChild(this.controllerFactory());
				this.isUsingDefaultController = false;
			}
		} else {
			if (this.defaultControllerFactory) {
				if (this.controller === null || this.isUsingDefaultController === false) {
					this.resetChildren();
					this.controller = this.addChild(this.defaultControllerFactory());
					this.isUsingDefaultController = true;
				}
			} else {
				this.resetChildren();
				this.controller = null;
			}
		}
	}

}
