import ObjectModel from "../../../core/model/ObjectModel";
import StringValue from "../../../core/model/value/StringValue";
import Vector2 from "../../../core/model/vector/Vector2";

export default class ImageModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	uri;

	/**
	 * @type Vector2
	 */
	size;

	constructor(persistent = true) {
		super(persistent);

		this.uri = this.addProperty('uri', new StringValue());
		this.size = this.addProperty('size', new Vector2(0, 0, false));
	}

}
