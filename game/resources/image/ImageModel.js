import ObjectModel from "../../../core/model/ObjectModel";
import StringValue from "../../../core/model/value/StringValue";
import Vector2 from "../../../core/model/vector/Vector2";
import IdentifiedModelNode from "../../../core/model/collection/table/IdentifiedModelNode";

export default class ImageModel extends IdentifiedModelNode {

	/**
	 * @type StringValue
	 */
	uri;

	constructor(persistent = true) {
		super(persistent);

		this.uri = this.addProperty('uri', new StringValue());
	}

}
