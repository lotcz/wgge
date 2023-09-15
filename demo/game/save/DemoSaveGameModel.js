import Vector2 from "../../../core/model/vector/Vector2";
import FloatValue from "../../../core/model/value/FloatValue";
import SaveGameModel from "../../../game/save/SaveGameModel";

export default class DemoSaveGameModel extends SaveGameModel {

	/**
	 * @type Vector2
	 */
	coordinates;

	/**
	 * @type FloatValue
	 */
	zoom;

	/**
	 * @type Vector2
	 */
	oceanSize;

	constructor() {
		super();

		this.coordinates = this.addProperty('coordinates', new Vector2(0, 0));
		this.zoom = this.addProperty('zoom', new FloatValue(1));
		this.oceanSize = this.addProperty('oceanDepth', new Vector2(2500, 1000));
	}
}
