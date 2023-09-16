import Vector2 from "../../../core/model/vector/Vector2";
import FloatValue from "../../../core/model/value/FloatValue";
import SaveGameModel from "../../../game/save/SaveGameModel";
import OceanModel from "./ocean/OceanModel";
import SubModel from "./sub/SubModel";

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
	 * @type OceanModel
	 */
	ocean;


	/**
	 * @type SubModel
	 */
	sub;

	constructor() {
		super();

		this.coordinates = this.addProperty('coordinates', new Vector2(0, 0));
		this.zoom = this.addProperty('zoom', new FloatValue(1));

		this.ocean = this.addProperty('ocean', new OceanModel());
		this.sub = this.addProperty('sub', new SubModel());

	}
}
