import ObjectModel from "../../../core/model/ObjectModel";
import StringValue from "../../../core/model/value/StringValue";
import FloatValue from "../../../core/model/value/FloatValue";
import Vector2 from "../../../core/model/vector/Vector2";

export default class ImageModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	uri;

	/**
	 * @type FloatValue
	 */
	opacity;

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
	size;

	constructor(persistent = true) {
		super(persistent);

		this.uri = this.addProperty('uri', new StringValue());
		this.opacity = this.addProperty('opacity', new FloatValue());
		this.coordinates = this.addProperty('coordinates', new Vector2());
		this.size = this.addProperty('size', new Vector2());
		this.zoom = this.addProperty('startZoom', new FloatValue(1));
	}

}
