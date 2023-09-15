import ObjectModel from "../../ObjectModel";
import IntValue from "../../value/IntValue";

export default class IdentifiedModelNode extends ObjectModel {

	/**
	 * @type IntValue
	 */
	id;

	constructor(id = 0, persistent = true) {
		super(persistent);

		this.id = this.addProperty('id', new IntValue(id));
	}

	equalsTo(ch) {
		if (super.equalsTo(ch)) return true;
		if (typeof ch.id !== 'object') return false;
		if (typeof ch.id.get !== 'function') return false;
		return this.equalsTo(ch.id.get());
	}

}
