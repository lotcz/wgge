import ControllerBase from "./ControllerBase";
import TimeoutController from "./TimeoutController";

export default class ControllerWithTimeout extends ControllerBase {

	runAfterTimeout(timeout, action) {
		return this.addChild(new TimeoutController(this.game, timeout, action));
	}

}
